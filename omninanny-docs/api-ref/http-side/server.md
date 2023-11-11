# Server



###

## <mark style="color:blue;">`Client API`</mark>

### Create client token

{% swagger method="post" path="/api/server/user" baseUrl="" summary="Create token for a client" %}
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

### Get client state

{% swagger method="get" path="/api/server/user" baseUrl="" summary="Get client info (states)" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="key" required="true" %}
Omninanny Server Key
{% endswagger-parameter %}
{% endswagger %}

