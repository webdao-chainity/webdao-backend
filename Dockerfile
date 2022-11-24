FROM node:16-buster AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls /app/dist/

FROM node:16-buster as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["npm", "run", "start:prod"]
