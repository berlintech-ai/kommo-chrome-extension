#!/bin/bash

# Bump patch version
npm version patch

# Extract version from package.json
VERSION=$(jq -r .version package.json)

# Archive ./dist folder
zip -r "dist-$VERSION.zip" ./dist