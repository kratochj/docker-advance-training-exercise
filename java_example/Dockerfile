FROM maven:3-jdk-8-alpine

LABEL MAINTAINER="jiri kratochvil"

WORKDIR /app
EXPOSE 8080
ADD settings.xml /usr/share/maven/ref/settings-docker.xml

ADD . .

RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package

CMD mvn -B -s /usr/share/maven/ref/settings-docker.xml spring-boot:run

