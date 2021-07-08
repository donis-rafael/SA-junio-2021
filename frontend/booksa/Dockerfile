FROM node:14.17 as node
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:latest
COPY --from=node /app/dist/booksa /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
