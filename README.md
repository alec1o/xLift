# Sisma
Matchmaking, Game server manager with docker (Simple Server Manager)

<br>

## Connection centralization
> All clients must keep their websocket open and connected to sisma server and need a jwt to connect with the server.
  - Search for a connected player
    > the jwt of each user something called "sub" which is the user id, and must be unique in your application that jwt must be created by the user's auth server. plus your auth app and sisma must use the same environment variable containing the JWT_KEY
    ```rb
    Find one (GET) [http://127.0.0.1/user/<sub>]
      Code 200: { connected: true }
      Code 5xx: internal error
    
    Find many (GET) [http://127.0.0.1/users/] (BODY) [{sub: <sub>}]
             
      Code 200: { connected: {online: [{sub: <sub>}], offline: [{sub: <sub>]}}
      Code 5xx: internal error
    ```



<br>

![Sisma drawio](https://github.com/alec1o/Sisma/assets/100610503/75fd930e-720d-4698-9e00-4018feb6a72d)
