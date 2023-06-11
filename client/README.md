## INSTALL

### Dependencies 
- ###### NodeJS ``>= 18.x`` 
- ###### Docker ``>= 20.x`` 

### Environment variables
- ###### SISMA_KEY `` ``
- ###### SISMA_HOST `` ``
- ###### SISMA_PORT `` ``
- ###### SISMA_DOCKER_HOST `` ``
- ###### SISMA_DOCKER_PORT `` ``

### Configure docker remote access
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
  tcp        0      0 127.0.0.1:2375          0.0.0.0:*               LISTEN      3758/dockerd
  ```
