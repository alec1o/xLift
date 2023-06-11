[Unit]
Description="Sisma client"
After=network.target

[Service]
# env
Environment="SISMA_KEY=<my-secret-key-here>"
Environment="SISMA_HOST=0.0.0.0"
Environment="SISMA_PORT=10101"
Environment="SISMA_DOCKER_HOST=127.0.0.1"
Environment="SISMA_DOCKER_PORT=2375"

# app entry point
ExecStartPre=yarn --cwd /opt/sisma/client/ install
ExecStart=yarn --cwd /opt/sisma/client/ start

# auto restart on error
Restart=on-failure
RestartSec=1s

[Install]
WantedBy=multi-user.target