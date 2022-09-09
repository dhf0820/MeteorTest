USER ?= dhf0820
NS ?= dhf0820
TAG ?= latest
TEST = dhf0820
PROD = vertisoft
VERSION ?= $(TAG)
IMG_NAME ?= meteor_tests
DOCKER_NAME=$(IMG_NAME)

build:
        docker build -t $(TEST)/$(DOCKER_NAME):$(VERSION) -f Dockerfile.prod .

push:
        docker push $(NS)/$(IMG_NAME):$(VERSION)

docker:
        docker build -t $(TEST)/$(DOCKER_NAME):$(VERSION) -f Dockerfile.prod .
        docker push $(NS)/$(IMG_NAME):$(VERSION)