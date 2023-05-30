FROM node:bullseye-slim@sha256:c32b648533614f3328f5123f29480058fc857606b81fe2796844af1c424adb75
RUN apt-get update -y && apt-get install --no-install-recommends --no-install-suggests -y openssl \
&& apt-get install --no-install-recommends --no-install-suggests -y curl && apt-get install --no-install-recommends --no-install-suggests -y dumb-init \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json yarn.lock tsconfig.json tsconfig.build.json prisma ./
RUN yarn install
ENV NODE_ENV development
COPY . .
RUN yarn build

CMD ["yarn", "start:dev"]