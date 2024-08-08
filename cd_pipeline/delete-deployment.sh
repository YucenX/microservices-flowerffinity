#
# Destroys the Node.js microservice on Kubernetes.
#
# Environment variables:
#
#   CONTAINER_REGISTRY - The hostname of your container registry.
#   VERSION - The version number of the image to deploy.
#
# Usage:
#
#   ./cd_pipeline/delete-deployment.sh
#

set -u # or set -o nounset
: "$CONTAINER_REGISTRY"
: "$VERSION"

# use envsubst to replace all env variables with their values
# then pipe the output to kubectl. the - after the -f tells
# kubeclt to read its "config file" from stdin 
envsubst < ./cd_pipeline/deploy-cd.yaml | kubectl delete -f -

