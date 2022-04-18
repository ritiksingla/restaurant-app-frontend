FROM nginx:alpine

LABEL author="Ritik Singla"

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./dist/restaurant .

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
