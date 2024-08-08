#
# Deploys the Node.js microservice to Kubernetes.
#
# Assumes the image has already been built and published to the container registry.
#
# Environment variables:
#
#   CONTAINER_REGISTRY - The hostname of your container registry.
#   VERSION - The version number of the image to deploy.
#
# Usage:
#
#   ./cd_pipeline/deploy-image.sh
#

set -u # or set -o nounset
: "$CONTAINER_REGISTRY"
: "$VERSION"

# use envsubst to replace all env variables with their values
# then pipe the output to kubectl. the - after the -f tells
# kubeclt to read its "config file" from stdin 
envsubst < ./cd_pipeline/deploy-cd.yaml | kubectl apply -f -

# note for windows wsl users: your Kube config in WSL is different from 
# the Kube config in your Windows filesystem! so if you try to compute
# the base 64 hash of ~/.../kubeconfig, you'll actually be hashing
# the Linux config instead of the Windows one, which might not be the same file!
