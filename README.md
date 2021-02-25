# **Project Rangers**

This is the repository of Team Rangers' project for CS 160

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
docker-compose build
docker-compose up
```
