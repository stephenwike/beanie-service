#!/usr/bin/env pwsh

# Build kubeconfig
kubectl config set-cluster $env:KUBERNETES_CLUSTER_NAME `
    --server=$env:KUBERNETES_SERVER
kubectl config set clusters.$env:KUBERNETES_CLUSTER_NAME.certificate-authority-data $env:KUBERNETES_CERTIFICATE
kubectl config set-credentials $env:KUBERNETES_CLUSTER_NAME
kubectl config set users.$env:KUBERNETES_CLUSTER_NAME.client-certificate-data $env:KUBERNETES_CLIENT_CERTIFICATE
kubectl config set users.$env:KUBERNETES_CLUSTER_NAME.client-key-data $env:KUBERNETES_CLIENT_KEY
kubectl config set-context $env:KUBERNETES_CLUSTER_NAME `
    --cluster=$env:KUBERNETES_CLUSTER_NAME `
    --user=$env:KUBERNETES_CLUSTER_NAME
kubectl config use-context $env:KUBERNETES_CLUSTER_NAME

# Remove Failed Jobs
kubectl delete jobs --all

# Reinstall helm
helm uninstall $env:HELM_CHART_NAME
helm install $env:HELM_CHART_NAME ./chart/ `
    --set persistence.password=$env:POSTGRES_PASSWORD
