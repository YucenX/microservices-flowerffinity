#
# Creates a container registry on Azure so that you can publish your Docker images.
#
resource "azurerm_container_registry" "container_registry" {
  name                = var.app_name
  resource_group_name = azurerm_resource_group.absolution.name  # reference to our resource group
  location            = var.location
  admin_enabled       = true
  sku                 = "Basic"   # sku basic is the cheapest lol
}
# Terraform is smart and can manage dependancies for you, so Terraform will first make the
# resource group and then make the things inside the resource group. 

# these values will be printed to console: registry URL, username, password

/* 
output "registry_hostname" {  # delete the block comments to output
  value = azurerm_container_registry.container_registry.login_server
}

output "registry_un" {
  value = azurerm_container_registry.container_registry.admin_username
}

output "registry_pw" {
  value = azurerm_container_registry.container_registry.admin_password
  sensitive = true  # Terraform will refuse to run this code unless we add this line
}
*/

# the line about sensitivity reminds us that we shouldn't be printing passwords to console, in fact we shouldn't be printing
# passwords at all. Terraform will redact our password in the output and instead write `registry_pw = <sensitive>`. 
# If you want to see what the value of the password is, type this command in the console: 
#   terraform output -raw registry_pw

# Terraform will cover sensative information cuz typically Terraform is run in a pipelined environment where all of Terraform's output
# is recorded and possibly seen by many people who should not have access to this sensitive information. However, you can also find 
# the real value of sensitive variables in `terraform.tfstate`...right in front of you in plain-text. 

# solution: when not experimenting, just don't output sensitive values

# instead, use the Azure CLI???
# az acr show --name absolution --output table
# az acr credential show --name absolution --output table

/*
I will I had learned about block comments before I wrote that long paragraph using # comments LOL
*/
