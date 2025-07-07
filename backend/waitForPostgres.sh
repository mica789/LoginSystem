#!/bin/sh

set -e

echo "Waiting for PostgreSQL to be available..."

until PGPASSWORD=$SPRING_DATASOURCE_PASSWORD psql -h $SPRING_DATASOURCE_HOST -U $SPRING_DATASOURCE_USERNAME -d $SPRING_DATASOURCE_DB -c '\q' > /dev/null 2>&1; do
  echo "Postgres is unavailable - waiting..."
  sleep 1
done

echo "Postgres is up - executing command"
exec "$@"
