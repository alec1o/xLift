> # IN DEVELOPMENT

# Sisma
Matchmaking, Game server manager with docker (Simple Server Manager)

![Sisma drawio](https://github.com/alec1o/Sisma/assets/100610503/75fd930e-720d-4698-9e00-4018feb6a72d)

<br>

```txt
To configure containers, bind port, game modes, it will be through a web panel.
which will run on an exposed port... see more in the installation area
```

## Install
```rb
$ git clone "https://github.com/alec1o/Sisma"
$ cd Sisma

# default config (--sisma: 127.0.0.1:10101 --web: 127.0.0.1:3000)
$ dotnet run dev

# Advanced
$ dotnet run --sisma "127.0.0.0:10101" --web "127.0.0.1:80"
```

<br>

## Authentication
- ##### User authentication
    - ###### JWT
        ```js
        {
          "sub": "global-client-id",
          "exp": "utc-expire-date"
        }
        ```
    - ###### Step
        ```
        - jwt needs to have a parameter called "sub", and it's required. if you don't have
        the client, you can't connect to sisma. the "sub" must be the user id in the scope
        of your publication. your server needs to generate this jwt token and send it to the
        user to use when connecting with sisma, "the password your program uses to encrypt
        jwt must be the same in the sisma environment variable SISMA_JWT_KEY"     
        
        1. When opening a websocket add the jwt in the request header

        Header {
            token: JWT_ENCODED_AS_STRING_HERE 
        }
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

<br>

## Root (Admin)
- ##### Check User Status
    ```js
    {
      "sisma": "root_CheckUser",
      "subs": [
        {"sub": "user-1-id-here" },
        {"sub": "user-2-id-here" }
      ]
    }
    ```
     - ###### Success
        ```js
        {
          "sisma": "root_CheckUser_Success",
          "subs": [
            { "sub": "user-1-id-here", "online": true },
            { "sub": "user-2-id-here", "online": false }
          ]
        }
    - ###### Error
      - Unauthenticated
        ```js
        {
          "sisma": "root_CheckUser_Unauthenticated",
          "message": "Facing authentication problem, try reconnecting."
        }
      - Unauthorized
        ```js
        {
          "sisma": "root_CheckUser_Unauthorized",
          "message": "You do not have permission to access this article.."
        }
        
- ##### Disconnect users
    ```js
    {
      "sisma": "root_DisconnectUser",
      "subs": [
        {"sub": "user-1-id-here" },
        {"sub": "user-2-id-here" }
      ]
    }
    ```
     - ###### Success
        ```js
        {
          "sisma": "root_DisconnectUser_Success",
          "subs": [
            { "sub": "user-1-id-here", "online": false },
            { "sub": "user-2-id-here", "online": false }
          ]
        }
    - ###### Error
      - Unauthenticated
        ```js
        {
          "sisma": "root_DisconnectUser_Unauthenticated",
          "message": "Facing authentication problem, try reconnecting."
        }
      - Unauthorized
        ```js
        {
          "sisma": "root_DisconnectUser_Unauthorized",
          "message": "You do not have permission to access this article.."
        }

- ##### Send message
    ```js
    {
      "sisma": "root_SendMessage",
      "message": "Hello users",
      "subs": [
        {"sub": "user-1-id-here" },
        {"sub": "user-2-id-here" }
      ]
    }
    ```
     - ###### Success
        ```js
        {
          "sisma": "root_SendMessage_Success",
          "subs": [
            { "sub": "user-1-id-here", "received": true },
            { "sub": "user-2-id-here", "received": true }
          ]
        }
    - ###### Error
      - Unauthenticated
        ```js
        {
          "sisma": "root_SendMessage_Unauthenticated",
          "message": "Facing authentication problem, try reconnecting."
        }
      - Unauthorized
        ```js
        {
          "sisma": "root_SendMessage_Unauthorized",
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
