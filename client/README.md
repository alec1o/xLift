## INSTALL

### Dependencies 
- ###### Git ``>= 2.x``
```sh
sudo apt install git
```
- ###### NodeJS ``>= 18.x`` 
```sh
sudo apt install nodejs -y && sudo apt install npm -y && sudo npm i -g yarn && echo "DONE"
```
- ###### Docker ``>= 20.x`` 
  #### [(Official) Docker installation](https://docs.docker.com/engine/install/)

### Environment variables
- ###### SISMA_KEY `` ``
- ###### SISMA_HOST `` ``
- ###### SISMA_PORT `` ``
- ###### SISMA_DOCKER_HOST `` ``
- ###### SISMA_DOCKER_PORT `` ``

## Configure docker remote access
##### See official tutorial [here](https://docs.docker.com/config/daemon/remote-access/)
- ##### Use the command sudo systemctl edit ``docker.service`` to open an override file for ``docker.service`` in a text editor.
  ```rb
  sudo systemctl edit docker.service
  ```
- ##### Add or modify the following lines, substituting your own values.
- ###### ``⚠ to make your docker secure I recommend you to expose your ip to 127.0.0.1 or localhost. the sisma client will be responsible for binding and verifying the request tokens.``
  ```rb
  [Service]
  ExecStart=
  ExecStart=/usr/bin/dockerd -H fd:// -H tcp://127.0.0.1:2375
  ```
- ##### Reload the systemctl configuration.
  ```rb
  sudo systemctl daemon-reload
  ```
- ##### Restart Docker.
  ```rb
  sudo systemctl restart docker.service
  ```
- ##### Verify that the change has gone through.
  ```rb
  sudo netstat -lntp | grep dockerd
  ```
  <sup>Output</sup>
  ```rb
  tcp        0      0 127.0.0.1:2375          0.0.0.0:*               LISTEN      3758/dockerd
  ```

## Installing SISMA
- ##### Clone repos ``repo will be saved in /opt/sisma``
  ```rb
   sudo git clone "https://github.com/alec1o/sisma" /opt/sisma
  ```
- ##### Create a symbolic link to the system service
  ```rb
  ln -s /opt/sisma/client/service.sh /etc/systemd/system/sisma-client.service
  ```
- ##### Update SISMA_KEY credentials and other environment variables
  <sup>using nano text editor</sup>
  ```rb
  nano /opt/sisma/client/service.sh
  ```
  <sup>Output: FILE CONTENT</sup>
  ```sh
  [Unit]
  Description="Sisma client"
  After=network.target

  [Service]
  # env
  Environment="SISMA_KEY=<my-secret-key-here>"
  Environment="SISMA_HOST=0.0.0.0"
  Environment="SISMA_PORT=10101"
  Environment="SISMA_DOCKER_HOST=http://127.0.0.1"
  Environment="SISMA_DOCKER_PORT=2375"

  # app entry point
  ExecStartPre=yarn --cwd /opt/sisma/client/ install
  ExecStart=yarn --cwd /opt/sisma/client/ start

  # auto restart on error
  Restart=on-failure
  RestartSec=1s

  [Install]
  WantedBy=multi-user.target
  ```
- ##### Whenever you change the settings it is necessary to restart the service for the new update to run.
  ```sh
  `systemctl daemon-reload && systemctl restart sisma-client.service;
  ```
- ##### Now the system is running at ``http://<your-host>:10101`` now we have to make sure that whenever the computer restarts the sisma-client also starts.
  ```sh
  systemctl enable sisma-client.service
  ```
