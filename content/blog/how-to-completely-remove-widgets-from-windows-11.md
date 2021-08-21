---
title: "How to Completely Remove Widgets From Windows 11"
date: 2021-08-21T16:19:04-05:00
draft: false
description: "Tutorial on how to remove Widgets from Windows 11 using powershell"
tags: ['windows']
---

If you are using Windows 11 at the moment you may have noticed that even tho you are disabling Widgets from the taskbar you can still open it using `Windows Key + W` or you can see it consuming memory from the Task Manager. In order to definitely remove it you have to remove it from your powershell terminal using the following command `running it as Administrator`:  

{{< highlight powershell >}}
Get-AppxPackage *Client.WebExperience* | Remove-AppxPackage
{{< /highlight >}}

Now you are free of Widgets consuming your resources and you don't have to think about them ever again. This process can be done with several other pre-installed windows applications so if you want to know how to do so [let me know](https://twitter.com/DatsGabs) in the comments or Twitter directly :))