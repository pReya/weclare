#!/bin/sh
echo "hello, world"
ls -la
git config user.name "Moritz Stueckler"
git config user.email "moritz.stueckler@gmail.com"
npm ci
npm run deploy
