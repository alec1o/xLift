> # IN DEVELOPMENT

# Sisma
Matchmaking, Game server manager with docker (Simple Server Manager)

![sisma diagram](https://github.com/alec1o/Sisma/assets/100610503/e2d50830-69ce-4373-abcd-7fa112d55a6e)

<br>

## Install
```txt
To configure containers, bind port, game modes, it will be through a web panel.
which will run on an exposed port... see more in the installation area bellow 
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
- ##### User authentication
    - ###### JWT
        ```js
        {
          "sub": "global-client-id",
          "level": 0,
          "exp": "utc-expire-date"
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
        - Success
            ```js
            {
              "sisma": "AUTH_USER_SUCCESS",
              "message": "Connected successfully"
            }
            ```
        - Error
            ```js
            Websocket will be disconnected
            ```
- ##### Root (Admin) authentication
    - ###### Step
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
        - Success
            ```js
            {
              "sisma": "AUTH_ROOT_SUCCESS",
              "message": "Connected successfully"
            }
            ```
        - Error
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
     - ###### SUCCESS 
        ```js
        {
          "sisma": "ROOT_CHECKUSER_SUCCESS",
          "subs": [
            { "sub": "user1", "online": true },
            { "sub": "user2", "online": true }
          ]
        }
    - ###### ERROR
      - Unauthorized
        ```js
        {
          "sisma": "ROOT_CHECKUSER_UNAUTHORIZED",
          "message": "You do not have permission to access this article.."
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
     - ###### SUCCESS 
        ```js
        {
          "sisma": "ROOT_DISCONNECTUSER_SUCCESS",
          "subs": [
            { "sub": "user1", "online": false },
            { "sub": "user2", "online": false }
          ]
        }
    - ###### ERROR
      - Unauthorized
        ```js
        {
          "sisma": "ROOT_DISCONNECTUSER_UNAUTHORIZED",
          "message": "You do not have permission to access this article.."
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
     - ###### SUCCESS
        ```js
        {
          "sisma": "ROOT_SENDMESSAGE_SUCCESS",
          "subs": [
            { "sub": "user1", "received": true },
            { "sub": "user2", "received": true }
          ]
        }
    - ###### ERROR
      - Unauthorized
        ```js
        {
          "sisma": "ROOT_SENDMESSAGE_UNAUTHORIZED",
          "message": "You do not have permission to access this article.."
        }

<br>

## Matchmaking 
-  ##### Join ``Join a matchmaking queue``
    ```js
    {
      "sisma": "matchmaking_Join",
      "mode": "1v1"
    }
    ```
    - ###### Success
      ```js
      {
        "sisma": "matchmaking_Join_Success",
        "mode": "1v1",
        "guid": "asdf",
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
    - ###### Error ``Error joining matchmaking queue``
      - Timeout
        ```js
        {
          "sisma": "matchmaking_Join_Timeout",
          "message": "Match time limit exceeded, please try again."
        }
        ```
      - Invalid Mode
        ```js
        {
          "sisma": "matchmaking_Join_InvalidMode",
          "message": "The mode you selected is not available."
        }
        ```
      - In Queue
        ```js
        {
          "sisma": "matchmaking_Join_InQueue",
          "message": "You are already in a matchmaking queue, please try again later."
        }
        ```
      - Unauthenticated
        ```js
        {
          "sisma": "matchmaking_Join_Unauthenticated",
          "message": "Facing authentication problem, try reconnecting."
        }
        ```
-  ##### Unjoin ``Unjoin/Leave matchmaking queue``
    ```js
    {
      "sisma": "matchmaking_Unjoin"
    }
    ```
    - ###### Success
      ```js
      {
        "sisma": "matchmaking_Unjoin_Success",
        "mode": "1v1"
      }
      ```
    - ###### Error ``Error unjoining/leaving queue``
      - Not found
        ```js
        {
          "sisma": "matchmaking_Unjoin_NotFound",
          "message": "Unable to find user in match queue."
        }
        ```
      - Unauthenticated
        ```js
        {
          "sisma": "matchmaking_Unjoin_Unauthenticated",
          "message": "Facing authentication problem, try reconnecting."
        }
        ```
