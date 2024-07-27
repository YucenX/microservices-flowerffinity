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

## Chapter 3 Changes

Instead of creating a private container registry with Microsoft Azure like David does in his book, I decided to leverage Github Container Registry instead. Although Microsoft Azure provides a free 12-month subscription when you sign up for the first time, I didn't feel comfortable with handling the subscription's free credits. Maybe later down the road I will feel more comfortable with all this Docker stuff, and I will inevidably switch to Azure for Kubernetes deployment. However, for now I will be sticking to 100% free-to-play options with no foreseeable end-of-subscription deadline.

To set up a container registry with Github, I followed this link: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry. I think the documentation page is pretty self-explainatory, all I really need to do was set up a new personal access token (which I guess could be a little risky if the token gets leaked). Anyhow, the login process and so on is pretty analogous to what's in the book, just with different URLs and stuff; just follow the link above to publish a Docker Image and then return to the book. Ensure that you keep your token in an easy-to-remember place that is also super secure! More info can be found in `DockerCommands.md`
