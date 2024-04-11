Scaleable-chat App using WebSockets , nodeJS , Redis, Prisma, Kafkajs

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

# 11. multiple server start horizontal scaleing

export PORT=port number && npm run dev

# 12. This command removes all Docker containers. It's useful when you want to clean up all containers that are not currently running.

docker rm $(docker ps -aq)

# 13. This command stops a specific Docker container identified by its ID (b97615baaabd). You would replace b97615baaabd with the actual container ID you want to stop.

docker stop b97615baaabd

# 14.This command allows you to execute a bash shell within the running Node.js container managed by Docker Compose. This is useful when you need to interact with the container directly, for example, to run additional commands or troubleshoot issues

docker-compose exec node bash

# 15. how to work with redis in cli

1. docker ps --> list of container
2. docker exec -it 3e10b255b188 bash -> redis container id
3. redis-cli
4. ping
5. localhost:8001 redis database

yarn prisma studio --> show database data
npx prisma migrate dev --name init --> migrate data base
