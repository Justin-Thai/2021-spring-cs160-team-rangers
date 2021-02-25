#!/usr/bin/env bash

# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt

echo "Starting API server"

npm start