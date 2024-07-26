# Microservices Flowerffinity

This repo is dedicated to store most of the files that I create while learning from the ebook, *Bootstrapping Microservices (2nd edition) With Docker, Kubernetes, GitHub Actions, and Terraform* by **Ashley Davis**. I'm accessing this book through the Toronto Public Library via O'Reilly Learning.

Apparently I'm going to end up making a video-streaming service using microservices...? Sounds cool, and I will hopefully develop some experience with Docker and Kubernetes in the process. I will also be gaining experience with NodeJS and Javascript as a nice bonus, since I was planning on learning the two from a different book in the future. 

## Getting Started 

The files in this repo are likely going to end up like the files presented in the book, with some variable name changes here and there just to keep things interesting and personalized for myself.

This book has also provided a link to all of the completed code examples shown in the book, in case you would rather follow that: https://github.com/bootstrapping-microservices-2nd-edition

#### Important commands used in this book:

Install all the neccessary dependancies to run a NodeJS project (based on `package.json`):
```sh
npm install
```

Install only the necessary dependancies for deployment (i.e. excludes dependancies that are only used during development):
```sh
npm install --omit=dev
```

Runs the "main" script file of the NodeJS project (**deployment**):
```sh
npm start
```

Runs the "main" script file of the NodeJS project (**development**):
```sh
npm run start:dev
```
#### Other useful or frequently used commands:

Make a new NodeJS project
```sh
npm init -y
```

Install a NodeJS dependancy and update `package.json` for this NodeJS project only
```sh
npm install --save <package>
```

Runs a NodeJS script file
```sh
node <script>.js
```


### Prerequisites

Please install Node.js and get a copy of the book if you want to follow along. Looks like we'll also need a bunch of other tools later down the line, so I'll keep you updated if I don't forget lol.

