FROM node:14.15.4
RUN mkdir -p /var/www/message-service
WORKDIR /var/www/message-service
COPY . /var/www/message-service
RUN npm install
CMD npm run dev