# Sisma
Matchmaking, Game server manager with docker (Simple Server Manager)

### Install
  - git >= 2.0
  - dotnet >= 6.0
  
```rb
$ git clone "https://github.com/alec1o/Sisma"
$ cd Sisma
$ dotnet run 0.0.0.0 10101
```

### Functions
> All clients must keep their websocket open and connected to sisma server and need a jwt to connect with the server. ``sisma will accept all connections whose jwt is valid, and have the sub element in its body``
  - (server) search for a connected players using player id (id == jwt-sub)
  - (client) request join on room
  - (client) receive message from Matchmaking
<br>

![Sisma drawio](https://github.com/alec1o/Sisma/assets/100610503/75fd930e-720d-4698-9e00-4018feb6a72d)
