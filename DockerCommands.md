# Useful Docker Commands

## Building

First, make sure that Docker Desktop is running.

Run this command to build a Docker image. Your command prompt should be in the same location as
where the `Dockerfile` is. You can also omit the `-t repo-name` part, but this is not recommended.
```sh
docker build -t repo-name .
```

Use this command to list out all the images that you have built.
```sh
docker images
```
You will be able to see things like the repository name, the tag, and the image id. 

You can also change/rename an image's repository and tag using the following command, especially if you didn't specify the tag during `docker build`.
```sh
docker tag image-id new-repo-name:new-tag
```
The `image-id` would correspond to the jumble of characters found under the `IMAGE ID` column when you previously ran `docker images`. You should also run `docker images` to ensure that the renaming has occured. Note that after renaming, you will end up with two tags for the same image id. To remove the old tag, run this command:
```sh
docker rmi old-repo:old-tag
```
Now run `docker images` again to verify that the old tag is now gone.

## Running on a Local Computer

For our project so far (i.e. chapter 3 example 1), the following command will suffice:
```sh
docker run -d -p 3000:3000 -e PORT=3000 image-id
```
Or this one:
```sh
docker run -d -p 3000:3000 -e PORT=3000 repo-name:tag-name
```
+ `-d` for *detached mode*. Logs produced by the container won't clog up the current cmd instance
+ `-p 3000:3000` maps the container's port 3000 to your computer's port 3000. Adjust these numbers if necessary
+ `-e PORT=3000` sets an environment variable in the container.
+ Lastly, we have to specify the image id from before. Alternatively, you can enter `repo-name:tag-name` instead of `image-id`.

*If your tag is named `latest`, then you can omit the `tag-name` and just write `repo-name` for short. Docker will automatically append `latest` if you don't specify a tag name.*

This will create a new *container* to host your docker image. Check that the container is running via this command:
```sh
docker container list --all
```
If things are correct, you should see your image's id under the `IMAGE` column. There should also be a number under the `PORTS` column based on which ports you specified earlier.

Keep track of the jumble of characters listed under the `CONTAINER ID` column for your image. *This value is not necessarily the same as the image id!*

Now you can check the logs of your container (i.e. the output of the NodeJS program) with this command:
```sh
docker logs container-id
```
This will allow you to check error messages and stuff like that.

To access a command shell inside your container, run this command:
```sh
docker exec -it container-id bash
```
You can now use any Linux command and navigate your way around your project. Exit the shell and return to your old shell by typing in `exit` in the container's shell. `Ctrl+C` will not work!

Stop the container's execution using this command:
```sh
docker stop container-id
```
You should still be able to see your container if you run `docker container list --all` like before, but the `STATUS` coloumn will be different and the `PORTS` coloumn will be empty.

Finally, you can delete your container with this command:
```sh
docker rm container-id
```

## GitHub Container registry

As I said in the README, I won't be using Azure just yet. Instead, I will be using Github Container registry. 
Get started with Github Container registry: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry 
You might also want to create a new personal access token for Docker logins: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

Login to Github using Docker and your personal access token:
```sh
docker login ghcr.io -u github-username --password personal-access-token
```
This is, of course, insecure as heck since you will be typing your TOKEN into cmd and anyone who is looking over your screen or cmd history can now see your token. But the book author said not to worry about this until Ch. 8 so let's just slide this under the carpet for now...

Now you have to do some tagging, just like the book says:
```sh
docker tag your-image:tag ghcr.io/your-github-username/your-repo:tag
```

And finally push your image to Github:
```sh
docker push ghcr.io/your-github-username/your-repo:tag
```

So for me, the commands would be
```sh
docker login ghcr.io -u YucenX --password personal-access-token
docker tag flowerffinity-vid-stream:latest  ghcr.io/yucenx/microservices-flowerffinity:latest
docker push ghcr.io/yucenx/microservices-flowerffinity:latest
```

**Note:** if your Github username contains captial letters, make sure you lowercase all of them in the docker commands or else you will get an error message.

To see your newly pushed image, go to the website `ghcr.io/your-github-username/your-repo:tag` (e.g. my link would be `ghcr.io/yucenx/microservices-flowerffinity:latest`). Your published image should be private by default, though you could probably change that. Additionally, you can link your repo with the image using some green buttons on your screen. I won't be going into more details though, it's up to you to figure it the rest if you want to explore further.

## Running from Remote

This command will delete untag all images with the specified image-id. The `--force` argument just ignores errors that warn you about mass deleting things.
```sh
docker rmi image-id --force
```

Run your image from a Container registry:
```sh
docker run -d -p 3000:3000 -e PORT=3000 registry-url/image-name:version
```
If you are using GitHub Container registry like me, then the registry URL and all that stuff will be the same as the ghcr.io link used to access your image on Github. So for me, I would have to run
```sh
docker run -d -p 3000:3000 -e PORT=3000 ghcr.io/yucenx/microservices-flowerffinity:latest
```
