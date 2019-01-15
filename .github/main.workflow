workflow "build and deploy to gh-pages" {
  on = "push"
  resolves = ["deploy"]
}

action "deploy" {
  uses = "./action-deploy"
  secrets = ["GITHUB_TOKEN"]
}
