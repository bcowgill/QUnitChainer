#!/bin/bash

echo Starting jscoverage server.
echo 'Go to http://127.0.0.1:8080/jscoverage.html?missing=true&frame=spec/SpecRunner.html'
echo To run the QUnitChainer tests and gather coverage.

echo Click the Store Tab and Store Response button to save the coverage to jscoverage-report/jscoverage.html
echo 'Then view the coverage results at http://sandbox.bsac.com/QUnitChainer/jscoverage-report/jscoverage.html?missing=true'

echo To use QUnitChainer to run some tests go to
echo 'http://127.0.0.1:8080/jscoverage.html?missing=true&frame=0-control.html'
echo When the test suite ends, QUnitChainer will automatically store coverage results
echo 'Go to http://sandbox.bsac.com/QUnitChainer/jscoverage-report/QUC/jscoverage.html?missing=true'

jscoverage/jscoverage-server --verbose \
   --no-instrument=json2 --no-instrument=qunit --no-instrument=sample --no-instrument=sinon \
   --no-instrument=spec --no-instrument=jasmine --no-instrument=jquery \
   &

echo To terminate the jscoverage server use the command:
echo jscoverage/jscoverage-server --shutdown
