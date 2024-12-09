#!/bin/bash

# Initial delay before starting checks
echo "Initial delay before checking MySQL..."
sleep 10

# Wait for MySQL to be available and the database to be fully initialized
until mysql -h 192.168.100.10 -uopenmrs -popenmrs -e "SHOW TABLES;" openmrs > /dev/null 2>&1; do
  echo "Waiting for MySQL to initialize..."
  sleep 10
done

echo "MySQL is initialized. Starting OpenMRS..."
echo "Starting tomcat..."
cd /opt/tomcat8/bin/
./startup.sh
