Dockerized Express, PostgreSQL, React<br />

Database backup: https://drive.google.com/open?id=11V9n68ydQuUShqqtJ1QaF0FumyHPQicW <br />
Mbtiles zip: https://drive.google.com/open?id=1V1vayXZ8gGB76V_RWsrdvOnp6PO-RMI1 <br />
Mbtiles data location: `server/db/data/`<br />
To load database backup to Postgres (Docker container): `psql -p 54322 -U postgres --password --host=localhost < tables.sql`<br />
Set Postgres connection string in `server/.env` to connect to Postgres container (default postgres://postgres:postgres@postgres:5432/postgres)<br />
External volume for persistent Postgres data (Windows 10 bug): https://github.com/docker/for-win/issues/445#issuecomment-405185621
##### Start dev
Change NODE_ENV in .env to development and run `docker-compose up`
##### Start prod
Change NODE_ENV in .env to production and run `docker-compose up`