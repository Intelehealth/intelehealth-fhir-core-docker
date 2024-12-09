# Stage 1: Build Angular Frontend
FROM node:16 AS frontend-build

# Set working directory for the frontend
WORKDIR /app

# Copy frontend files to the container
COPY ./frontend /app

# Set npm global configuration and install dependencies
RUN npm install && \
    npm run build

#Stage 2: middleware setup
FROM maven:3.6-openjdk-8 AS middleware-build
WORKDIR /middleware

COPY ./middleware /middleware
RUN cd /middleware/EMR-Middleware && mvn clean package -Dmaven.test.skip=true

# Stage 2: OpenMRS Setup
FROM fahadkabir/ubuntu:jammy

# Install dependencies
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl git wget zip openjdk-8-jdk mysql-client

# Copy frontend build from the previous stage to OpenMRS webapps directory
COPY --from=frontend-build /app/dist/intelehealth-ui /opt/tomcat8/webapps/ROOT
COPY --from=middleware-build /middleware/EMR-Middleware/target/EMR-Middleware.war /opt/tomcat8/webapps/EMR-Middleware.war
# Copy OpenMRS setup files
COPY ./scripts/unzip.sh /root/
COPY ./files/apache-tomcat-8.5.100.zip /root/tomcat/
RUN /root/unzip.sh

COPY ./files/openmrs.war /opt/tomcat8/webapps/

RUN mkdir /root/.OpenMRS
COPY ./files/openmrs-runtime.properties /root/.OpenMRS/
COPY ./files/openmrs-runtime.properties /opt/tomcat8/bin/
COPY ./files/modules/ /root/.OpenMRS/modules/
COPY ./scripts/tomcatStart.sh /root/tomcatStart.sh
COPY ./scripts/mindmap.sh /root/mindmap.sh
COPY ./files/mindmap_server.sql /root/DB/mindmap_server.sql

# Set necessary permissions
RUN chmod -R 777 /root/.OpenMRS
RUN chmod -R 777 /opt/tomcat8
RUN chmod +x /root/tomcatStart.sh
RUN chmod -R 777 /root/mindmap.sh

# Expose OpenMRS port
EXPOSE 8080
