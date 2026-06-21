FROM busybox:musl

COPY . /var/www

EXPOSE 80

CMD ["httpd", "-f", "-v", "-p", "80", "-h", "/var/www"]
