FROM node:21.2.0 as base

# Install pnpm
RUN npm install -g pnpm
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY pnpm* ./
COPY .env.development.local .env

# Install dependencies
RUN pnpm install

# Copy the rest of the files
COPY . .


# Expose the port
EXPOSE 3000

RUN alias _p=pnpm

# Start the app
CMD ["pnpm", "dev"]


# production stage
FROM base as production
ENV NODE_ENV=production
RUN pnpm install --only=production
COPY .env.production .env

# build project
RUN pnpm build

CMD ["pnpm", "start"]