---
title: "Easy Dark Mode With CSS variables"
date: 2021-03-03
draft: false
description: "A small article on how to use prefers-color-sheme and :root for making a simple dark mode implementation"
tags: ["css"]
---

I've found out a lot of ways of implementing a dark mode in your site. Both with Javascript and CSS. Today I'm going to share a method which doesn't allow it to be toggled with a button but it's the easiest way I've found.

For achieving this we are going to use the `prefers-color-scheme` media feature, which is used to detect if the user has requested to use a light or dark theme, and `:root` for setting global variables in CSS.

```css
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #121212; // This is how we define a variable in CSS
    }
}

@media (prefers-color-scheme: light) {
    :root {
        --background-color: #ffffff;
    }
}
```

Then in any part of the site we have to use the `--bg-color` variable with `var()` like this:

```css
body {
    background-color: var(--background-color);
}
```

You can check support for `prefers-color-scheme` in [Can I Use?](https://caniuse.com/mdn-css_at-rules_media_prefers-color-scheme)

## Wrap up

I hope you will find this blog post useful and keep it handy for a quick reference. Feel free to send me a DM or to mention me on Twitter if you’ve got any suggestion or fix :)
