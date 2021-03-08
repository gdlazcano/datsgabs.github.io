---
title: "How to Create a Contrasting Cursor. BONUS: MouseMove Optimization."
date: 2021-03-05
draft: false
description: "In this post I'm going to explain how to make a custom cursor that inverts the color of the content it's covering."
tags: ['css', 'js']
---

You might think, what do you think by contrasting cursor. I believe it's better if you see it by yourself. 

{{< sandbox >}}
<html>
  <head>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      body {
        overflow: hidden;
      }

      .container {
        width: 100vw;
        height: 100vh;
        background-color: white;
        position: relative;
      }

      .circle {
          width: 60px;
          height: 60px;
          background: white;
          mix-blend-mode: difference;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          pointer-events: none;
        }

    </style>
  </head>
  <body>
    <div class="container">
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
    <div class="circle"></div>
    </div>
    <script>
      const cursor = document.querySelector(".circle");
      const delay = 250;

      function throttle(callback, limit) {
        let wait = false;
        return function () {
          if (!wait) {
            callback.apply(null, arguments);
            wait = true;
            setTimeout(function () {
              wait = false;
            }, limit);
          }
        };
      }

      // window.resize callback function
      function getDimensions(e) {
        cursor.style.top = `${e.clientY - 25}px`;
        cursor.style.left = `${e.clientX - 25}px`;
      }

      // window.resize event listener
      window.addEventListener("mousemove", (e) => {
        throttle(getDimensions(e), delay);
      });
    </script>
  </body>
</html>
{{</ sandbox >}}

To achieve this we are using the `mix-blend-mode` CSS property with the value `difference` which basically inverts the color of the content it has below it. 

{{< highlight css >}}
.container { 
    width: 100vw; 
    height: 100vh; 
    // Setting the width and height to be the full page
    background-color: white; 
    position: relative; 
}

.circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
}
{{< /highlight >}}

Here we are positioning the circle absolute to the container, giving it a size and with border-radius we are making the div a circle. I disable the `pointer-events` or we are not going to be able to click anywhere in the site. 

> Setting the `background-color` to white in both the `.container` and the `.circle` is needed for this to work, you can change the color but it might not look as good.

And we start to see that it blends already. We just have to make the circle to move.

{{< sandbox >}}
<html>
  <head>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      body {
        overflow: hidden;
      }

      .container {
        width: 100vw;
        height: 100vh;
        background-color: white;
        position: relative;
      }

      .circle {
          width: 60px;
          height: 60px;
          background: white;
          mix-blend-mode: difference;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          pointer-events: none;
        }

    </style>
  </head>
  <body>
    <div class="container">
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
      <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio enim natus, modi aperiam, aspernatur rerum, molestias corporis fuga nihil dicta fugit in sapiente eveniet eius eos soluta suscipit sunt molestiae. </p>
    <div class="circle"></div>
    </div>
  </body>
</html>
{{</ sandbox >}}

{{< highlight js >}}
const cursor = document.querySelector(".circle")

function getDimensions(e) {
  cursor.style.top = `${e.clientY - 25}px` // -25px for the size of the circle
  cursor.style.left = `${e.clientX - 25}px`
}

window.addEventListener("mousemove", (e) => {
  getDimensions(e)
});
{{< /highlight >}}

**And it's working**

## Bonus: MouseMove Optimization

While it's working, if you add a `console.log()` to the `getDimensions` function you might see lots of calls to the function. Which is not really good for performance. 

There is a really known way of solving this problem. By throttling the function calls only firing it once the `mousemove` event idle for 250ms

{{< highlight js >}}
const delay = 250

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

window.addEventListener("mousemove", (e) => {
  throttle(getDimensions(e), delay)
});
{{< /highlight >}}