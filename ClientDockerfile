FROM alpine:3.4

# File Author / Maintainer
LABEL authors="Vincent Tuwei <vintuwei@gmail.com>"

RUN apk --update add imagemagick

# Update & install required packages
RUN apk add --update nodejs bash git

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

# expose the port to outside world
CMD ["npm", "start"]

