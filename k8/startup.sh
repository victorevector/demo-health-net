#!/bin/bash

echo "Start minikube"
minikube start --vm-driver=hyperkit

echo "Build images in virtual machine (minikube)"
eval $(minikube docker-env)
echo "Build mockehr"
docker build -t mockehr ../mock-ehr/
echo "Build mirth"
docker build -t mirth ../mock-mirth/
echo "Build mocklab"
docker build -t mocklab ../mock-lab/

echo "Create kubernetes cluster"
echo "Create mock-ehr deployment & service"
kubectl create -f ./mock-ehr-app.yaml
echo "Create mock-mirth deployment & service"
kubectl create -f ./mock-mirth-app.yaml
echo "Create mock-lab deployment & service"
kubectl create -f ./mock-lab-app.yaml