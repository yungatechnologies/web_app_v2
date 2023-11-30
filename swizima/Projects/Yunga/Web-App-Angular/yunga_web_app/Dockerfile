FROM nginx:1.21.6-alpine

COPY nginx.conf  /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY  /dist/yunga_web_app /usr/share/nginx/html

# Expose port 80
EXPOSE 80



# Stage 1: Compile and Build angular codebase

# # Use official node image as the base image
# FROM node:latest as build

# # Set the working directory
# WORKDIR /usr/local/app

# ENV NODE_OPTIONS=--openssl-legacy-provider

# # Add the source code to app
# COPY ./ /usr/local/app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build


# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/tela-schools-mgr /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80