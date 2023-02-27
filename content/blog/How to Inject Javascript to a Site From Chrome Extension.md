---
title: "How to Inject Javascript to a Site From Chrome Extension"
date: 2022-07-03T22:46:36-05:00
draft: false
description: "Tutorial on how to create a chrome extension that injects code into a site"
tags: ["js"]
---

## Introduction

I was watching a Twitch streamer struggle trying to do this. So I thought it might help someone out there.

You can inject javascript code into any site with a chrome extension, with this you can do many things. Like creating new elements and adding them to the DOM or managing events of certain elements, what you can do in your application you can do it when injecting it.

## Manifest version 3

If you want your script to run on a set of pages you have defined, the manifest for your chrome extension which is needed for it to work [(you can have a look a the documentation)](https://developer.chrome.com/docs/extensions/mv3/getstarted/), needs to have some additional elements. `content_scripts` and `host_permissions`

Both the `matches` and `host_permissions` should specify [match patterns](https://developer.chrome.com/docs/extensions/mv3/match_patterns/). In this example `inject.js` only runs whenever the site is google.com, and you have permissions in all the urls.

```json
{
    "name": "inject",
    "version": "1.0",
    "manifest_version": 3,
    "content_scripts": [
        {
            "matches": ["*://*.google.com/*"],
            "js": ["inject.js"]
        }
    ],
    "host_permissions": ["<all_urls>"]
}
```

This is an example of the code that can be injected. You can add event listeners, get and add elements from the DOM as I mentioned before.

```js
function init() {
    const el = document.createElement("input")
    el.setAttribute("type", "checkbox")
    document.body.appendChild(el)
    el.addEventListener("click", (event) => {
        console.log(event.target.checked)
    })
}

init()
```
