---
title: "Centering in CSS is now easier than ever"
date: 2021-03-01T07:40:38-06:00
draft: true
tags: []
categories: []
keywords: []
description: ""
---

## Introduction

If you have been on the industry for a good amount of time you surely remember searching on Stackoverflow how to center things vertically an horizontally and I have to say it was a pain. A lot of people would say that it's just too hard but I think there are just so many ways of doing it.

## Centering

### Position absolute method

{{< highlight css >}}
.parent {
    position: relative;
}

.child {
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
{{< /highlight >}}

