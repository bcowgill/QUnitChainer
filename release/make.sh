#!/bin/bash
rm release/QUnitChainer.tar.gz
find . -name '*.bak' -exec rm {} \;
mkdir dist/qunit
cp -r jquery/ json2/ sinon/ qunit/ dist
pushd dist/
cp qunit.css qunit/
tar cvzf ../release/QUnitChainer.tar.gz .
popd