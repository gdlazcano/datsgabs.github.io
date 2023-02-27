---
title: "Create a secure Isolated Iframe"
date: 2022-03-08T21:17:07-06:00
draft: false
description: "In this post I'm explaining how to create a secure iframe in easy steps."
tags: ["html"]
---

You might have heard that if you create an iframe, your site might becomes vulnerable to cross-site attacks. And this is true. So there is a way of creating an isolated iframe in order to make it more secure.

This can be achieved just by using the attribute `sandbox` which enables an extra set of restrictions for the content in the iframe. And being capable of enabling only the required tooling for your iframe with the following `attribute values`:

`allow-forms`: Allows form submission\
`allow-modals`: Allows to open modal windows\
`allow-orientation-lock`: Allows to lock the screen orientation\
`allow-pointer-lock`: Allows to use the Pointer Lock API\
`allow-popups`: Allows popups\
`allow-popups-to-escape-sandbox`: Allows popups to open new windows without inheriting the sandboxing\
`allow-presentation`: Allows to start a presentation session\
`allow-same-origin`: Allows the iframe content to be treated as being from the same origin\
`allow-scripts`: Allows to run scripts\
`allow-top-navigation`: Allows the iframe content to navigate its top-level browsing context\
`allow-top-navigation-by-user-activation`: Allows the iframe content to navigate its top-level browsing context, but only if initiated by user

```html
<iframe src="demo_iframe_sandbox.html" sandbox="allow_scripts"></iframe>
```

If some some reason you are using injected HTML, as it is useful for many frameworks like [Hugo](https://gabriellazcano.com/blog/my-stack/), or you just want to type the inline HTML, you can use the attribute `srcdoc` which lets you do this securely. Which is the same as `src` attribute but not cross domain and other differences. Such as being secure in in legacy-browsers and secure browsers.

```html
<iframe
    srcdoc="
<html>
    <head>
        <!-- Your content goes here -->
    </head>
    <body>
        <!-- Your content goes here -->
    </body>
</html>
"
    sandbox="allow_scripts"
></iframe>
```

For a `Hugo` shortcode:

```html
<iframe
    srcdoc="{{safeHTMLAttr .Inner}}"
    frameborder="0"
    sandbox="allow-scripts"
>
    <iframe></iframe
></iframe>
```
