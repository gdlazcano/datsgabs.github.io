---
title: "How to Add a Custom Domain to Your Github Pages?"
date: 2021-03-02
draft: false
tags: ['networking']
description: "Github Pages is a top-notch way of hosting you static site. To improve SEO you should add a custom domain. I'll show you how."
---

I have to admit, I was struggling with getting my Github Pages to use my custom domain. In fact is **extremely** easy, I have to say I have no idea why I was struggling really.

## Requirements

1. A custom domain (the provider doesn't really matter, just make sure you can change the DNS records)
2. An active Github page, in the form [username].github.io or [project].github.io

## Set DNS records

Every major Domain provider has it's own way of setting up a new DNS record, but it's really straightforward. All you need to do is set `A` & `CNAME` records for the selected domain.

You have to add 4 `A` pointing to `@` record from this list: 

1. `185.199.108.153`
2. `185.199.109.153`	
3. `185.199.110.153`
4. `185.199.111.153`

And then add a `CNAME` record with the name `www` pointing to your `[username].github.io` page:

![image](/images/blog/1.png)

Your dashboard should end up looking like this. 

## Add custom domain in Github

Now you are ready to go. Go to your project and in the settings tab there is the option of setting up your custom domain. Just type your domain and click save.

![image](/images/blog/2.png)

Now just wait up to 24 hours for the DNS to propagate. If you don't see any changes you can troubleshoot with the [Github Pages documentation](https://docs.github.com/en/github/working-with-github-pages/troubleshooting-custom-domains-and-github-pages). 
