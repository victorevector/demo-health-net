# Dependencies 

1. [Minikube](https://kubernetes.io/docs/setup/minikube/)

# Set up 

1. Ensure that minikube uses the correct vm-drive. Edit `minikube start --vm-driver=hyperkit` in `startup.sh`. 

1. Execute `./startup.sh` to deploy the single-node cluster. 

1. Run the command `kubectl port-forward svc/mock-mirth-svc 8443:443` to access Mirth via `https://localhost:8443/webstart`.

1. Within the Mirth Admin (default username/password: admin/admin), import the channel configurations `mock-mirth/channels/LabOrderGroup.xml` within this repo and Deploy.