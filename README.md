# Online 3D Web Game Boilerplate

# Setup
You’ll need to install a few things before you have a working copy of the project.

### Requirements:

- node >= 18.1.2,
- npm >= 10.5.2

### 1. Clone this repo:

Navigate into your workspace directory.

Run:

```git clone https://github.com/flobbun/online-web-game-boilerplate.git```

### 2. Install dependencies:

Navigate to the cloned repo’s directory.

Run:

```npm install```

### 3. Create a .env file:

Both client and server folders have a `.env.example` with the necessary environment variables to work, you'll need to make a copy of them and rename it to `.env`.

Run the following commands in the root directory of the project:

```cp apps/client/.env.example apps/client/.env```

```cp apps/server/.env.example apps/server/.env```

### 4. Run both, client and server:

```npm run dev```

or run them separately:

```npm run client```

```npm run server```

And that's it! You should see the client and server running in your terminal.

Navigate to [http://localhost:4200](http://localhost:4200) to see your project in the browser.

### Build for deployment:

Run:

```npm run build```

This will create a `dist` folder in the root directory of the project with the client and server build files.

### Run on a docker container:

After building the project, you can run it on a docker.

```docker-compose up```

## What’s inside?

Two apps, one for the client and one for the server.

The client app is a simple react app that connects to the server via websockets.

The server app is a simple node.js app that uses express.js.

Both client and server use [colyseus](https://colyseus.io/) for the websocket communication and game state management.

In the client app you can find a simple example of how to use the colyseus client to connect to the server and how to handle the game state.

We use [zustand](https://zustand-demo.pmnd.rs/) for the client state management.

The monorepo also has a small library to save types and entities, which can be shared between the client and the server.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

If you want to contribute to this project and make it better, your help is very welcome.
