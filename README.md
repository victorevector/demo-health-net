# Dependencies 

1. [Minikube](https://kubernetes.io/docs/setup/minikube/)

# Set up 

1. Go to `startup.sh` and find the following command: `minikube start --vm-driver=hyperkit`. Make sure it specifies the correct vm-driver. 

1. Run `./startup.sh`

1. Run the command `kubectl port-forward svc/mock-mirth-svc 8443:443` to access Mirth via `https://localhost:8443/webstart`.

1. Access the Mirth Admin: import group and deploy `mock-mirth/channels/LabOrderGroup.xml` 