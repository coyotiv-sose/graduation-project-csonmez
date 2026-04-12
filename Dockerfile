FROM node:alpine

WORKDIR /app

# Install nodemon only once before all the dependencies are resolved
RUN npm install -g nodemon

# Copying this over before npm install will prevent reinstall of all the
# dependencies everytime the container is started
ADD package.json package-lock.json ./

RUN npm install

# Copy over the bin folder for the app to run
ADD bin ./bin

# Use nodemone instead of npm start
CMD [ "nodemon" ]
