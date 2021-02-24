FROM postgres:13.2-alpine
ADD ./init.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
