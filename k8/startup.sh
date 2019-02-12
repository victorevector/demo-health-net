#!/bin/bash

echo "[1] Start minikube"
minikube start --vm-driver=hyperkit

echo "[2] Build images in virtual machine (minikube)"
eval $(minikube docker-env)
echo "[2.1] Build mockehr"
docker build -t mockehr ../mock-ehr/
echo "[2.2] Build mirth"
docker build -t mirth ../mock-mirth/
echo "[2.3] Build mocklab"
docker build -t mocklab ../mock-lab/

echo "[3] Build kubernetes cluster"
kubectl create -f ./