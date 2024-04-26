## xLift.Worker

> ##### About
This program is used by xLift master and needs to be installed on a worker server.

> ##### Worker
Worker is the machine that performs xLift container tasks, and is controlled through this intermediate program.

> ##### Run the program
```sh
# user mode
dotnet run --project worker/worker.csproj

# dev mode
dotnet watch run --project worker/worker.csproj
```