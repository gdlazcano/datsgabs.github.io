---
title: "How to Auto Adjust Font Size to fit div"
date: 2021-03-05T23:08:34-06:00
draft: false
description: "In this post I'm explaining how to adjust the font-size to fit a div with JavaScript"
tags: ["js"]
---

![alt text](/images/blog/1.gif)


I've been trying to get a solution like this for a long time already. As I didn't find anything apart from libraries from JQuery I decided to make my own implementation with vanilla JavaScript.  I know there must be ways of optimizing my code completely with some algorithms and such. Feel free to let me know if you found something or you want to share something :)

## Detect Overflow

So I decided to take this path. Calculating if the div has overflow and then work the `font-size` afterwards. This is how we detect if a div has overflow: 

{{< highlight js >}}
function checkOverflow(el) {
    let curOverflow = el.style.overflow
    if (!curOverflow || curOverflow === "visible") {
        el.style.overflow = "hidden"
    }
    let isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
    el.style.overflow = curOverflow
    return isOverflowing
}
{{< /highlight >}}

## Adjust Font Size

And it's time for the main function! My thought process here was, if I start the `font-size` with `0.1em` I can increase the font size by a fixed rate until I get an overflow point in the div. For not overflowing I save the last size in a variable and substract the incrementation to get the last point when it wasn't overflowing. 

{{< highlight js >}}
const div = document.querySelector("div")

const incrementionRate = 0.05 // To augment 0.05em in every iteration 

function adjustFontSize(el) {
    el.style.fontSize = "0.1em"

    let fitted = false
    let lastSize

    while (!fitted) {
        if (checkOverflow(el)) {
            el.style.fontSize = `${lastSize - incrementionRate}em`
            fitted = true
        } else {
            lastSize = parseFloat(el.style.fontSize.slice(0, -2) + incrementionRate
            el.style.fontSize = `${lastSize}em`
        }
    }
}

adjustFontSize(div)
{{< /highlight >}}

And we have it. We are adjusting the font-size already. To make it to work when resizing we just have to call to the function when the `window resize` event happens.

{{< highlight js >}}
// ...

window.addEventListener("resize", () => {
    adjustFontSize(div)
})
{{< /highlight >}}

### Resize Optimization

If you've read my [other post](https://gabriellazcano.com/blog/how-to-create-a-contrasting-cursor/) you might have already noticed that doing handling the event this way is not very performant. So we are going to use the same technique. We are going to throttle the function calls to have a delay of 500ms.

{{< highlight js >}}
const delay = 500

// ...

function throttle(callback, limit) {
    let wait = false
    return function () {
        if (!wait) {
            callback.apply(null, arguments)
            wait = true
            setTimeout(function () {
                wait = false
            }, limit)
        }
    }
}

window.addEventListener("resize", () => {
    throttle(adjustFontSize(div), delay)
})
{{< /highlight >}}

## Related Posts

[How to Create a Contrasting Cursor. BONUS: MouseMove Optimization.](https://gabriellazcano.com/blog/how-to-create-a-contrasting-cursor/)
