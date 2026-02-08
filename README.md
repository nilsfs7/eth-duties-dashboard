# Eth-Duties-Dashboard

A dashboard for TobiWo's [eth-duties](https://github.com/TobiWo/eth-duties). Visualizes upcoming block proposals, sync duties and attestations.

![Dashboard](/docs/app.png)

## Run app

Replace `ETH_DUTIES_API` by your eth-duties server and start the dashboard using Docker.

```bash
docker run \
-p 5001:5001 \
nilsfs7/eth-duties-dashboard:prod
```

The dashboard is available at [localhost:5001](http://localhost:5001/).

## Environment Variables

- ETH_DUTIES_API

  URL in cluding port to your eth-duties server.

- NEXT_PUBLIC_NETWORK

  The Ethereum network for the [beaconcha.in](https://beaconcha.in/) explorer. Possible values: `mainnet`, `hoodi`, `sepolia`

## Getting started for development

### Prerequisites

[node.js](https://nodejs.org/en) >= 24.13.0

[yarn](https://yarnpkg.com/)

[Docker](https://docs.docker.com/manuals/) Engine, Build & Compose

### Run app

Create environment

```bash
cp .env.example .env
```

Install dependencies

```bash
yarn install
```

Start app

```bash
yarn dev
```

### Run in Docker

Build image

```bash
docker build \
  --build-arg ETH_DUTIES=http://localhost:5000 \
  --build-arg NETWORK=mainnet \
  -f docker/Dockerfile \
  -t nilsfs7/eth-duties-dashboard:latest \
  .
```

Execute container

```bash
docker run \
--network host \
--rm \
-p 5001:5001 \
--name eth-duties-dashboard \
nilsfs7/eth-duties-dashboard:latest
```
