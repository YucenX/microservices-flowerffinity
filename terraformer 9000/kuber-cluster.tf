#
# Creates a managed Kubernetes cluster on Azure.
#
resource "azurerm_kubernetes_cluster" "cluster" {
    name                = var.app_name
    location            = var.location
    resource_group_name = azurerm_resource_group.absolution.name
    dns_prefix          = var.app_name
    kubernetes_version  = var.kuber_version     

    default_node_pool {         # configures nodes
        name            = "default"
        node_count      = 1
        vm_size         = "Standard_B2s"
    }

    #
    # Instead of creating a service principle have the system figure this out.
    #
    identity {
        type = "SystemAssigned" # something to do with Kuber authenticating with Azure
    }    
}


#
# Attaches the container registry to the cluster. We did this in Ch 6 using an Azure command. 
# See example here: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_registry#example-usage-attaching-a-container-registry-to-a-kubernetes-cluster
#
resource "azurerm_role_assignment" "role_assignment" {  # gives this cluster a role?
  principal_id                     = azurerm_kubernetes_cluster.cluster.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"  # gives this cluster permissions to pull images from container registry
  scope                            = azurerm_container_registry.container_registry.id
  skip_service_principal_aad_check = true
}

