---
title: "Reactive Variables are the BEST feature in Svelte"
date: 2021-03-13T14:13:41-06:00
draft: false
description: "In this post I'm going to explain how to use reactive variables in Svelte and how can they be useful."
tags: ['svelte']
---

Well, maybe I'm exagerating a little bit. But for real, reactive variable are such a good feature I don't know how other frameworks haven't copied it to it's full extent yet. 

They work like this, you declare a variable and if the variable changes it triggers another variable to change it's value if it's related to the initial variable. For example: 

{{< highlight html >}}
<script>

    let a = 5
    $: double = a * 2

</script>

<main>
    {double}
    <input type="number" bind:value={a}>
</main>
{{</ highlight >}}

You can see a similar [example in the docs ](https://svelte.dev/tutorial/reactive-declarations). But what this basically does, is that every time we change the value of the input it would change the `double` variable to be times 2 the a variable.

And you could do lots of things with it.  

Changing the document title.

{{< highlight html >}}
<script>

    let name = "Title";

    $: document.title = name

</script>

<main>
    <input type="text" bind:value={name}>
</main>
{{</ highlight >}}

And even calling functions. For this I have the perfect example, making an svg triangle with the sides being reactive. And also using the reactive variables feature to get the hypotenuse with a neat one liner

{{< codesandbox "brave-einstein-2hfx4" >}}

Here's the code :))

{{< highlight html >}}
<script>
    let a = 10;
    let b = 5;

    function getSides(a, b) {
    if (a > b) {
        // Doing a rule of 3 by setting the larger side to be 100 and calculating the other
        b = (b * 100) / a;
        a = 100;
    } else {
        a = (a * 100) / b;
        b = 100;
    }
    return { a, b };
    }

    $: sides = getSides(a, b);
    $: hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
</script>

<style>
    .triangle {
        width: 150px;
        height: 150px;
    }
</style>

<main>

    <div class="triangle">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0 0, {sides.b} {sides.a}, 0 {sides.a}"/>
        </svg>
    </div>

    <span>Hypotenuse: {hypotenuse}</span>
    <input type="number" bind:value={a} name="a">
    <input type="number" bind:value={b} name="b">
</main>
{{</ highlight >}}

Thanks for reading. If you've got any other example of how reactive variables could be used feel free to let me know :))