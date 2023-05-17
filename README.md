# Sisma
Matchmaking, Game server manager with docker (Simple Server Manager)

<br>

## Connection centralization (websocket)
> All clients must keep their websocket open and connected to sisma server and need a jwt to connect with the server.
  - Search for a connected player
    > the jwt of each user something called "sub" which is the user id, and must be unique in your application that jwt must be created by the user's auth server. plus your auth app and sisma must use the same environment variable containing the JWT_KEY
    ```rb
    Find one (GET) [http://127.0.0.1/api] (event: "get-one-user") 
      Return { connected: true/false }
    
    Find many (GET) [http://127.0.0.1/api] (event: "get-many-user") (data) [{sub: <sub>}]             
      Return: { online: [{sub: <sub>}], offline: [{sub: <sub>]}}
    ```
- Send message to player
  > 
  ```rb
    Send message for one (GET) [http://127.0.0.1/api] (event: "message-for-one-user") 
      Return { connected: true/false }
    
    Send message for many (GET) [http://127.0.0.1/api] (event: "message-for-many-users") (data) {subs: [{sub: <sub>}], message: "" }             
      Return: { received: [{sub: <sub>}], non_receive: [{sub: <sub>]} }
    ```
    



<br>

![Sisma drawio](https://github.com/alec1o/Sisma/assets/100610503/75fd930e-720d-4698-9e00-4018feb6a72d)
