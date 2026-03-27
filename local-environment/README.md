# MZinga local-environment

## How-to

### Start a local instance

1. from the root folder
  - run `pnpm install`
  - run `pnpm run build:all` to create proper `dist` folders for all the packages
1. from the `local-environment` folder
  - run `cp .env.example .env`
  - run `docker compose up -d`. **NB** mongodb will be exposed on port 27018 to avoid any conflicts with other mongodb instance running on the default port
  - run `npm run dev`
