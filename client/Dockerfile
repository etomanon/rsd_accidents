FROM node:8.15.0
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY public /client/public
COPY src /client/src
COPY package*.json /client/
COPY .env /client/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
# COPY . /client/
# Make port 3000 available to the world outside this container
# EXPOSE 3000
# Run the app when the container launches
RUN npm run build
CMD ["npm", "start"]