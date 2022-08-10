---
title: "Why you might replace Disqus with Webmentions"
date: 2022-08-08
draft: false
description: "Disqus is a terrible service if performance is a concern. Webmentions are a better alternative. In this post, I'll show you."
tags: []
image:
tweet_id: 1557055760168894469
---

My blog is statically generated, so it needs an external service to handle the comments. At first I chose Disqus because it's know for being free and easy to setup. However, it **has ads, tracks a lot of data and tolls on the page loading performance**. The reason [I chose using Hugo](https://gabriellazcano.com/blog/my-stack/) was for the bare performance I would get but, for this reason using Disqus sounded completely counterproductive.

## Disqus is a bad idea

### Disqus makes 76 HTTP Requests per load

In [this article from Supun Kavinda](https://supunkavinda.blog/disqus) they found that with a blank installation page where the only added dependency is Disqus. Disqus makes **76 requests and 2MB of data with no comments** and it took **7 seconds to load.**

![big](https://i.imgur.com/RHljmum.png)

### 11 Third Trackers

Also this person found 11 different third party trackers on the page. Disqus was acquired by an advertising company called Zeta Global and they started placing Pixels/Trackers all over your page if you are using Disqus.

![](https://imgur.com/7uPPY3M.png)

## Webmentions are a better idea

A tweet was the thing that started all this, it wasn't even about webmentions. It was about which [SSG generation was the fastest](https://www.zachleat.com/web/build-benchmark/) (spoiler: Hugo) from the [creator of of 11ty Zach Leatherman](https://twitter.com/zachleat) and at the bottom of his articles there is a section of how many retweets/likes and comments from a tweet he published about the article. That was the first time I've ever seen webmentions.

![](https://i.imgur.com/iDJOerf.png)

### What are webmentions?

Webmention is a simple way to notify any URL when you mention it on your site. From the receiver's perspective, it's a way to request notifications when other sites mention it.

### How to use webmentions?

I use 2 services to achieve this. [webmention.io](https://webmention.io/) to use webmentions in my site and [brid.gy](https://brid.gy) to poll tweets and send it as webmentions to my site.

#### Setup webmention.io and brid.gy

The first you need to do is to add your domain to your profile on twitter.

![big](https://i.imgur.com/suPwMxx.png)

Then add the same domain to webmention.io to sign up your website. It will prompt a **twitter login.**

![](https://i.imgur.com/a1khgaa.png)

After doing this setup, you just have to add this to the head of your site:

```html
<link rel="webmention" href="https://webmention.io/[your domain]/webmention" />
<link rel="pingback" href="https://webmention.io/[your domain]/xmlrpc" />
```

[Brid.gy](https://brid.gy) connecting is really straightforward.

![](https://i.imgur.com/EIdb2hk.png)

#### Add webmentions to your site

You can make a **JSON request to the webmention.io api**. From there you can retrieve all the domain webmentions or page specific.

All webmentions:

```bash
https://webmention.io/api/mentions.jf2?domain=[your domain]&token=[your token]
```

<hr />

Page specific:

```bash
https://webmention.io/api/mentions.jf2?target=[page url]
```

[Chris Bongers from Daily Dev Tips ](https://twitter.com/DailyDevTips1) has a great [article on how to use them with 11ty](https://daily-dev-tips.com/posts/implementing-webmentions-on-a-11ty-blog/)

## Thanks for reading, let's connect

Thanks for reading my blog. Feel free to reach out to me if you have any questions or want to connect. You can also make a pull request if you want to improve the article :)))
