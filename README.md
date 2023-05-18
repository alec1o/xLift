> # IN DEVELOPMENT

# Sisma
Matchmaking, Game server manager with docker (Simple Server Manager)

### Install
  - git >= 2.0
  - dotnet >= 6.0
  
```rb
$ git clone "https://github.com/alec1o/Sisma"
$ cd Sisma
# running with default config (127.0.0.1:10101)
$ dotnet run dev
# or 
$ dotnet run 127.0.0.1 10101
```

### How to have multiple game servers?
"image-here"
  
### How add more machines from one machine to the host?
"image-here"

### How to make reservations at the door?
"image-here"
> Sisma reserves all the ports in its range, that is, no other application will be able to use the port once sisma reserves it, it will unlock the ports for docker to bind and after the server finishes it will reserve it again.
Sisma reserves all the ports in its range, that is, no other application will be able to use the port once sisma reserves it, it will unlock the ports for docker to bind and after the server finishes it will reserve it again.


### Functions
> All clients must keep their websocket open and connected to sisma server and need a jwt to connect with the server. ``sisma will accept all connections whose jwt is valid, and have the sub element in its body``
  - (server) search for a connected players using player id (id == jwt-sub)
  - (client) request join on room
  - (client) receive message from Matchmaking
<br>

![Sisma drawio](https://github.com/alec1o/Sisma/assets/100610503/75fd930e-720d-4698-9e00-4018feb6a72d)
