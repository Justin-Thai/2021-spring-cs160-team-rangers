# **Project Rangers**

This is the repository of team rangers' project

## **How to start server**
### *Prerequisite installation:*
* For development:
    - Node.js
    - PostgreSQL
* For production:
    - Docker

### *Other requirements:*
`.env`, `pg.env`, `init.sql` files

### *Run server:*
Development:
```
cd server/
npm install
npm run start:dev
```
Production: (turn off local PostgreSQL server before running)
```
cd server/
docker-compose build
docker-compose up
```
