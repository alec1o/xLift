## xLift.Worker

> ##### About
This program is used by xLift master and needs to be installed on a worker server.

> ##### Worker
Worker is the machine that performs xLift container tasks, and is controlled through this intermediate program.

> ##### Run the program
```rb
go run src/main.go
```

> ##### Build the program
```rb
go build -o xlift-worker.bin src/main.go
```
- ###### Run builded program
    ```rb
    ./xlift-worker.bin
    ```