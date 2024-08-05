# NodeJS and NPM

Here is a list of common commands used in this book when dealing with NodeJS.

## Setting up a project

Make a new NodeJS project with a "blank" `package.json`. The book says that a lot of the fields in `package.json` don't really matter because we aren't publishing our npm packages onto the npm website or something, so we use the `-y` tag to say "yes" to all the default field values. Otherwise, you will be prompted a bunch of times to enter a value for each field.
```sh
npm init -y
```

Install a NodeJS dependancy and update `package.json` for this NodeJS project only. I'm pretty sure that the `--save` flag is now the default so you probably don't need it for newer versions of npm.
```sh
npm install --save <package>
```
If you are like me, you probably won't install each package separately because every JS file in this book basically uses the same packages over and over again. I would just paste in this template into `package.json` and replace `NAME??` with the name of the directory where the npm project was initialized.
```JSON
{
  "name": "NAME??",
  "version": "1.0.0",
  "main": "./src/index.js",
  "scripts": {
    "start": "node ./src/index.js",
    "start:dev": "nodemon --legacy-watch ./src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.0.0-beta.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

Then, run this command to install all the neccessary dependancies to run a NodeJS project (based on `package.json`):
```sh
npm install
```

Install only the necessary dependancies for deployment (i.e. excludes dependancies that are only used during development, useful for deployment):
```sh
npm install --omit=dev
```

## Running a project

Runs a *single* NodeJS script file
```sh
node <script>.js
```

Runs the "main" script file of the NodeJS project (**deployment**):
```sh
npm start
```

Runs the "main" script file of the NodeJS project (**development**):
```sh
npm run start:dev
```
