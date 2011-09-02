#!/bin/bash
DIFF="diff --ignore-space-change --report-identical-files"

# Test plan for replace.pl

cp replace-input.html replace-test.html

md5sum replace-test.html

echo " "
echo Testing invalid command line parameter
../replace.pl -error > output-error.txt
$DIFF output-error.txt base-error.txt

echo " "
echo Testing missing filename
../replace.pl -match > output-nofile.txt
$DIFF output-nofile.txt base-nofile.txt

echo " "
echo Testing -match should not modify the input file and only show matching lines
../replace.pl -match replace-test.html > output-match.txt
$DIFF output-match.txt base-match.txt
md5sum replace-test.html
$DIFF replace-test.html replace-input.html

echo " "
echo Testing -preview should not modify the input file and only show replaced or injected lines
../replace.pl -preview replace-test.html > output-preview.txt
$DIFF output-preview.txt base-preview.txt
md5sum replace-test.html
$DIFF replace-test.html replace-input.html

echo " "
echo Testing -replace should modify the input file and not show replaced or injected lines
../replace.pl replace-test.html > output-replace.txt
$DIFF output-replace.txt base-replace.txt
md5sum replace-test.html
$DIFF replace-test.html replace-base.html
