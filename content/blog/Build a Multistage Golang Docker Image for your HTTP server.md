---
title: "Build a Multistage Golang Docker Image for your HTTP server"
date: 2022-07-12T19:22:10-05:00
draft: false
description: "In this post I'm going to explain how to make a multistage golang docker for a http server in order to serve static files"
tags: ["golang"]
---

## Introduction

I was trying to deploy an application with Golang and React to Heroku and I wanted my application to be the smallest possible size. Heroku actually recommends doing multistage build and it's pretty much common practice. But I had to do a lot of research to come up with something that worked and the reason it was because of something really stupid actually.

## Simple HTTP application Golang

So we have a simple HTTP application, it doesn't really matter which library or framework we are using. The problem I had with the Dockerfiles I found online is that they were not taking into consideration that I was serving a `public` folder. So when I did `docker run -p 3000:3000 httpserver-go` it would return a 404 error.

```go
package main

import (
    "net/http"
)

func main() {
    path, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

    http.Handle("/", http.FileServer(http.Dir(path+"/public/")))
    http.ListenAndServe(":3000", nil)
}
```

> I'm using path because I need to reference the folder from outside and inside the image. And for some odd reason it seemed that the relative path was not working inside Docker.

## Dockerfile

```dockerfile
FROM golang:1.16 as build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

FROM alpine
WORKDIR /go
RUN mkdir -p /go/public
COPY --from=build /src/public /go/public
COPY --from=build /src/app /go/app
EXPOSE 3000
ENTRYPOINT /go/app
```

I'm just going to comment the relevant things about this Dockerfile. In line 1 we are giving the Go image the build tag so we can later do reference to it. We copy all the files into the /src directory and create the application with the [go -o tag](https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies). From the alpine image, we have to copy both the `/src/public` folder and the application on `/bin/app`. Then just expose the port 3000 and make an execute the application.

> CGO_ENABLED=0 was a must for building the application, if not the application would just not work. Not really know why it wouldn't. If you know fell free to comment or do a pull request :))
