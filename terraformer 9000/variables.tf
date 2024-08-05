variable app_name {   # defines a variable, can be used across multiple terraform files
    # if no default value is set, then terraform will ask you for one when you run this code
}

variable location {
    default = "canadacentral" # terraform will not ask you for a value if you set a default
}

# variables easily allow us to change certain values that are common across on tf files

variable kuber_version {
  
} # at the time of writing, the most recent Kuber version on Azure is 1.30.3
# use this command to get the available versions of Kuber on the Azure data center of your choice (replace `canadacentral`):
# az aks get-versions --location canadacentral --output table

/*
Why don't we just hardcode the app_name and kuber_version? Are we stupid?

By making these names variables to-be-entered by the user, we can easily create multiple copies of
the infrastructure to test our microservices on different versions of Kuber or to separate our deployments
into dev and test. 

E.g. we can have an app called absolution_dev and absolution_prod 
E.g. when a newer version of Kuber comes out, we can create abosolution_1_31_1 and test our microservices
on the newer version of Kuber without forfeiting our older version. If things don't work out on the newer
version, we can simply delete the infrastructure and continue using our old cluster. 

*/