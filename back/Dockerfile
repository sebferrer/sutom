FROM centos:centos7
LABEL   MAINTAINER="Seb Ferrer" \
        IMAGE_NAME="wordus"

ARG RPMS='nodejs'

WORKDIR /opt

RUN mkdir wordus &&\
    curl -sL https://rpm.nodesource.com/setup_10.x | bash - &&\
    rpm --rebuilddb &&\
    yum install -y --nogpgcheck ${RPMS} &&\
    yum -y clean all

WORKDIR /opt/wordus

COPY package.json .
COPY package-lock.json .
COPY src src

RUN chmod -R 755 /opt &&\
    npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]