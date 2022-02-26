FROM centos:centos7
LABEL   MAINTAINER="Seb Ferrer" \
        IMAGE_NAME="sutom"

ARG RPMS='nodejs'

WORKDIR /opt

RUN mkdir sutom &&\
    curl -sL https://rpm.nodesource.com/setup_10.x | bash - &&\
    rpm --rebuilddb &&\
    yum install -y --nogpgcheck ${RPMS} &&\
    yum -y clean all

WORKDIR /opt/sutom

COPY package.json .
COPY package-lock.json .
COPY src src

RUN chmod -R 755 /opt &&\
    npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]