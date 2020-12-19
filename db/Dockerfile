FROM stephenwike/flyway-base:1.0.0

USER root

COPY ./migrations /flyway/sql

RUN chmod 777 -R /scripts

USER flyway