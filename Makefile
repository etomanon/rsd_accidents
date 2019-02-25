psql:
	psql -p 54322 -U postgres --password --host=localhost
# http://localhost:3000/api/data/weekday/14/8946/5613
# rsync -avz --exclude ".git" --exclude client --exclude postgres --exclude server/node_modules --exclude server/db/data/data.zip --exclude server/db/data/spatial.dump ./ js@157.230.23.109:/home/js/app2
# pod rootem
# sql import
# pg_dump --username postgres -W --format plain --file /tmp/tables.sql -t accidents -t result_weekday -t result_weekend -t roads spatial
# psql -p 54322 -U postgres --password --host=localhost < tables.sql
