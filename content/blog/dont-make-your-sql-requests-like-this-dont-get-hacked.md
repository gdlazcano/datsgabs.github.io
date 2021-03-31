---
title: "Don't make your SQL requests like this! Dont get hacked: SQL Injection"
date: 2021-03-31T10:27:36-06:00
draft: false
description: ""
tags: ["cybersecurity", "js"]
---

## Introduction

So I've been learning SQL and something came to my mind. How safe is this, I won't lie I've heard of SQL injections before but never really got into it. But now I know it's really a dangerous tool if you are not doing things correctly, and the best way of preventing this is knowing how to do it. Also for what I've investigated it seems that a lot of sites are vulnerable to this kind of attacks so we have to make awareness of the topic.

## Example server

In this occasion I'm going to be using express and mysql to demonstrate the attack and how to fix it. It's important however that you investigate your specific stack so you can be more secure. Firstly I'm going to create a new `express` server with the `express-session` middleware to manage authentication and `body-parser` to get the body from the `post` request from the form.

{{< highlight js >}}
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
    app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(\_\_dirname + '/login.html'));
});

app.get('/home', (request, response) => {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(8000);
{{</ highlight >}}

Now I have to craete a simple `login.html` file to be served

{{< highlight html >}}
<!-- login.html -->

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login Form Tutorial</title>
		<style>
		.login-form {
			width: 300px;
			margin: 0 auto;
		}
		.login-form h1 {
			text-align: center;
			color: #4d4d4d;
			font-size: 24px;
			padding: 20px 0 20px 0;
		}
		.login-form input[type="password"],
		.login-form input[type="text"] {
			width: 100%;
			padding: 15px;
			border: 1px solid #dddddd;
			margin-bottom: 15px;
			box-sizing:border-box;
		}
		.login-form input[type="submit"] {
			width: 100%;
			padding: 15px;
			background-color: #535b63;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			font-weight: bold;
			color: #ffffff;
		}
		</style>
	</head>
	<body>
		<div class="login-form">
			<h1>Login Form</h1>
			<form action="auth" method="POST">
				<input type="text" name="username" placeholder="Username" required>
				<input type="password" name="password" placeholder="Password" required>
				<input type="submit">
			</form>
		</div>
	</body>
</html>
{{</ highlight >}}

And finally I have to add the `auth` url logic. This would be a post action just as specified in the HTML. I will also be importing `dotenv` to not expose my user and password in the codebase but just for testing you can leave it like this, so you have to create a `.env` file. 

{{< highlight bash >}}
# .env

USERNAME = (your MySQL username)
PASS = (your MySQL password)
{{</ highlight >}}

{{< highlight js >}}
require('dotenv').config()

const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.USERNAME,
	password : process.env.PASS,
	database : 'test'
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
        // vulnerable
		connection.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = results[0].username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
{{</ highlight >}}

### Vulnerabily explanation

And here is the vulnerable part of the whole application. In the `connection.query()`. Basically here we are getting the body of the request with the username and password and making a string that function as a MySQL query BUT what if the username or passsword are not normal strings. 

What would happen if we requested something like this `' OR 1=1 -- ` as user and " " as password

I'll tell you what would happen. We would be doing this SQL request. 

{{< highlight sql >}}
SELECT * FROM users WHERE username='' or 1=1 -- AND password=" "
{{</ highlight >}}

As you can see in the linter the 2 dashes are commenting the `AND` part. So we reduce the query to "is username empty or 1 equal 1" and MySQL would say "there is no user with an empty space but 1 equals 1" so it will return every single user in the database. Then we would be authenticating as the first user which is normally... yes you guessed, it the admin.  

{{< video src="/videos/1.mp4" width="864" height="630" >}}

## Fixing the query

So with express it's pretty simple to solve this. We need tweak our code so any user input is automatically spaced before being executed and in the MySQL library for nodejs you can use placeholders. 

{{< highlight js >}}
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
        // not vulnerable
		connection.query('SELECT * FROM users WHERE username= ? AND password= ?', [username, password],function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = results[0].username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
{{</ highlight >}}

After this you might want to check if you are using concatenation to make your SQL requests in order to not be vulnerable to this kind of attacks :))
