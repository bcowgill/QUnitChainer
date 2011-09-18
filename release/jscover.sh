#!/bin/bash
# Instrument the code with jscoverage information

if [ -d ../QUnitChainer ]; then
   pushd ..
   rm -rf Covered
   echo Instrumenting QUnitChainer.js into Covered/ directory ...
   QUnitChainer/jscoverage/jscoverage --exclude=jscoverage --exclude=_test_failures --exclude=_test_passes \
      --exclude=qunit-test-plans --exclude=release --exclude=replace-test \
      --no-instrument=json2 --no-instrument=qunit --no-instrument=sample --no-instrument=sinon \
      --no-instrument=spec --no-instrument=jasmine --no-instrument=jquery \
      QUnitChainer/ Covered/
   echo QUnitChainer.js has been instrumented and is ready for coverage
   echo Use a proxy or web server with docroot `pwd`/Covered
   echo 'http://covered.ft.com/jscoverage.html?missing=true&frame=spec/SpecRunner.html'
   popd
else
   echo run this command from the QUnitChainer directory.
   echo i.e. release/jscover.sh
fi

