# **Team Rangers Project README**

This is the repository of Team Rangers' project for CS 160. This README includes instructions and guidelines that will help the user get started with contributing to this project.

## **README Contents**
 * Getting Started (START HERE FIRST)
 * Getting Updated Code
 * Guidelines for Branching
 * Guidelines for Pull Requests
 * Development
 * Production
 * Selenium Testing
 * Postman Testing



## **Getting Started**
NOTE: Before moving on to the other sections of this README, be sure to carefully go through this section carefully. 

To be able to work on any part of this project, there are a few tasks to be done first.

### **Tools Needed to Get Started:**
 * Git
 * Node.js
 * PostgreSQL
 Make sure you have these tools installed on your computer. 

### How to clone this repo to your computer:
On the command line terminal:
1. Go to a location that you want the repository to be cloned to.
2. Clone the repo by using:
```
git clone https://github.com/Justin-Thai/2021-spring-cs160-team-rangers.git
```    
3. The Github repository for this project should now be cloned to your computer.

### **Requirements:**
`.env`, `pg.env`, `init.sql` files
These files are essential to be able to run the project. They can be obtained from: 
https://gist.github.com/tintheanh/7431ea5aaea8dcd28a411adf55d63882 

### How to setup the required files:
1. Go to the link above and click on the "Download ZIP" button.
2. Extract the ZIP file.
3. Go to the project folder on your computer.
4. Put the files to their designated locations:
    * `.env` goes in `/server`
    * `pg.env` goes in `/server`
    * `init.sql` goes in `/server/src/database`
5. Go to `.env` and on line 3, replace `your-password` with your PostgreSQL database master password.



## **Getting Updated Code**
This section will show users how to get the most updated code from the project repository.
### Steps:
On the command line terminal:
1. Go to the project folder that is stored on your computer.
2. Use `git branch` to see if you are on the desired branch that has outdated code. If not, you can switch to the desired branch by using:
```
git branch [name_of_branch]
```
3. Use `git pull` to fetch the most updated code for that branch.
4. Your local branch should now have the most updated code. 



## **Guidelines for Branching**
This section will show users how and when to create new branches.

### When to create a branch:
 * When implementing a new feature
 * When resolving major bugs/errors
 * When updating documentation

### How to create a new branch:
On the command line terminal:
1. Go to the project folder 
2. Make sure the master branch is up to date. 
3. Use `git checkout -b [name_of_new_branch]` to create the new branch and switch to it.
4. Use `git push origin [name_of_new_branch]` to push the branch to Github.
5. The new branch should now be on the project repository.



## **Guidelines for Pull Requests**
This section will show you how and when to create pull requests.

### When to create a pull request:
 * When a new feature is fully implemented and ready for review
 * When a bug/error is fixed and ready for review
 * When documentation is updated and ready for review

### How to create a pull request:
1. Make sure to push the new code to the branch you want to merge. 
2. On Github, go to "Pull Requests" and click on "New Pull Request."
3. For the "base" branch, choose the branch you want to merge to.
4. For the "compare" branch, choose the branch with the committed code.
5. Add a meaningful and concise title for the pull request.
6. For the description, use the template provided by the link below. This template will help you make sure you have thoroughly proofread and tested the new code. 
    Link to pull request template: https://gist.github.com/tintheanh/808c5998ff18559658a6210e0fcec015
7. Click "Create Pull Request" to open a new pull request for other to review. 



## **Development**
This section will show users how to set up the development environments for the application.

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
This section will show users how to create a Docker image for the application.

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
2. Check that selenium-server-standalone-x.y.z.jar (current version: 3.9.1, link: http://selenium-release.storage.googleapis.com/index.html?path=3.9/, at the time of writing) and chromedriver.exe are in the selenium/src/ directory.
3. Install Google Chrome Version 90 or later if it has not yet been installed.
4. Start server and client (see steps further above).
5. In console, execute the following commands:

On Windows:
```
cd selenium/src/
javac -cp ";selenium-server-standalone-3.9.1.jar" Driver.java
java -cp ";selenium-server-standalone-3.9.1.jar" Driver
```

On Linux/Mac:

In ``src/Driver.java``, change line 8

``System.setProperty("webdriver.chrome.driver", "chromedriver.exe");``

To

``System.setProperty("webdriver.chrome.driver", "chromedriver");``

Then run:

```
cd selenium/src/
javac -cp ":selenium-server-standalone-3.9.1.jar" Driver.java
java -cp ":selenium-server-standalone-3.9.1.jar" Driver
```

The test cases will run on a virtual Google Chrome browser controlled by Selenium automated test software.



## **Postman Testing**
### *Prerequisites:*
 * Newman (command-line collection runner for Postman) (https://www.npmjs.com/package/newman)

### How to run:
1. Install Newman if it has not yet been installed
``npm install -g newman``
2. Start server (see steps on how to start server from Development)
3. Open another command prompt console
4. Go to project directory and execute the following commands:
```
cd postman/
newman run postman_backendAPI_tests.json
```
Newman will run the test cases on the command prompt
