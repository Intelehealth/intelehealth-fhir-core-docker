#!/bin/bash

# Initial delay before starting checks
echo "Initial delay before checking MySQL..."
sleep 10

# Wait for MySQL to be available and the database to be fully initialized
until mysql -h 192.168.100.10 -uopenmrs -popenmrs -e "SHOW TABLES;" openmrs > /dev/null 2>&1; do
  echo "Waiting for MySQL to initialize..."
  sleep 10
done

# Check if the 'mindmap_server' database exists
DB_EXISTS=$(mysql -h 192.168.100.10 -uroot -popenmrs -e "SHOW DATABASES LIKE 'mindmap_server';" | grep "mindmap_server" > /dev/null 2>&1 && echo "yes" || echo "no")

if [ "$DB_EXISTS" == "no" ]; then
  # Create the database
  echo "Creating 'mindmap_server' database..."
  mysql -h 192.168.100.10 -uroot -popenmrs -e "CREATE DATABASE mindmap_server;"

  # Import SQL data into the database
  echo "Importing data into 'mindmap_server'..."
  mysql -h 192.168.100.10 -uroot -popenmrs mindmap_server < /root/DB/mindmap_server.sql
else
  echo "Database 'mindmap_server' already exists. Skipping import."
fi

echo "Database setup complete."
