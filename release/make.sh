#!/bin/bash
rm release/QUnitChainer.tar.gz
find . -name '*.bak' -exec rm {} \;
tar cvzf release/QUnitChainer.tar.gz README 0-control.html 0-monitor.html QUnitChainer.js qunitchainer.css replace.pl sample/ jquery/ json2/ qunit/ sinon/
