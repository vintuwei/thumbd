FROM alpine:3.4

# File Author / Maintainer
LABEL authors="Vincent Tuwei <vintuwei@gmail.com>"

RUN apk --update add imagemagick

# Update & install required packages
RUN apk add --update nodejs bash git

# Install app dependencies
COPY package.json package.json
RUN npm install

# Copy app source
COPY . /

# Set work directory to /www
WORKDIR /

# expose the port to outside world
CMD ["npm", "start"]

