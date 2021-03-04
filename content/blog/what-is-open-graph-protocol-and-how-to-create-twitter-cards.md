---
title: "What is Open Graph Protocol and how to create Twitter Cards?"
date: 2021-03-01T22:25:28-06:00
draft: false
description: "Have you ever seen Twitter links that have a preview to the content? I'll show you how to do them"
tags: ['HTML']
---

Have you ever seen Twitter links that have a preview to the content? Those links are using Open Graph Protocol. This is something that I literally found out today, as I was asking a fellow blogger *Flavio Copes*, recommended btw. Apparently it is a very common practice but it doesn't get used so often by new web developers and can definitely make your content stand out.

## What is Open Graph Protocol?

Open Graph is an internet protocol that was originally created by Facebook to standardize the use of metadata within a webpage to represent the content of a page.

Within it, you can provide details as simple as the title of a page or as specific as the duration of a video. These pieces all fit together to form a representation of each individual page of the internet.

## Why to use it? 

As I said before it makes your content stand out, which is obviously what we want on the internet. Not using a content rich link can make us lose potential traffic we could have had.

{{< tweet 1366868641468317696 >}}

## Open Graph basics

There are 5 Open Graph tags that are required for it to work properly which are `og:title`,`og:type`, `og:image`, and `og:url`, `og:description`. Twitter uses this tags as a fallback in case you don't use `twitter:*` with the corresponding tag 

For placing the tags on you website, just do it with normal `<meta>` tags in the `<head>` space

{{< highlight html >}}
<meta property=“og:[replace with tag]” content=“[VALUE]” />
{{< /highlight >}}

`og:title`: Title of your website\
`og:description`: Description of your website\
`og:type`: Depends on what your content is. The full list of standard object properties is in [Object Properties Reference](https://ogp.me/#types).\
`og:image`: An image URL which should represent your object within the graph. \
`og:url`: The URL of your site. ex. [https://gabriellazcano.com](https://gabriellazcano.com/)

In my case this would be what I have to add:

{{< highlight html >}}
<head>
    <meta property="og:title" content="What is Open Graph Protocol and how to create Twitter Cards?">
    <meta property="og:description" content="Have you ever seen Twitter links that have a preview to the content? I'll show you how to do them">
    <meta property="og:image" content="http://gabriellazcano.com/images/image.png">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://gabriellazcano.com">
    <!-- more stuff -->
</head>
{{< /highlight >}}

If you’re interested in diving in more, the documentation does a great job at providing a list of all of the available tags for you to use.

https://ogp.me/

## How Twitter uses Open Graph?

Twitter has it's own way of creating the so called Twitter Cards. It's really not difficult, as straightforward as the simple `og:*` tags but you have to add them if you expect to make it work in the site.

You add them similarly as the the Open Graph tags but you have to use the `name` attribute and `twitter:*`

> tip: Ensure you are using `name=""` instead of `property=""`

{{< highlight html >}}
<meta name="twitter:card" content="[substitute with summary, summary_large_image, app, etc)]">
<meta name="twitter:title" content="[title]">
<meta name="twitter:description" content="[description]">
<meta name="twitter:image" content="[link to image]">
<!-- more stuff -->
{{< /highlight >}}

You can check the full documentation on Twitter cards on https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started

You can test and visualize your Twitter cards in https://cards-dev.twitter.com/validator 
