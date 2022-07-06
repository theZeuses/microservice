FROM node:14.15.4
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
COPY . /var/www/gateway
RUN npm install
CMD npm start