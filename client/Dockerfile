FROM node:8.15.0

WORKDIR /client
# copy package.json into the container at /client
COPY package.json /client/
# install dependencies
RUN npm install
# Run the app when the container launches
CMD ["node", "start.js"]