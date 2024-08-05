# Terraform Commands

Terraform is a tool for making infrastructure as code. We write code that will create and configure infrastructure in the cloud when the code is run. E.g. we can automatically create a Kuber cluster and a container registry on Azure, ready for us to deploy Docker images to.

Run this command before the other Terraform commands below. Run this command every time you want to use a new Terraform project that doesn't have a `.terraform` sub-directory, and run this command every time you update an existing Terraform project's `providers.tf` file.
```sh
terraform init
```

Run this command to view the proposed infrastructure changes in your Terraform files that can be reflected in the cloud.
```sh
terraform plan
```

Run this command to apply the proposed infrastructure changes in your Terraform files to the cloud. When you run this command, Terraform will show you a list of proposed changes, and you have to type `yes` to give Terraform the green light.
```sh
terraform apply
```

Run this command to destroy the cloud infrastructe that was created by Terraform. Similarly, Terraform will ask you to confirm the proposed changes.
```sh
terraform destroy
```

Don't like manually approving every `terraform` command? No problem, just add the `-auto-approve` flag to the `apply` or `destroy` command:
```sh
terraform apply  -auto-approve
terraform destroy -auto-approve
```
