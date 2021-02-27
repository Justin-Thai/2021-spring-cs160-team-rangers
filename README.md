# **Project Rangers**

This is the repository of Team Rangers' project for CS 160

### **Requirements:**
`.env`, `pg.env`, `init.sql` files

## **Development**
### *Prerequisites:*
 * Node.js
 * PostgreSQL

### How to run
1. Start PostgreSQL locally
2. Start server (port 5000)
```
cd server/
npm install
npm run start:dev
```
3. Start client (port 3000)
```
cd client/
npm install
npm start
```

## **Production**
### *Prerequisites:*
 * Docker
### How to run
Turn off local PostgreSQL server before running
```
docker-compose build
docker-compose up
```
The app will run on http://localhost:80
