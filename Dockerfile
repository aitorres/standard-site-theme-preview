FROM busybox:musl

COPY src /var/www

USER 1001

EXPOSE 3000

CMD ["httpd", "-f", "-v", "-p", "3000", "-h", "/var/www"]
