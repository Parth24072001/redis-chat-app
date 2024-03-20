setup backend package json

- npm i -y

install typescript
-npx tsc --init

tsconfigFile changes

- "outDir": "./dist"
- "rootDir": "./src"

compile node

- npm run build

docker command:-

# 1. Start Docker containers in detached mode

docker-compose up -d

# 2. down Docker containers

docker-compose down

# 3. Stop conflicting service if encountering port errors (e.g., MongoDB)

sudo systemctl stop mongod.service

# 4. Access Node.js container's bash shell

docker-compose exec node bash

# 5. Rebuild and recreate Docker containers

docker-compose up --build --force-recreate

# 6. List all running containers

docker-compose ps

# 7. Remove a Docker container by its ID

docker rm <container_id>

# 8. List all Docker containers managed by Docker Compose

docker-compose -a

# 9. Recursively force-remove a folder and its contents

sudo rm -rf <foldername>

# 10. List all Docker containers, including stopped ones

docker ps -a
