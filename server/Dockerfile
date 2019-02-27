FROM node:8.15.0
# Set the working directory to /server
WORKDIR /server
# copy package.json into the container at /server
COPY package.json /server/
# install dependencies
RUN npm install
# Run the app when the container launches
CMD ["node", "start.js"]