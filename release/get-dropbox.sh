#!/bin/bash
# Grab files from dropbox to see if they need committing
FROM=/D/Dropbox/FT/backup/h/sandbox/online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/qunit-chainer
cp -R $FROM/* .
rm -rf README.md \
  jasmine-standalone-1.1.0.rc1.zip \
  jquery-qunit-244c198.zip \
  package.json \
  qunit.tws \
  spec/SpecRunnerTemplate.html \
  spec/TemplateSpec.js \
  unused/
git status
