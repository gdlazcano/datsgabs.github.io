---
title: "How to run a .exe without opening a prompt in Windows"
date: 2021-07-11T14:52:44-05:00
draft: false
description: "In this post I'm going to explain how to run a .exe without opening a prompt and how to make it run from the startup"
tags: ["windows"]
---

## Introduction

I was doing a Golang Shortcuts application and I wanted to run my program in the background without having a prompt in my taskbar all the time.

After investigating I found out this can be achieved by calling the .exe from a .vbs file is a pretty easy way of accomplishing this. You just have to create an object shell and run the .exe with these parameters.

## VBS File

```powershell
Set Shell = CreateObject("WScript.Shell")
Shell.Run "C:\users\dirofyourexecutable.exe", 0, False
```

`Shell.Run` receives the path of your executable, an integer indicating the appearance of the programs window, and a boolean indicating whether the script should wait for the program to finish executing.

You can check all the available settings for [intWindowStyles](https://www.vbsedit.com/html/6f28899c-d653-4555-8a59-49640b0e32ea.asp)

## Run on start

If you wanted to run this file when Windows Starts you just have to paste it in the Startup folder located in `"C:\Users\[username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"` or just type `startup` in the explorer bar
