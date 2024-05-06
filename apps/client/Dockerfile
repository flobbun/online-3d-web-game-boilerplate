FROM nginx:alpine

WORKDIR /app

COPY ./dist/apps/client /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]