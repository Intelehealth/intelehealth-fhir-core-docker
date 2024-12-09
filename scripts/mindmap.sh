#!/bin/bash

# Initial delay before starting checks
echo "Initial delay before checking MySQL..."
sleep 10

# Wait for MySQL to be available and the database to be fully initialized
until mysql -h 192.168.100.10 -uopenmrs -popenmrs -e "SHOW TABLES;" openmrs > /dev/null 2>&1; do
  echo "Waiting for MySQL to initialize..."
  sleep 10
done

# Create the 'mindmap_server' database if it doesn't exist
echo "Creating 'mindmap_server' database..."
mysql -h 192.168.100.10 -uroot -popenmrs -e "CREATE DATABASE IF NOT EXISTS mindmap_server;"

# Import SQL data into the 'mindmap_server' database
echo "Importing data into 'mindmap_server'..."
mysql -h 192.168.100.10 -uroot -popenmrs mindmap_server < /root/DB/mindmap_server.sql

echo "Database setup complete."
