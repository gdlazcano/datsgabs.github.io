---
title: "Easiest page transitions in React with Framer Motion"
date: 2022-08-06
draft: false
description: "Framer Motion is a great library for creating page transitions in React. It's easy to use and it's great for creating page transitions."
tags: ["css"]
---

I've been using Framer Motion for a while now and I'm really enjoying it. It's a great library that allows you to create animations in React.

There is a really nice feature that **allows you to keep an element in DOM and animate it before it is removed**. This is very useful for page transitions. And it is the easiest thing in the world, it really is like magic.

To add Framer Motion to our React application:

```bash
npm install framer-motion
```

## With React Router

Here's what a normal React application looks like:

```tsx
// App.tsx
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={Home} />
            <Route path="/about" element={About} />
            <Route path="/contact" element={Contact} />
            <Route path="/*" element={NotFound} />
        </Routes>
    </Router>
)
```

For animations to work, **we have to create a AnimatedRoutes component that will be inside the Router component**, in order to be able to use the useLocation hook.

```tsx
// App.tsx
import React from "react"
import AnimatedRoutes from "./AnimatedRoutes"
import { BrowserRouter as Router } from "react-router-dom"

export default function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    )
}
```

```tsx
// AnimatedRoutes.tsx
import React from "react"

import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"

import { useLocation } from "react-router-dom"

export default function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={Home} />
                <Route path="/about" element={About} />
                <Route path="/contact" element={Contact} />
                <Route path="/*" element={NotFound} />
            </Routes>
        </AnimatePresence>
    )
}
```

> It's really important to use the `location` prop inside the AnimatedRoutes component, because it will be used to determine which element to render.

## With Next.js

In Next.js is even easier. In `_app.tsx` page:

```tsx
// Components
import { AnimatePresence } from "framer-motion"

export default function Application({ Component, pageProps }: AppProps) {
    const router = useRouter()

    return (
        <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
        </AnimatePresence>
    )
}
```

## Inside page component

```tsx
import { motion } from "framer-motion"

export default function Page() {
    return (
        <motion.div
            // Prop that will animate when component is removed from DOM
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h1>Hello World</h1>
        </motion.div>
    )
}
```

> PD: There's a current issue with Next.js when using CSS Modules. The library removes the styles from the DOM too soon. You can track this issue on [GitHub](https://github.com/vercel/next.js/issues/17464)

And from here you can do pretty much everything you can do with Framer Motion. You can animate the page transition, animate the page content, animate the page background, animate the page title, etc. Check [the Framer Motion documentation](https://www.framer.com/docs) for more information. But for now, just know you use the 'exit' prop to animate the page transition.

You can see an example of page transitions with this technique in an site I'm [currently working on](https://imajo.vercel.app).

Let me know if this worked and feel free to make a push request if you see any errors in this post. Also if you have any questions, **feel free to ask me in the comments** or contact me on [Twitter](https://twitter.com/gdlazcano_).
