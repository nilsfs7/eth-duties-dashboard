# Build stage
FROM node:26.13.1-trixie-slim AS build

## Declare build arguments
ARG ETH_DUTIES=http://localhost:5000
ARG NETWORK=mainnet

## Declare environment variables
ENV ETH_DUTIES_API=$ETH_DUTIES
ENV NEXT_PUBLIC_NETWORK=$NETWORK

## Create app directory
WORKDIR /app

## Bundle app source
COPY . .

## Install app dependencies
RUN npm ci --legacy-peer-deps

## Build app
RUN npm run build



# Run stage
FROM node:26.13.1-trixie-slim


## Switch to less privileged user
USER node

## Create app directory
WORKDIR /app

## Copy app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.mjs ./next.config.mjs

## Expose port
EXPOSE 5001

## Execute app
CMD ["npm", "start"]
