<h6 align="end">IN DEVELOPMENT</h6>
<h1 align="center"><a href="https://github.com/alec1o/sisma">Sisma</a></h1>
<h6 align="end"><sub><a href="https://github.com/alec1o/sisma">SISMA</a> or <a href="https://github.com/alec1o/sisma"><code>SI</code></a>MPLE <a href="https://github.com/alec1o/sisma"><code>S</code></a>ERVER <a href="https://github.com/alec1o/sisma"><code>MA</code></a>NAGER</sub></h6>
  
<h6 align="center"><sub>
  powered by <a href="https://github.com/alec1o">ALEC1O</a><sub/>
</h6>

##### About
> <sub>[SISMA](https://github.com/alec1o/sisma) _Is a Matchmaking, Game server manager with docker_</sub>

<br>

##### Documentation
> <sub>Consult the documentation for a better understanding and clarification of doubts [HERE](/docs)</sub>

<br>
  
##### Install
> <sub>A guide how to install the system.</sub>
- ###### Paths ``Configure environment variables``
    ###### ``SISMA_ROOT_KEY`` Is the token you will use to communicate with the sisma web/console and run the root (admin) endpoint
    ###### ``SISMA_JWT_KEY`` Is the jwt key that your server used to create client jwt, sisma needs the same key to verify user tokens that connect to sisma

- ###### Console
  ```sh
  $ git clone "https://github.com/alec1o/sisma/"
  $ cd sisma/src/web/
  $ yarn dev --host "http://127.0.0.1:3000/"
  ```
  
- ###### Sisma
  ```sh
  $ git clone "https://github.com/alec1o/sisma/"
  $ cd sisma/src/lib/
  $ dotnet run 127.0.0.1 10101
  ```
  
<br>

##### Console
> <sub>Console, is a web panel where you can observe the status and create rooms (modes). _Rooms are a prefab that will be used to create matches_.</sub>
<div align="center">
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/ed306784-398f-4802-94bd-bd230e113477" alt="sisma diagram architecture">
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/3cb143bb-f536-4371-b4a3-504e31e329e2" alt="sisma web - login" />
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/78ba0156-1c7c-40e9-9086-a6b90036cf72" alt="sisma web - root page create new room (mode)" />
    <image width="49%" src="https://github.com/alec1o/Sisma/assets/100610503/5c30440e-70c9-4536-820b-ceb6a07807f8" alt="sisma web - root page update existent room (mode)" />
</div>

<br>

##### FAQ
  
###### How do I communicate with sisma? 
> <sub>You need to use a websocket and convert all input and output data to json format, following the usage protocols seen below in the documentation.</sub>
###### What environment should it run in?
> <sub>Linux, Windows, Mac. Where C# runs and has docker installed. Linux is the best.</sub>
###### Does sisma run on multiple clusters?
> <sub>No. Sisma was designed to run on just one machine.</sub>
###### How to balance the game?
> <sub>Sisma requires your player to enter an argument called "level" as a number in your jwt. so when your user wants to join a room, the user must be included in the room whose level is identical.</sub>
###### How do I adjust my "level" so that the game is competitive?
> <sub>Well, in this case, I have to give an example. If your game has 3 levels, which are "Silver, Gold and Diamond", a good idea is to make the "silver" level level 1, all "gold and diamond" level 2. That way, all "silver" levels " will be paired with "silver" and " All "gold and diamond" will gather in the same room, and no "silver" will be joined with "gold or diamond". you can leave the levels of all users identical ex level 0, then sisma will add everyone in the same room. Notice: "User level is just a prefix and does not affect any algorithm, you can make a rank being level 1000 for example and anyone with the same level will be included in the same room, sisma will not make any kind of approximation to unite players, the level itself is a filter that can be controlled by your authentication server that creates the tokens for your players to connect to sisma. in short, the level serves only to separate users by categories"</sub>
