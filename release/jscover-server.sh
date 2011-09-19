#!/bin/bash

echo Starting jscoverage server.
echo 'Go to http://127.0.0.1:8080/jscoverage.html?missing=true&frame=spec/SpecRunner.html'
echo To run the tests and gather coverage.
echo Click the Store Tab and Store Response button to save the coverage to jscoverage-report/jscoverage.html
echo 'Then view the coverage results at http://sandbox.bsac.com/QUnitChainer/jscoverage-report/jscoverage.html'

jscoverage/jscoverage-server --verbose \
   --no-instrument=json2 --no-instrument=qunit --no-instrument=sample --no-instrument=sinon \
   --no-instrument=spec --no-instrument=jasmine --no-instrument=jquery \
   &

echo To terminate the jscoverage server use the command:
echo jscoverage/jscoverage-server --shutdown
