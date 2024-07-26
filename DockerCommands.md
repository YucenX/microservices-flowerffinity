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


