# [QUnitChainer](https://github.com/bcowgill/QUnitChainer) - An Auto Runner for the QUnit JavaScript Unit Testing framework.

## Outline

* Auto-runner for QUnit Javascript test plans.
* TDD, BDD and Continuous Testing during development
* Useful for running tests on mobile devices.

## VERSION: 1.14.0 of qunit

## Quick Links

You can get the latest minimal release files from
[Minimal Bundle](https://github.com/bcowgill/QUnitChainer/blob/master/release/QUnitChainer.tar.gz?raw=true)

There is a video of it in action
[Video](http://screencast.com/t/OZMnMelG8K)

## Detailed Overview

QUnitChainer is a Javascript file with an HTML control page which allows you to
run any number of QUnit test plans one after the other and then get a summary
of which test plans pass and fail. The summary page allows you to click through
to the individual test plans to run them individually.

QUnit is a powerful, easy-to-use, JavaScript test suite. It's used by the jQuery
project to test its code and plugins but is capable of testing any generic
JavaScript code (and even capable of testing JavaScript code on the server-side).

QUnitChainer is especially useful for developing code with test-driven development
(TDD) or behavioural-driven development (BDD) and continuous testing.  The control
page has an auto-run checkbox which will cause the tests to run every 15 seconds.
You can have every supported browser open with the auto-run turned on and as you
add tests and change the code your test plans will be re-run. You can simply
Alt-Tab between browser windows to find a check or cross mark in the title bar and
see if your tests are still good.

It is also useful for testing on a mobile or tablet device.  In this case the tests
can continuously run while you upload your code and tests to a test site on the same
Wi-Fi network as your mobile or tablet. You don't have to navigate to each test
plan individually on the device.

## Requirements

QUnitChainer requires:

* at least jquery 1.6.1 to be included in your QUnit tests
* json2.js if you plan to run your tests in older versions of Internet Explorer (IE7 or less)

It includes a modified qunit.css file so the control page is distinguishable from the
usual qunit test pages.  However you can switch to the original style sheet if you
prefer.

## Files

* 0-control.html     - Control page for running test plans with QUnitChainer
* 0-monitor.html     - Monitor page for viewing test results on a Big Screen
* qunitchainer.css   - QUnit stylesheet for 0-control.html to distinguish from QUnit normal style
* QUnitChainer.js    - The QUnitChainer javascript library
* replace.pl         - Perl script which can inject necessary includes into a bunch
                       of pre-existing QUnit tests
* sample/*.html *.js - Example QUnit test plans chained together with QUnitChainer

## How to Use

### Customize Control Files

Place 0-control.html, 0-monitor.html, qunitchainer.css and QUnitChainer.js at the top of the
directory tree where you will be running QUnit test plans.

Edit 0-control.html and 0-monitor.html to refer to where you have placed the
jquery and json2 libraries.
You should also set the nextTestPlan value to the first test plan you need to run.

The code to change looks like this:

```html
<link rel="stylesheet" href="qunitchainer.css" type="text/css"/>
<script src="jquery-1.6.2.min.js"> </script>
<script src="QUnitChainer.js"></script>
<!--[if lt IE 8 ]> <script language="javascript" src="json2.js"></script> <![endif]-->
<script>
var Plan = {
   // Specify the first test plan to run.
   nextTestPlan: 'sample/q-test.html',
   // Specify that we are the control page so that QUnitChainer initialises itself accordingly
   bControl: true
};
</script>
```

### Customize Test Plans

Look at the .html files in the sample directory to see how to use QUnitChainer
with an existing QUnit test plan.

In essence though, you will need to:

Add a reference to jquery, json2 and QUnitChainer to your test plan and then
add a javasript block after the inclusion of QUnitChainer.

```html
<script type="text/javascript">
var Plan = {
  // Specify the test plan to run after this one
  nextTestPlan: 'q-test2.html',
  '-': '-'
};
QUnitChainer.init();
</script>
```

If you want to instrument a bunch of QUnit tests there is a replace.pl script
which you can modify and run using perl.

Each test plan should refer to the next test plan to run in the chain. The final
test plan can refer back to the 0-control.html page or can be left undefined.

### Using Control and Monitor Pages

When you run your test plan the QUnitChainer will record the results in HTML5
browser storage for use by the 0-control.html page.

Open the 0-control.html page in your browser (or all the ones you support)
Ensure the correct relative path to the first test plan is shown in the text box
and click the run tests button. Or click the auto run checkbox and wait 15 seconds.

You can use the pause check box to pause each test plan with an alert box before
proceeding to the next test plan.

You can add calls to window.log() to your test plans and the output from these
will appear in the console.log if you check the logging checkbox.

You can clear the test data with the clear tests button. You can clear the browser
storage with the clear storage button. The dump checkbox will show the contents
of browser storage on the control page. The alert checkbox will show alert
messages displaying the contents of storage at key points of the QUnitChainer
run cycle.

Normally only failing test plans will be displayed. Use the show passed checkbox
to display passing test plans as well.

Older operating systems will not display the unicode check mark or cross character.
Use the show FAIL in title checkbox to display PASS or FAIL in the title bar
instead.

QUnit supports test fixtures with the DIV id=qunit-fixture. DOM elements within
this div will be saved and restored before and after every test. The show
qunit-fixture checkbox will make this fixture visible as it is usually
'off screen.'

When auto run is turned on you should ensure your browser or proxy is set not
to cache pages. Then you can modify your javascript and when the tests are
auto run the tests will reflect your latest changes.

## Browsers tested:

The browsers that this has currently been tested with are:

* Google Chrome: Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1
* Internet Explorer 8: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30618; .NET4.0C)
* Firefox: Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.2.20) Gecko/20110803 Firefox/3.6.20 ( .NET CLR 3.5.30729; .NET4.0C)

## Acknowledgements

The Author of QUnitChainer extends acknowledgements to the authors of QUnit and
the Jasmine Javascript testing framework (which was used to unit test QUnitChainer)

* [jQuery](http://jquery.com/)
* [QUnit](http://docs.jquery.com/QUnit)
* [Jasmine](https://github.com/pivotal/jasmine/wiki)
* [JSON2](http://www.JSON.org/json2.js)
* [Sinon](http://sinonjs.org/)
* [jscoverage](http://siliconforks.com/jscoverage/)

## Contributors

Brent S.A. Cowgill

## Refs for this file

[GIT Markdown Reference](http://github.github.com/github-flavored-markdown/)
[Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)
[Markdown Console](http://github.github.com/github-flavored-markdown/preview.html)