# **Project Rangers**

This is the repository of Team Rangers' project for CS 160

### **Requirements:**
`.env`, `pg.env`, `init.sql` files

## **Development**
### *Prerequisites:*
 * Node.js
 * PostgreSQL

### How to run:
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
### How to run:
Turn off local PostgreSQL server before running
```
docker-compose build
docker-compose up
```
The app will run on http://localhost:80

## **Selenium Testing**
### *Prerequisites:*
 * Java JDK 10 or later (https://www.oracle.com/java/technologies/javase-downloads.html)
 * Selenium (http://selenium-release.storage.googleapis.com/index.html)
 * Google Chrome Version 90 or later (https://www.google.com/chrome/)
 * ChromeDriver (https://chromedriver.chromium.org/downloads)

### How to run:
1. Ensure that a version of Java has been installed and the JAVA_HOME and PATH system environment variables have been set properly. Check https://java.com/en/download/help/path.html for reference if necessary.
2. Check that selenium-server-standalone-x.y.z.jar (current version: 3.9.1 at the time of writing) and chromedriver.exe are in the selenium/src/ directory.
3. Install Google Chrome Version 90 or later if it has not yet been installed.
4. Start server and client (see steps further above).
5. In console, execute the following commands:
```
cd selenium/src/
javac -cp ";selenium-server-standalone-3.9.1.jar" Driver.java
java -cp ";selenium-server-standalone-3.9.1.jar" Driver
```

The test cases will run on a virtual Google Chrome browser controlled by Selenium automated test software.

## **Postman Testing**
### *Prerequisites:*
 * Newman (command-line collection runner for Postman) (https://www.npmjs.com/package/newman)

### How to run:
1. Install Newman if it has not yet been installed
2. Start server (see steps on how to start server from Development)
3. Open another command prompt console
4. Go to project directory and execute the following commands:
```
cd postman/
newman run postman_backendAPI_tests.json
```
Newman will run the test cases on the command prompt
