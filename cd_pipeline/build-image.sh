#
# Builds a Docker image.
#
# Environment variables:
#
#   CONTAINER_REGISTRY - The hostname of your container registry.
#   VERSION - The version number to tag the images with.
#
# Usage:
#
#       ./cd_pipeline/build-image.sh
#

# this part checks for valid environment variables
set -u # or set -o nounset
: "$CONTAINER_REGISTRY"
: "$VERSION"

# builds the image on my local computer, tagged according to environment variables.
# probably requires that Docker Desktop is running in the background
docker build -t $CONTAINER_REGISTRY/video-streaming:$VERSION --file ./deltarune-video/Dockerfile-prod ./deltarune-video
