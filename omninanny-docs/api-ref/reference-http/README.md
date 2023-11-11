---
description: Omninanny - HTTP side
---

# HTTP Side



###

{% swagger method="get" path="/" baseUrl="" summary="" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/user/state" baseUrl="" summary="" expanded="false" fullWidth="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="token" required="true" type="String" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```json
{
    "user": {
        "id": "0123456789",
        "nick": "@alec1o",
    },
    "match": {
        "online": true,
        "name": "ranked-battle-royale"
    },
    ""
    "state": {
        "online": false,
        "match": false,
        "last_view": 1699672623
    }
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}
