---
title: "Create your own middleware in Chi"
date: 2021-07-15T21:40:23-05:00
draft: false
description: "In this post I'm going to explain how to create your own middleware in Chi, how to get the values from route handlers and other middlewares. And give some context of how the Chi library is used"
tags: ['golang']
---

## Introduction

[chi](https://github.com/go-chi/chi) is a lightweight, idiomatic and composable router for building Go HTTP services.

I've had some trouble recently in finding out how the chi library works. It is definitely powerful and in my opinion one of the best alternatives out there. You can check out the features and the performance if you want to make an informed opinion for choosing it. 

In the GitHub they briefly show an example of how they are using it but they don't dive much into it. It's pretty straightforward actually.

You call a middleware using `r.Use` where r is the router. Either a nested router like in this example.

{{< highlight golang >}}
r.Route("/user", func(r chi.Router) {
    r.Use(user.UserContextBody)
    r.Route("/{username}", func(r chi.Router) {
        // your code
    })
})
{{< /highlight >}}


Or the main router

{{< highlight golang >}}
r := chi.NewRouter()

// middleware stack
r.Use(middleware.RequestID)
r.Use(middleware.RealIP)
r.Use(middleware.Logger)
r.Use(middleware.Recoverer)
{{< /highlight >}}

## What is a middleware in Chi?

A middleware is a function that receives a http.Handler and returns a http.Handler. Yeah it's not quite self-explanatory.

Anything you can do with the standard library you can do. We just have to serve the http.Handler from the parameter, you can find it as `next` in the Chi library.

{{< highlight golang >}}
func UserContextBody(next http.Handler) http.Handler {
    return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
        var user User 

        err := json.NewDecoder(r.Body).Decode(&user)
        if err != nil {
            fmt.Println(err)
            return
        }

        ctx := context.WithValue(r.Context(), "user", user) 
        next.ServeHTTP(rw, r.WithContext(ctx))
	})
}
{{< /highlight >}}

In the example above I'm getting the body of the request, decoding it into a struct and adding it to the next handler, this is how we can chain multiple middlewares.

And as you may have noticed we are using context this is to pass values throughout the handlers. We have to pass the context (for passing it from previous middlewares), a key and the value. You can check the [documentation for context](https://pkg.go.dev/context?utm_source=gopls#WithValue)

## Get the context

In order to get the context either from another middleware or from a route handler, we have to call the context function from the http.Request and get the key we used while defining the context, then we have to pass type of the context we are passed. In this case we were passing a `User` struct but it could be a string, and int or whatever type it's being passed in the context.

{{< highlight golang >}}
// example for getting a string from context
ctx := r.Context()
key := ctx.Value("key").(string)
{{< /highlight >}}

{{< highlight golang >}}
r.Use(user.UserContextBody)
r.Route("/{username}", func(r chi.Router) {
    r.Get("/", func(rw http.ResponseWriter, r *http.Request) {
        // your code
    })
})

r.Post("/", func(rw http.ResponseWriter, r *http.Request) {
    u := r.Context().Value("user").(User)
    // your code
})
{{< /highlight >}}