# Stardust API
## This is the API server for the Stardust application

### Installation

```
# clone the repository
$ git clone https://github.com/blaiseludvig/stardust-backend.git

# install the dependencies
$ cd stardust-backend
$ npm install
```
Set the required environment variables in the .env file (see .env.example)
> .env
```
# The JWT secret
JWT_SECRET=1234
```
After the environment variables are set, the server can be started
```
# running in development mode
# npm run start:dev

# or in production mode
# npm run build
# npm run start:prod
```
## API diagram
 ![API diagram](./Stardust%20API.png)

 Edit version [here](https://excalidraw.com/#json=S1j5OlR3cq9nVmeb0f1Hr,I8cewY5lBubeDEu1nJOE0A)
