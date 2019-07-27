FROM node:12.7.0-alpine

COPY dist ./dist
COPY routes ./routes
COPY src ./src
COPY babel.config.js ./
COPY index.html ./
COPY index.js ./
COPY package*.json ./
COPY README.md ./
COPY server.js ./
COPY userlist.json ./
COPY webpack.config.js ./
RUN npm install

ENTRYPOINT npm start
EXPOSE 3000