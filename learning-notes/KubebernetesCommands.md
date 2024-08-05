# What is Kubernetes?

Kubernetes is a container orchestration tool. It allows you to deploy multiple containers at once within "pods." You can then give each container an external IP and make a container monitoring service that will automatically restart your container if it crashes. 

## Kubectl Commands

### Deploying

Applies a config file to a Kube cluster, creating the requested objects as specifed by the config file. This is kinda like composing up with Docker Compose.
```sh
kubectl apply -f filename.yaml
```

Deletes all objects that were created by this config file. This is kinda like composing down with Docker Compose.
```sh
kubectl delete -f filename.yaml
```

### Getting info

These commands are great for checking the status of your cluster.
```sh
kubectl get ????
```
Replace `????` with `pods`, `deployments`, or `services` to get information about the respective resource. Checking services can help you identify IP addresses and port numbers.

### Context configuration

Shows which Kube cluster that you are currently connected to.
```sh
kubectl config current-context
```

Switch to another Kube cluster. Replace `context-name` with `docker-desktop` if you want to connect to your local Kube cluster.
```sh
kubectl config use-context context-name
```
