#!/bin/bash
# Grab files from dropbox to see if they need committing
FROM=/D/Dropbox/FT/backup/h/sandbox/online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war
if [ -f get-dropbox.sh ]; then
   echo Run this from the directory above the release directory
   exit 1
fi
tar xvzf $FROM/QUnitChainer.tgz
pushd ../Qucumber
tar xvzf $FROM/Qucumber.tgz
git status
popd
git status
