<h6 align="end">IN DEVELOPMENT</h6>
<h1 align="center"><a href="https://github.com/alec1o/sisma">Sisma</a></h1>
<h6 align="end"><sub><a href="https://github.com/alec1o/sisma">SISMA</a> or <a href="https://github.com/alec1o/sisma"><code>SI</code></a>MPLE GAME <a href="https://github.com/alec1o/sisma"><code>S</code></a>ERVER <a href="https://github.com/alec1o/sisma"><code>MA</code></a>NAGER</sub></h6>
  
<h6 align="center"><sub>
  powered by <a href="https://github.com/alec1o">ALEC1O</a><sub/>
</h6>

##### About
> <sub>[SISMA](https://github.com/alec1o/sisma) _Is a Matchmaking, Game server manager with docker_</sub>

<br>

##### Documentation
> <sub>Consult the documentation for a better understanding and clarification of doubts <a href="https://sisma.docs.kezero.com" target="_blank">HERE</a></sub>

<br>
  
##### Install
> <sub>A guide how to install the system.</sub> 
- ###### Client (worker)
  <a href="/client" target="_blank"><sub>GO HERE</sub></a>
  ###### ``SISMA_KEY`` this key is used when you register a new worker in sisma core using sisma console, this token is for validating requests it is a "firewall" blocking remote docker for any connection without this token in its http header SISMA_KEY
  
- ###### Console (web dashboard)
  <a href="/console" target="_blank"><sub>GO HERE</sub></a>

- ###### Core (sisma core)
  <a href="/core" target="_blank"><sub>GO HERE</sub></a>
  ###### ``SISMA_KEY`` this token is for creating a root connection, after opening the connection for the connection you can: "create room, delete room, disconnect user, send events to users, see all games. etc." any connection logged using this token cannot join a match!
  ###### ``SISMA_JWT`` is the token that your server (not sisma) uses to create the jwt token so that client connections (client api, not sisma worker), use the token when opening a connection with sisma core. after sisma core validates the client token the connection can: "join a game, send messages to other clients, check specific client if is connected, ...) you cannot execute root commands like "create a room or disconnect a client"

  
<br>

##### Console
> <sub>Console, is a web panel where you can observe the status and create rooms</sub>
<div align="center">
    <img width="49%" src="t" alt="sisma console: create cluster (gif)" />
    <img width="49%" src="" alt="sisma console: create room (gif)" />
    <img width="49%" src="" alt="sisma console: dashboard" />
    <img width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/ed306784-398f-4802-94bd-bd230e113477"  alt="sisma architecture" />    
</div>

<br>

##### FAQ
- ###### How do I communicate with sisma? 
  > <sub>You need to use a websocket and convert all input and output data to json format, following the usage protocols seen below in the documentation.</sub>
- ###### What environment should it run in?
  > <sub>Linux, Windows, Mac. Where C# runs and has docker installed. Linux is the best.</sub>
- ###### Does sisma run on multiple clusters?
  > <sub>Yes. The sisma core runs on one machine, but the sisma workers are designed to run on multiple machines to run containers.</sub>
- ###### How to balance the game?
  > <sub>Sisma requires your player to enter an argument called "level" as a number in your jwt. so when your user wants to join a room, the user must be included in the room whose level is identical.</sub>
- ###### How do I adjust my "level" so that the game is competitive?
  > <sub>Well, in this case, I have to give an example. If your game has 3 levels, which are "Silver, Gold and Diamond", a good idea is to make the "silver" level level 1, all "gold and diamond" level 2. That way, all "silver" levels " will be paired with "silver" and " All "gold and diamond" will gather in the same room, and no "silver" will be joined with "gold or diamond". you can leave the levels of all users identical ex level 0, then sisma will add everyone in the same room. Notice: "User level is just a prefix and does not affect any algorithm, you can make a rank being level 1000 for example and anyone with the same level will be included in the same room, sisma will not make any kind of approximation to unite players, the level itself is a filter that can be controlled by your authentication server that creates the tokens for your players to connect to sisma. in short, the level serves only to separate users by categories"</sub>
