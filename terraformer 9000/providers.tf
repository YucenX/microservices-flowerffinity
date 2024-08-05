# Initialises Terraform providers and sets their version numbers.
# make sure you run the following command every time before you run a new Terraform project:
# terraform init

terraform {
  required_providers {
    azurerm = {  # azurerm = Azure provider
      source  = "hashicorp/azurerm"
      version = "~> 3.114.0"  # fixes version of azurerm, remove this line and terraform will install the latest version of azurerm
    }
  }

  required_version = ">= 1.9.3"  # minimum version of Terraform that can be used
}

provider "azurerm" {    # config for Azure provider
  features {}   
}
