FROM busybox:musl

COPY src /var/www

EXPOSE 80

CMD ["httpd", "-f", "-v", "-p", "80", "-h", "/var/www"]
