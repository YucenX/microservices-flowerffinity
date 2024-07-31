# How to Augment a Microservice with Live Reloading

This book, for some reason, religiously believes that being able to *instantaneously* reload your project when making miniscule changes to your code gives you the holy ability to make a good microservices application. Although I do agree with this standpoint (maybe not to the same religious extent), it is also a hassle to set up -- though, it will probably pay off in the long run. So, I've decided to shrink the ~10 paragraphs in chapter 5 explaining all this live reloading into a neat little guide.

## Step 1: Create a NodeJS project

Use the command `npm init -y` to create a new and empty NodeJS project. Chances are, you probably want a `package.json` that looks like this:
```json
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
In other words, your `package.json` will likely contain all the recommendations and conventions used in the book:
+ a `main` file under a `src` subfolder named `index.js`
+ scripts for `start` and `start:dev`
+ a dependency on Express and Nodemon (with the latter being necessary for live refreshes anyways)
+ Remember to replace `NAME??` with the name of the root folder (which should have been automatically done for you when you ran `npm init -y`)
+ As recommended by the book, if you are not using WSL2 or a VM, you might want to remove the `--legacy-watch` flag in `start:dev`

Now, you'll also need to install the dependencies onto your local dev computer with `npm install`. Ensure that after executing `npm install`, a folder named `node_modules` is created with two subfolders named `express` and `nodemon`, respectively. If you need any other dependancies, install them from the command line.

Finally, make an `index.js` that has a print statement somewhere in the file such that text will be logged to the console when the program is run. 

## Step 2: Dockerfiles 

For the next part, you might want to configure VSCode to associate any files of the form `Docker-*` to a Dockerfile (see `.vscode/settings.json` for more details). This will enable with syntax checks and highlights on these custom Dockerfiles, which can help you catch problems early on.

Make a file named `Dockerfile-dev` and add the following content:
```dockerfile
FROM node:20.14.0

WORKDIR /usr/src/app
COPY package*.json ./  

CMD npm install --prefer-offline && \
    npm run start:dev

```

Next, make a file named `Dockerfile-prod` and add the following content:
```dockerfile
FROM node:20.14.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY ./src ./src

CMD npm start
```

Congrats, you just made a Dockerfile for development and production, respectively. 

## Step 3: Docker Compose 

A typical Docker Compose YAML for a single microservice typically looks like this:
```yaml
NAME??:                    
    image: NAME??          
    build:                            
      context: ./NAME??      
      dockerfile: Dockerfile            
    container_name: NAME??  
    ports:                            
      # ... port mappings ...                       
    environment:                    
      # ... environment variables ...
    restart: "no"                    
```
Of course, with `NAME??` being typically replaced by the name of the root directory just like before. Additionally, the target Dockerfile's name might become something like `Dockerfile-prod` in future chapters, though I haven't seen this yet at the time of writing (still on chapter 5). Anyhow, you will want to copy this YAML to `docker-compose-dev.yml` and slightly modify it like this:
```yaml
NAME??:                    
    image: NAME??          
    build:                            
      context: ./NAME??      
      dockerfile: Dockerfile-dev  # NEW !!!            
    container_name: NAME??  
    volumes:   # NEW !!!
      - /tmp/NAME??/npm-cache:/root/.npm:z  # shares npm cache location
      - ./NAME??/src:/usr/src/app/src:z     # shares source code
    ports:                            
      # ... port mappings ...                       
    environment:                    
      # ... environment variables ...
    restart: "no"                    
```
All you need to do is to change the target Dockerfile's name to match the developer Dockerfile's name, and then you need to add the `volumes` section to share the code on your dev computer with the container. I think you know what `NAME??` stands for at this point. If there are any other folders that you need to share with the container, add them to the `volumes` list. The format is essentially `path-a:path-b:z`, where `path-a` is a path in your dev computer and `path-b` is a path in the container. This will make everything in `path-a` available in `path-b`.

## Step 4: Try it out!

Use this command to build using `docker compose up` with a custom YAML file:
```sh
docker compose -f docker-compose-dev.yml up --build
```
The `-f` flag allows you to specify a YAML to run. In the case above, we want to run the development YAML. To test that live reloading works, you can change the print statement from step 1 to output a different string, for example. You should see that Nodemon restarts the container for `NAME??` and prints out the string that you just modified. 

Did it work? If it didn't, maybe reread this guide or chapter 5.5 again, because we are surely going to design all of our future microservices with this behaviour in mind...
