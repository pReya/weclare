workflow "build and deploy to gh-pages" {
  on = "push"
  resolves = ["deploy"]
}

action "build" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "build"
}

action "deploy" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "deploy"
  needs = ["build"]
}
