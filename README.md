<h6 align="end">IN DEVELOPMENT</h6>
<h1 align="center"><a href="https://github.com/alec1o/sisma">Sisma</a></h1>
<h6 align="end"><sub><a href="https://github.com/alec1o/sisma">SISMA</a> or <a href="https://github.com/alec1o/sisma"><code>SI</code></a>MPLE <a href="https://github.com/alec1o/sisma"><code>S</code></a>ERVER <a href="https://github.com/alec1o/sisma"><code>MA</code></a>NAGER</sub></h6>
  
<h6 align="center"><sub>
  powered by <a href="https://github.com/alec1o">ALEC1O</a><sub/>
</h6>


##### About
> <sub>[SISMA](https://github.com/alec1o/sisma) _Is a Matchmaking, Game server manager with docker_</sub>

<h6 align="center">
 
<h6>


<br>

##### Console
> <sub>Console, is a web panel where you can observe the status and create rooms (modes). _Rooms are a prefab that will be used to create matches_.</sub>
<div align="center">
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/ed306784-398f-4802-94bd-bd230e113477" alt="sisma diagram architecture">
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/3cb143bb-f536-4371-b4a3-504e31e329e2" alt="sisma web - login" />
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/78ba0156-1c7c-40e9-9086-a6b90036cf72" alt="sisma web - root page create new room (mode)" />
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/5c30440e-70c9-4536-820b-ceb6a07807f8" alt="sisma web - root page update existent room (mode)" />
</div>


## Install
```txt
To configure containers, bind port, game modes, it will be through a web panel.
which will run on an exposed port...
```

```rb
$ git clone "https://github.com/alec1o/Sisma"
$ cd Sisma

# default config (--sisma: 127.0.0.1:10101 --web: 127.0.0.1:3000)
$ dotnet run dev

# Advanced
$ dotnet run --sisma "127.0.0.0:10101" --web "127.0.0.1:80"
```

<br>

## FAQ
### How do I communicate with sisma? 
> You need to use a websocket and convert all input and output data to json format, following the usage protocols seen below in the documentation.
### What environment should it run in?
> Linux, Windows, Mac. Where C# runs and has docker installed. Linux is the best. 
### Does sisma run on multiple clusters?
> No. Sisma was designed to run on just one machine.
### How to balance the game?
> Sisma requires your player to enter an argument called "level" as a number in your jwt. so when your user wants to join a room, the user must be included in the room whose level is identical.
### How do I adjust my "level" so that the game is competitive?
> Well, in this case, I have to give an example. If your game has 3 levels, which are "Silver, Gold and Diamond", a good idea is to make the "silver" level level 1, all "gold and diamond" level 2. That way, all "silver" levels " will be paired with "silver" and " All "gold and diamond" will gather in the same room, and no "silver" will be joined with "gold or diamond". you can leave the levels of all users identical ex level 0, then sisma will add everyone in the same room. Notice: "User level is just a prefix and does not affect any algorithm, you can make a rank being level 1000 for example and anyone with the same level will be included in the same room, sisma will not make any kind of approximation to unite players, the level itself is a filter that can be controlled by your authentication server that creates the tokens for your players to connect to sisma. in short, the level serves only to separate users by categories" 

<br>

## Authentication
- ##### USER
    - ###### JWT
        ```js
        {
          "sub": "user1",
          "level": 0,
          "exp": "utc-date"
        }
        ```
    - ###### Step
        ```
        - jwt needs to have a parameter called "sub" as string "level" as int, and it's required.
        if you don't have the client, you can't connect to sisma. the "sub" must be the user
        id in the scope of your publication. your server needs to generate this jwt token and
        send it to the user to use when connecting with sisma, "the password your program uses
        to encrypt jwt must be the same in the sisma environment variable SISMA_JWT_KEY"     
        
        1. When opening a websocket add the jwt in the request header

        Header {
            token: JWT_ENCODED_AS_STRING_HERE 
        }
        ```
        - ###### Success 
            ```js
            {
              "sisma": "AUTH_USER_SUCCESS"
            }
            ```
        - ###### Error 
            ```js
            Websocket will be disconnected
            ```
- ##### ROOT (ADMIN)
    - ###### STEP
        ```
        - To connect as root (admin) you need to add an environment variable whose
        name is SISMA_ROOT_KEY, once the value of this variable you can use to open
        a connection with the server in root mode     
        
        1. When opening a websocket connection, it uses the value of the environment variable
        SISMA_ROOT_KEY in the header of the connection opening request
        
        Header {
            token: SISMA_ROOT_KEY_IS_ENVIRONMENT_VARIABLE
        }
        ```
        - ###### Success 
            ```js
            {
              "sisma": "AUTH_ROOT_SUCCESS"
            }
            ```
        - ###### Error 
            ```js
            Websocket will be disconnected
            ```

<br>

## ROOT (ADMIN)
- ##### CHECK USER
    ```js
    {
      "sisma": "ROOT_CHECKUSER",
      "subs": [
        {"sub": "user1" },
        {"sub": "user2" }
      ]
    }
    ```
     - ###### Success 
        ```js
        {
          "sisma": "ROOT_CHECKUSER_SUCCESS",
          "subs": [
            { "sub": "user1", "online": true },
            { "sub": "user2", "online": false }
          ]
        }
    - ###### Error 
      - ###### Unauthorized 
        ```js
        {
          "sisma": "ROOT_CHECKUSER_UNAUTHORIZED",
          "message": "You do not have permission to perform this action."
        }
        
- ##### DISCONNECT USER
    ```js
    {
      "sisma": "ROOT_DISCONNECTUSER",
      "subs": [
        {"sub": "user1" },
        {"sub": "user2" }
      ]
    }
    ```
     - ###### Success 
        ```js
        {
          "sisma": "ROOT_DISCONNECTUSER_SUCCESS",
          "subs": [
            { "sub": "user1", "online": false },
            { "sub": "user2", "online": false }
          ]
        }
    - ###### Error
      - ###### Unauthorized 
        ```js
        {
          "sisma": "ROOT_DISCONNECTUSER_UNAUTHORIZED",
          "message": "You do not have permission to perform this action."
        }

- ##### SEND MESSAGE
    ```js
    {
      "sisma": "ROOT_SENDMESSAGE",
      "message": "message here",
      "subs": [
        {"sub": "user1" },
        {"sub": "user2" }
      ]
    }
    ```
     - ###### Success
        ```js
        {
          "sisma": "ROOT_SENDMESSAGE_SUCCESS",
          "subs": [
            { "sub": "user1", "received": true },
            { "sub": "user2", "received": false }
          ]
        }
    - ###### Error 
      - ###### Unauthorized 
        ```js
        {
          "sisma": "ROOT_SENDMESSAGE_UNAUTHORIZED",
          "message": "You do not have permission to perform this action."
        }

<br>

## MATCHMAKING 
-  ##### JOIN ``Join a matchmaking queue``
    ```js
    {
      "sisma": "MATCHMAKING_JOIN",
      "mode": "1v1"
    }
    ```
    - ###### Success 
      ```js
      {
        "sisma": "MATCHMAKING_JOIN_SUCCESS",
        "mode": "1v1",
        "guid": "guid",
        "host": {
          "address": "127.0.0.1",
          "ports": [
            { "tcp_chat": 2000 },
            { "tcp_game": 3000 },
            { "udp_game": 4000 }
          ]
        }
      }
      ```
    - ###### Error 
      - ###### Timeout 
        ```js
        {
          "sisma": "MATCHMAKING_JOIN_TIMEOUT",
          "message": "Unable to start a match due to timeout, please try again."
        }
        ```
      - ###### Invalid Mode
        ```js
        {
          "sisma": "MATCHMAKING_JOIN_INVALIDMODE",
          "message": "Game mode is not available"
        }
        ```
      - ###### In Queue
        ```js
        {
          "sisma": "MATCHMAKING_JOIN_INQUEUE",
          "message": "User is not in a queue"         
        }
        ```
      - ###### Unauthorized 
        ```js
        {
          "sisma": "MATCHMAKING_JOIN_UNAUTHORIZED",
          "message": "You do not have permission to perform this action."
        }
        ```
-  ##### UNJOIN
    ```js
    {
      "sisma": "MATCHMAKING_UNJOIN"
    }
    ```
    - ###### Success 
      ```js
      {
        "sisma": "MATCHMAKING_UNJOIN_SUCCESS",
        "mode": "1v1"
      }
      ```
    - ###### Error
      - ###### Not found 
        ```js
        {
          "sisma": "MATCHMAKING_UNJOIN_NOTFOUND",
          "message": "Could not find the user."
        }
        ```
      - ###### Unauthorized 
        ```js
        {
          "sisma": "MATCHMAKING_UNJOIN_UNAUTHORIZED",
          "message": "You do not have permission to perform this action."
        }
        ```
