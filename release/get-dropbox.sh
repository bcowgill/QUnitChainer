#!/bin/bash
# Grab files from dropbox to see if they need committing
FROM=/D/Dropbox/FT/backup/h/sandbox/online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war
if [ -f get-dropbox.sh ]; then
   echo Run this from the directory above the release directory
   exit 1
fi
tar xvzf $FROM/QUnitChainer.tgz
chmod -R +w .
perl -i.bak -pne "s{\s+? \n}{\n}xms; s{(\'nextTestPlan\': \s*) .+? (// \s* REPLACE)}{\$1\'../sample/q-test.html\', \$2}xms" spec/QUnitChainerSpec.js

pushd ../Qucumber
tar xvzf $FROM/Qucumber.tgz
chmod -R +w .
git status
popd

git status
