# comment

#
# Creates a resource group for the video-streaming service in your Azure account.
#
resource "azurerm_resource_group" "absolution" {
  name     = var.app_name    # this is how you access variables, use var.<variable>
  location = var.location
}
# note: i already have a "flowerffinity" resource group in my account and Azure won't let me make another
#       "flowerffinity" resource group, so im calling this one "absolution" lol 
