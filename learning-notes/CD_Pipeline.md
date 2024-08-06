# Automating the Deployment Process

## What is CI

CI stands for **Continuous Integration**. Whenever a developer pushes/merges their local code onto Github, Github Actions will run some tests to make sure that the new code still works like the old one. If all test cases pass, then the push/merge is marked as successful (whether or not the push/merge actually happens is a different story). If the tests fail, then the developer and their team will be notified. CI works as a sort of "automatic problem checker" that catches errors during development every time a commit is made.

## What is CD

CD stands for **Continuous Deployment**. CD is an extension of CI; not only are we running tests against the code that we commit, we're also deploying our updated code to production! This means that we can automatically see our new commits in production, assuming that we pass the tests during CI. 


Make sure that you mark your shell scripts as executable in the Git repo! Otherwise your workflow will end up with error code 126: permission denied.
```sh
git update-index --chmod=+x <path-to-the-script-file>
```
