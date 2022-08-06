---
title: "Namespacing Chrome Storage for page dependant settings for your Chrome Extension"
date: 2021-03-03
draft: false
description: "A tutorial of how to namespace chrome.storage for making it dependant on the current page"
tags: ["JS"]
---

As far as I know `chrome.storage` saves it's keys globally, so it's not like `localstorage` on normal pages that gets only works in the current page. For that purpose I had to figure out a way of achieving this. So I decided using namespaces using template literals. This is a really made up process so there might be inaccuracies, feel free to let me know :)

## Creating the extension

Creating the extension from scratch is pretty straightforward, we just have to add a `manifest.json` file with the following values:

> `permissions` are needed for the sole purpose of this tutorial but could be not added

{{< highlight json >}}
{
"name": "[name of the extension]",
"version": "1.0",
"manifest_version": 3,
"permissions": ["storage", "tabs"],
"action": {
"default_popup": "popup.html"
}
}
{{< /highlight >}}

We have to create a `popup.html` file and just use it as if it was a normal HTML. We can import scripts add stylsheets, etc.

{{< highlight html >}}

<div class="container">
    <div class="box "></div>
    <button id="toggle">Toggle</button>
</div>

<script src="popup.js"></script>

{{< /highlight >}}

In the `popup.js` file is where we are going to have the logic for namespacing `chrome.storage` keys.

Firstly, I have to point out that `chrome.storage` is an `async` api therefore we will have to use `async/await` on our main function.

> If you are working with multiple variables I recommend using an object, as I did.

{{< highlight javascript >}}
;(async function () {
let settings = {
active: false
}
// Gets the current URL of the tab
const url = await new Promise((res, rej) => {
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
let url = tabs[0].url
res(url)
})
})

    // Gets chrome storage with the namespace URL
    const synchedSettings = await new Promise((res, rej) => {
        chrome.storage.sync.get(`settings:${url}`, (results) => {
            res(Object.values(results)[0])
        })
    })

    if (synchedSettings) {
        settings = synchedSettings
        handleToggleButton(settings.active)
    }

})()
{{< /highlight >}}

Here we are using the `tab` API, that we enabled before in the `manifest`, to get the URL of the current page and we wait for the `Promise` to resolve. Then we use the `storage` api and use a template literal to get the settings only from the current URL. As we have no real way of getting the key from the results, we just resolve the first element in the `Object.values()` that returns an array of all the keys in the `results` which in this case is the `settings` object we want. Then we substitute the default `settings` object with the one we got from `storage`. **To conclude, it works.**

To set up a new element we have to set the `addEventListener` inside the `async function` as we'll need the URL for setting up the namespace.

{{< highlight javascript >}}

const toggleButton = document.querySelector("#toggle")
const box = document.querySelector('.box')

// Add class to .box depending of if it's active or not
function handleToggleButton(active) {
if (active) {
box.classList.add('active')
} else {
box.classList.remove('active')
}
}

;(async function () {

    // ...

    // When toggle gets pressed changes settings.value value and saves it to storage with namespace
    toggleButton.addEventListener("click", () => {
        settings = {
            active: !settings.active
        }
        chrome.storage.sync.set({ [`settings:${url}`]: settings }, function () {
            handleToggleButton(settings.active)
        })
    })

})()
{{< /highlight >}}

### Add Chrome Extension

You have to go to `chrome://extensions` and turn on Developer Mode. Press `Load unpacked` and select the directory where the extension is. In the screenshot I'm using Brave Browser but it makes no difference.

![](https://i.imgur.com/snhT2Z4.png)

## Wrap up

I hope you will find this blog post useful and keep it handy for a quick reference. This solution is a little clumsy but I didn't find any better way and wanted to share it with you. Feel free to send me a DM or to mention me on Twitter if you've got any suggestion or fix.

You can look at the whole code in [this repository](https://github.com/DatsGabs/namespace-chrome-storage-extension)
