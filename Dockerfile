# Multi Stage build
# https://blog.webbylab.com/minimal_size_docker_image_for_your_nodejs_app/

FROM node:10-slim as server_builder
WORKDIR /root/app/server

# install node modules
COPY ./package.json .
COPY ./package-lock.json .
RUN npm i --production

# install babel
RUN npm install --save-dev @babel/core @babel/cli

# Transpile all es6+ code in /src 
COPY . .
RUN ./node_modules/.bin/babel src --out-dir srcdist

# Compiling a Node.js module into a single file, together with all its dependencies, gcc-style.
RUN npm install -g @zeit/ncc
RUN ncc build srcdist/index.js -o dist

# Multi stage build for min size image
FROM node:10-slim
WORKDIR /root/app/server
COPY . .
RUN rm -rf src
COPY --from=server_builder /root/app/server/dist ./src

EXPOSE 9000
CMD ["npm", "start"]