---
description: Server side api
---

# HTTP: Server Side

### User

{% swagger method="get" path="/api/server/user" baseUrl="" summary="Get user info" %}
{% swagger-description %}
Get user info
{% endswagger-description %}

{% swagger-parameter in="query" name="key" required="true" %}
Omninanny server password
{% endswagger-parameter %}

{% swagger-parameter in="body" name="sub" required="true" %}
User ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```json
{
    "sub": "0123456789",
    "code": 200,
    "token": "ey...",   
    "nickname": "@alec1o",    
    "is_online": true,
    "match": {
        "in_match": true,
        "host": "127.0.0.1",
        "port": 8080,
        "mode": "ranked-battle-royale"
    }
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="invalid body" %}
```json
{
    "code": 400,
    "message": "invalid body"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="invalid key" %}
```json
{
    "code": 401,
    "message": "invalid key"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/api/server/user" baseUrl="" summary="Create user token" %}
{% swagger-description %}
When you user connect to your server you must create a token for this user, it require <mark style="color:blue;">`User ID`</mark> and <mark style="color:blue;">`Nickname`</mark> This token will be used by client to connect to Omninanny Server, to self use <mark style="color:green;">`Matchmaking, Chat, or Other features.`</mark>

~~_**`Hacks`**_~~

if your implementation don't have `nickname` support you also use `User ID` as `Nickname`
{% endswagger-description %}

{% swagger-parameter in="query" name="key" required="true" %}
Omninanny Server Key
{% endswagger-parameter %}

{% swagger-parameter in="body" name="sub" required="true" %}
User Unique ID
{% endswagger-parameter %}

{% swagger-parameter in="body" name="nickname" required="true" %}
User Name
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="token created" %}
```json
{
    "token": "ey...",
    "nickname": "@alec1o",
    "sub": "0123456789",
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid body" %}
```json
{
    "code": 400,
    "message": "invalid body"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid Key" %}
```json
{
    "code": 401,
    "message": "invalid key"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/api/server/user" baseUrl="" summary="Disconnect user" %}
{% swagger-description %}
Disconnect connected user
{% endswagger-description %}

{% swagger-parameter in="query" name="key" required="true" %}
Omninanny server password
{% endswagger-parameter %}

{% swagger-parameter in="body" name="sub" required="true" %}
Client ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```json
{
    "code": 200,
    "disconnected": true,
    "sub": "0123456789"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="invalid body" %}
```json
{
    "code": 400,
    "message": "invalid body"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="invalid key" %}
```json
{
    "code": 401,
    "message": "invalid key"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/api/server/user/command" baseUrl="" summary="User command (Event / Chat)" %}
{% swagger-description %}
Send command "event" to connected client
{% endswagger-description %}

{% swagger-parameter in="body" name="sub" required="true" %}
Client ID
{% endswagger-parameter %}

{% swagger-parameter in="body" name="title" required="true" %}
Command title
{% endswagger-parameter %}

{% swagger-parameter in="query" name="key" %}
Omninanny server password
{% endswagger-parameter %}

{% swagger-parameter in="body" name="body" required="true" %}
Command body
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```json
{
    "code": 200,
    "sent": true,
    "sub": "0123456789"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="invalid body" %}
```json
{
    "code": 400,
    "message": "invalid body"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="invalid key" %}
```json
{
    "code": 401,
    "message": "invalid key"
}
```
{% endswagger-response %}
{% endswagger %}

### Worker

{% swagger method="get" path="/api/server/worker" baseUrl="" summary="Get workers" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="post" path="/api/server/worker" baseUrl="" summary="Create new worker" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/api/server/worker" baseUrl="" summary="Delete worker" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

### Server

{% swagger method="get" path="/api/server/server" baseUrl="" summary="Get servers" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="post" path="/api/server/server" baseUrl="" summary="Create server" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/api/server/server" baseUrl="" summary="Delete server" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

### Server orchestration

{% swagger method="get" path="/api/server/server/orchestration" baseUrl="" summary="Get server instances" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="post" path="/api/server/server/orchestration" baseUrl="" summary="Create server instance" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="" baseUrl="" summary="Delete server instance" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}
