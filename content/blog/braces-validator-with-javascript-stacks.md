---
title: "Braces Validator With Javascript: Stacks"
date: 2021-03-19T17:15:50-06:00
draft: false
description: "In this post I'm explaining a use case of stacks and how did I made a braces validator with JavaScript"
tags: ["js"]
---

{{< sandbox sandbox="allow-scripts" height="300px">}}

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        body {
            background: white;
            padding: 10px 20px;
        }

        * {
          color: black;
        }
    </style>

</head>
<body>
    <h1>Type your string</h1>
    <p>You can try these</p>
    <pre>
"(){}[]" // True
"([{}])" // True
"(}"     // False
"[(])"     // False
"[({})](]"  //False
    </pre>
    <input type="text" id="input">
    <p id="result"></p>
    <script>
        const input = document.querySelector('#input')
        const result = document.querySelector('#result');

        const braces = {
            "{": "}",
            "(": ")",
            "[": "]",
        }
        function validBraces(str){
            let stack = []
            for (const char of str) {
                try {
                    if (stack.length > 0 && braces[stack[stack.length - 1]] == char) {
                        stack.pop()
                    } else {
                        stack.push(char)
                    }
                }

                catch (error) {
                    return false
                }
            }
            return stack.length == 0
        }

        input.addEventListener("input", (event) => {
            result.textContent = `The string is ${validBraces(input.value) ? "": "not"} valid`
        })
    </script>

</body>
</html>
{{</ sandbox >}}

Today I was messing around doing some CodeWars challenges and some problem got my attention. It was to make a braces validator. The rules are simple, given a string we have to determine if all braces are matched with the correct brace. You can check out the [complete kata here.](https://www.codewars.com/kata/5277c8a221e209d3f6000b56/train/javascript)

So I started trying different ways. But none seemed to work. Then I remembered there were this magical data structures called stacks.

`Stacks` are a data structure that work by pushing and poping elements.

In this particular example I am first defining if the stack is empty or not, if it is I have to push the first element. And from then start comparing the current element to the last pushed element. For the comparison I am using a functionality of JavaScript, whose name I don't know, which basically works by indexing an object with a string.

Here it is in practice.

{{< highlight js >}}
const braces = {
"{": "}",
"(": ")",
"[": "]",
}

console.log(braces["{"]) // logs "}"
{{</ highlight >}}

So in an object I just have to define the counterpart of the brace and it's has an access time of 1.

If the current brace is not equal to the last one in the stack it will get pushed into the stack. If it is it will not push the current brace and it will pop the last element in the stack. So if there is any element left in the stack it means that the string is not valid either because some brace has no counterpart or because some brace is opened and closed in between other.

{{< highlight js >}}
const braces = {
"{": "}",
"(": ")",
"[": "]",
}

function validBraces(str){
let stack = []
for (const char of str) {
if (stack.length > 0 && braces[stack[stack.length - 1]] == char) {
stack.pop()
} else {
stack.push(char)
}
}
return stack.length == 0
}
{{</ highlight >}}
