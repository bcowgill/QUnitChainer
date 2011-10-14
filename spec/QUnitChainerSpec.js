/*
   QUnitChainer BDD Test Specification with Jasmine

   https://github.com/pivotal/jasmine/wiki

   Jasmine value matcher functions:
   https://github.com/pivotal/jasmine/wiki/Matchers

   Setup/Teardown with before/after
   https://github.com/pivotal/jasmine/wiki/Before-and-After

   Mock objects using Spies
   https://github.com/pivotal/jasmine/wiki/Spies

   Asynchronous Tests
   https://github.com/pivotal/jasmine/wiki/Asynchronous-specs
 */

/*jslint browser: true, sloppy: true, white: false, nomen: true, plusplus: true, maxerr: 1000, indent: 3 */

/*globals QUnit, QUnitChainer, Test, afterEach, beforeEach, cmpHTML, console: true, describe, document,
  itShouldHaveCheckBox, testCheckBoxFalse, testCheckBoxTrue, expect, getKeys, getPosition, it,
  jasmine, jQuery, spyOn, window, waits, runs
*/

/*properties
    '-', CheckBoxLabel, CheckBoxes, ExpectDebugStorage, ExpectDumpStorage,
    ExpectEndAlertMessage, ExpectMatchAlertMessage, ExpectNoModuleName,
    ExpectTestModuleName, ExpectTestName, ExpectTestPlanTitle, ExpectUserAgent,
    KEY, NUM_INPUTS, NUM_PROPERTIES, NoTestRunsMessage, Properties, QUnit,
    TestRunStorageFail, TestRunStoragePass, Tests, VERSION, actual,
    addMatchers, 'after change', alert, andCallThrough, andReturn, argsForCall,
    attr, autoRunInterval, bAlertStorage, bAutoRun, bControl, bDumpStorage,
    bFollowChain, bHasHandlers, bIsControlPage, bIsFF, bIsIE, bLog, bPause,
    bShowFailTitle, bShowFixture, bShowPassed, begin, bindUIEvents,
    browserIsIE, callCount, cancelAutoRun, checkStorage, checked,
    cleanTestPlan, cleanUserAgent, clearAllStorage, clearProperties,
    clearTestResults, click, console, currentEnv_, debugStorage, done, failed,
    fewerSpecsIE, getAllStorage, getDefaultProperties, getProperties,
    getProperty, getTestResults, getURLProperties, handleAutoRun, header, host,
    href, html, in, init, initControlPage, initTests, injectControlPage,
    innerHTML, installQUnitHandlers, jqInjectAt, location, log, logIt,
    match, maybeAlertStorage, message, module, moduleDone, moduleIdx, moduleStart,
    myAlert, name, nextSpecId_, nextSuiteId_, nextTestPlan, not, passed, plan,
    protocol, qunitHTML, renderPage, reset, runtime, saveToStorage,
    setLocation, setProperty, showControlPage, showFixture, skey, skip,
    skipTODO, storage, storeProperties, storeTestResults, stringifyObj,
    testDone, testIdx, testPlan, testStart, tests, text, this, title,
    toBeDefined, toBeEqualAsHtml, toBeUndefined, toEqual, toHaveBeenCalled,
    toHaveBeenCalledWith, toMatch, total, totalSpecs, totalSuites,
    urlParamsTrue, userAgent, value, wipeQUnitOutput
*/

// You should test this in Firefox with firebug open and closed as window.console
// behaves differently in these cases.
if (!window.console) {
   window.console = {log: function () {}};
}

var Test = {
   'bLog': false,

   // Total number of describe() and it() blocks to test
   'totalSuites': 50,
   'totalSpecs': 203,
   'fewerSpecsIE': 9,
   'skipTODO':     true,
   'skip':         true,

   'VERSION':        '1.6 $Id$',
   'NUM_PROPERTIES': 9,
   'NUM_INPUTS':     12,
   'Properties':     ['bAutoRun', 'bAlertStorage', 'bFollowChain', 'bPause', 'bLog', 'bDumpStorage', 'bShowPassed', 'bShowFailTitle', 'bShowFixture'],
   'CheckBoxes':     ['bAutoRun', 'bAlertStorage', 'bPause', 'bLog', 'bDumpStorage', 'bShowPassed', 'bShowFailTitle', 'bShowFixture'],
   'CheckBoxLabel':  ['auto run', 'alert', 'pause', 'logging', 'dump', 'passed', 'FAIL in title', '#qunit-fixture'],
   'qunitHTML':      [
      '<h1 id="qunit-header"><a href="sample/q-test.html"> QUnit example</a> <label><input name="noglobals" type="checkbox">noglobals</label><label><input name="notrycatch" type="checkbox">notrycatch</label></h1>',
      '<h2 id="qunit-banner" class="qunit-fail"></h2>',
      '<div id="qunit-testrunner-toolbar"><input type="checkbox" id="qunit-filter-pass"><label for="qunit-filter-pass">Hide passed tests</label></div>',
      '<h2 id="qunit-userAgent">userAgent</h2>',
      '<p id="qunit-testresult" class="result">Tests completed in ? milliseconds.<br><span class="passed">?</span> tests of <span class="total">?</span> passed, <span class="failed">?</span> failed.</p>',
      '<ol id="qunit-tests"></ol>',
      '<div id="qunit-fixture">QUNIT FIXTURE</div>',
      ''
   ].join('\n'),

   'urlParamsTrue':  'url?bAutoRun&bAlertStorage&bFollowChain&bPause&bLog&bDumpStorage&bLogEvent&bTrace&bUnicodeTitle&autoRunInterval=60&bShowPassed&bShowFailTitle&bShowFixture',

   'TestRunStorageFail': '{"mozilla":{"http://localhost:8888/qunit-chainer/q-test3.html":{"plan":"http://localhost:8888/qunit-chainer/q-test3.html","userAgent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.9.2) Gecko/20100115 Firefox/3.6","header":"QUnit example - no tests","failed":0,"passed":0,"total":0,"log":{}}},"after change":{"http://localhost:8888/qunit-chainer/q-test4.html":{"plan":"http://localhost:8888/qunit-chainer/q-test4.html","userAgent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.9.2) Gecko/20100115 Firefox/3.6","header":"QUnit example - one passing test","failed":0,"passed":1,"total":1,"log":{}}}}',
   'TestRunStoragePass': '{"after change":{"http://localhost:8888/qunit-chainer/q-test4.html":{"plan": "http://localhost:8888/qunit-chainer/q-test4.html","userAgent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.9.2) Gecko/20100115 Firefox/3.6","header": "QUnit example - no tests","failed": 0,"passed": 1,"total": 1,"log":{}}}}',
   'NoTestRunsMessage':  "\nNo test runs are stored in sessionStorage[QUCTest] use the run tests button to run some test plans.\n",

   'ExpectDumpStorage':       '<hr> \n<b>sessionStorage[QUCTestSettings]</b><pre><br>{<br>   "bFollowChain": false,<br>   "bAutoRun": true,<br>   "bPause": true,<br>   "bLog": true,<br>   "bDumpStorage": true,<br>   "bAlertStorage": true,<br> "bShowPassed": true,<br> "bShowFailTitle": true,<br> "bShowFixture": true<br>}<br></pre><b>sessionStorage[QUCTestHistory]</b><pre><br>[<br> "test-plan.html"<br>]<br></pre><b>sessionStorage[QUCTest]</b><pre><br>{<br>   "mozilla": <br>{<br>   "http://localhost:8888/qunit-chainer/q-test3.html": <br>{<br>   "plan": "http://localhost:8888/qunit-chainer/q-test3.html",<br>   "userAgent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.9.2) Gecko/20100115 Firefox/3.6",<br>   "header": "QUnit example - no tests",<br>   "failed": 0,<br>   "passed": 0,<br>   "total": 0,<br>   "log": <br>{<br>   <br>}<br><br>}<br><br>}<br>,<br>   "after change": <br>{<br>   "http://localhost:8888/qunit-chainer/q-test4.html": <br>{<br>   "plan": "http://localhost:8888/qunit-chainer/q-test4.html",<br>   "userAgent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.9.2) Gecko/20100115 Firefox/3.6",<br>   "header": "QUnit example - one passing test",<br>   "failed": 0,<br>   "passed": 1,<br>   "total": 1,<br>   "log": <br>{<br>   <br>}<br><br>}<br><br>}<br><br>}<br></pre>',
   'ExpectDebugStorage':      'DEBUG\n' + window.location.protocol + '//' + window.location.host + '\nsessionStorage\nlength: 3\n 0: QUCTest: \n {"after change":{"http://local...\n 1: QUCTestHistory: {"history":["test-plan.html"]}\n 2: QUCTestSettings: \n {"bFollowChain":true,"bAutoRun...',

   'ExpectTestPlanTitle':     'QUnit Test Example',
   'ExpectUserAgent':         'userAgentMan',
   'ExpectTestModuleName':    'Failing Unit Test with setup and teardown code',
   'ExpectNoModuleName':      'Unknown Test Module, add a call to module() to this test plan',
   'ExpectTestName':          'Sample test fails',
   'ExpectMatchAlertMessage': 'Tests finished, chaining to next-test-plan.html\nfrom ',
   'ExpectEndAlertMessage':   'All test plans finished, showing results.',

   '-': '-'
};
if (QUnitChainer.browserIsIE()) {
   Test.totalSpecs -= Test.fewerSpecsIE;
}

var Plan = {};


beforeEach(function () {
   QUnitChainer.logIt(Test.bLog, 'beforeEach(to init) called');
   // Wipe the output div so the output is fresh each time
   jQuery('#test-dom-output').html('');

   // Prepare the QUnitChainer object to be empty
   QUnitChainer.myAlert = function () {};
   Plan = { 'storage': "sessionStorage", 'skey': "QUCTest"};
   QUnitChainer.init(Plan);
   QUnitChainer.clearProperties();
   QUnitChainer.clearTestResults();

   this.addMatchers({
      toBeEqualAsHtml: function (expected) { return cmpHTML(this.actual) === cmpHTML(expected); }
   });
});

afterEach(function () {
   QUnitChainer.logIt(Test.bLog, 'afterEach(to cancel interval timer) called');
   QUnitChainer.reset();
   QUnitChainer.cancelAutoRun();
});

describe("QUnitChainer.checkStorage() - test plan will not work unless browser version supports storage (this could fail if you load the page from disk or from localhost instead of from a hosted domain.)", function () {
   it("should support " + QUnitChainer.storage, function () {
      expect(QUnitChainer.checkStorage()).toEqual(true);
   });
});

describe("QUnitChainer.logIt() - calls window.console.log (not FF, not IE)", function () {
   var saveConsole;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to spy on logging) called');
      saveConsole = window.console;
      spyOn(window.console, 'log');
      QUnitChainer.bIsFF = false;
      QUnitChainer.bIsIE = false;
   });
   afterEach(function () {
      QUnitChainer.bIsFF = undefined;
      QUnitChainer.bIsIE = undefined;
      if (saveConsole) {
         window.console = saveConsole;
      }
      QUnitChainer.logIt(Test.bLog, 'afterEach(to spy on logging) called');
   });


   it("should call window.console.log", function () {
      QUnitChainer.logIt(true, { 'in': 'function', 'message': 'something to log' });
      expect(window.console.log).toHaveBeenCalled();
      expect(window.console.log.callCount).toEqual(2);
      expect(window.console.log.argsForCall[0]).toEqual(['function']);
      expect(window.console.log.argsForCall[1]).toEqual([{ 'in': 'function', 'message': 'something to log' }]);
   });
});

describe("QUnitChainer.logIt() - calls window.console.log (as IE)", function () {
   var saveConsole;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to spy on logging 2) called');
      saveConsole = window.console;
      spyOn(window.console, 'log');
      QUnitChainer.bIsFF = false;
      QUnitChainer.bIsIE = true;
   });
   afterEach(function () {
      QUnitChainer.bIsFF = undefined;
      QUnitChainer.bIsIE = undefined;
      if (saveConsole) {
         window.console = saveConsole;
      }
      QUnitChainer.logIt(Test.bLog, 'afterEach(to spy on logging 2) called');
   });


   it("should call window.console.log", function () {
      QUnitChainer.logIt(true, { 'in': 'function', 'message': 'something to log' });
      expect(window.console.log).toHaveBeenCalled();
      expect(window.console.log.callCount).toEqual(1);
      expect(window.console.log.argsForCall[0]).toEqual(['{"in":"function","message":"something to log"}']);
   });
});

describe("QUnitChainer.logIt() - calls window.console.log (as IE)", function () {
   var saveConsole;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to spy on logging 2) called');
      saveConsole = window.console;
      spyOn(window.console, 'log');
      QUnitChainer.bIsFF = false;
      QUnitChainer.bIsIE = true;
   });
   afterEach(function () {
      QUnitChainer.bIsFF = undefined;
      QUnitChainer.bIsIE = undefined;
      if (saveConsole) {
         window.console = saveConsole;
      }
      QUnitChainer.logIt(Test.bLog, 'afterEach(to spy on logging 2) called');
   });


   it("should call window.console.log", function () {
      QUnitChainer.logIt(true, { 'in': 'function', 'message': 'something to log' });
      expect(console.log).toHaveBeenCalled();
      expect(console.log.callCount).toEqual(1);
      expect(console.log.argsForCall[0]).toEqual(['{"in":"function","message":"something to log"}']);
   });
});

describe("QUnitChainer.getDefaultProperties() - default Properties are all false", function () {
   var idx, rProperties = null;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to get Properties) called');
      rProperties = QUnitChainer.getDefaultProperties();
   });

   it("should have only " + Test.NUM_PROPERTIES + " Properties values", function () {
      expect(getKeys(rProperties).length).toEqual(Test.NUM_PROPERTIES);
   });

   // Must put these tests inside a function to prevent a closure in the for loop below.
   function testPropertiesFalse(key) {
      it("should have " + key + " set to false", function () {
         expect(key + ' ' + rProperties[key]).toEqual(key + ' false');
      });
      it("should have initial Property of " + key + " set to false", function () {
         expect(key + ' ' + QUnitChainer.getProperty(key)).toEqual(key + ' false');
      });
   }

   for (idx = 0; idx < Test.Properties.length; ++idx) {
      testPropertiesFalse(Test.Properties[idx]);
   }
});

describe("QUnitChainer.stringify() - convert obj to JSON string", function () {
   it('should be defined', function () {
      expect(QUnitChainer.stringifyObj).toBeDefined();
   });

   it('should suround braces with line breaks', function () {
      var obj = {},
         expected = "<br/>{<br/>   <br/>}<br/>",
         result = QUnitChainer.stringifyObj(obj);

      expect(result).toEqual(expected);
   });

   it('should suround brackets with line breaks', function () {
      var obj = [],
         expected = "<br/>[<br/>   <br/>]<br/>",
         result = QUnitChainer.stringifyObj(obj);

      expect(result).toEqual(expected);
   });

   it('should line break after commas', function () {
      var obj = [1, 2],
         expected = "<br/>[<br/>   1,<br/>   2<br/>]<br/>",
         result = QUnitChainer.stringifyObj(obj);

      expect(result).toEqual(expected);
   });

   it('should space out colons', function () {
      var obj = {'this': 'that'},
         expected = '<br/>{<br/>   "this": "that"<br/>}<br/>',
         result = QUnitChainer.stringifyObj(obj);

      expect(result).toEqual(expected);
   });
});

describe("QUnitChainer.cleanURL() - clean the URL", function () {
   it('should remove after the question mark', function () {
      expect(QUnitChainer.cleanURL('http://w.f.c?this')).toEqual('http://w.f.c');
   });
   it('should remove multiple forward slashes', function () {
      expect(QUnitChainer.cleanURL('//w.f.c///what/is?this')).toEqual('/w.f.c/what/is');
   });
   it('should not remove the double slash in http', function () {
      expect(QUnitChainer.cleanURL('http://w.f.c///what/is?this')).toEqual('http://w.f.c/what/is');
   });
   it('should not remove the double slash in https', function () {
      expect(QUnitChainer.cleanURL('https://w.f.c///what/is?this')).toEqual('https://w.f.c/what/is');
   });
});

// TODO implement url parameter setting?
describe("QUnitChainer.getURLProperties() - properties can be set from the URL", function () {
   var idx, rProperties = null;

   if (Test.skip) {
      return;
   }

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to get Properties from URL) called');
      rProperties = QUnitChainer.getURLProperties("bPause");
   });

   it("should have only " + Test.NUM_PROPERTIES + " Properties values", function () {
      expect(getKeys(rProperties).length).toEqual(Test.NUM_PROPERTIES);
   });

   // Must put these tests inside a function to prevent a closure in the for loop below.
   function testPropertiesTrue(key) {
      it("should have " + key + " set to true", function () {
         expect(key + ' ' + rProperties[key]).toEqual(key + ' true');
      });
   }

   for (idx = 0; idx < Test.Properties.length; ++idx) {
      testPropertiesTrue(Test.Properties[idx]);
   }
});

describe("QUnitChainer.clearAllStorage - storage is clear", function () {
   var rAllStorage;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to save storage) called');

      rAllStorage = QUnitChainer.getAllStorage();
      QUnitChainer.clearAllStorage();
   });
   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore storage) called');
      QUnitChainer.clearAllStorage();
      QUnitChainer.saveToStorage(rAllStorage);
   });

   it("should have nothing in storage", function () {
      var rStorage = QUnitChainer.getAllStorage();
      expect(rStorage).toEqual({});
   });
});

describe("QUnitChainer.getAllStorage/saveToStorage - storage can be saved and set", function () {
   var rAllStorage;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to save storage 2) called');

      rAllStorage = QUnitChainer.getAllStorage();
      QUnitChainer.clearAllStorage();
      QUnitChainer.saveToStorage({ 'KEY': 'SAVETOSTORAGE' });
   });
   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore storage 2) called');
      QUnitChainer.clearAllStorage();
      QUnitChainer.saveToStorage(rAllStorage);
   });

   it("should have KEY: SAVETOSTORAGE in storage", function () {
      var rStorage = QUnitChainer.getAllStorage();
      expect(rStorage).toEqual({ 'KEY': 'SAVETOSTORAGE' });
   });
});

describe("QUnitChainer.setProperty/getProperty/storeProperties/getProperties - storage Properties can be set true", function () {
   var idx, rProperties = null;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set Properties) called');

      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], true);
      }
      QUnitChainer.storeProperties();
      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], false);
      }
      rProperties = QUnitChainer.getProperties();
   });

   it("should have only " + Test.NUM_PROPERTIES + " Properties values", function () {
      expect(getKeys(rProperties).length).toEqual(Test.NUM_PROPERTIES);
   });

   // Must put these tests inside a function to prevent a closure in the for loop below.
   function testPropertiesTrue(key) {
      it("should have " + key + " set to true", function () {
         expect(key + ' ' + rProperties[key]).toEqual(key + ' true');
      });
   }

   for (idx = 0; idx < Test.Properties.length; idx += Test.Properties.length) {
      testPropertiesTrue(Test.Properties[idx]);
   }
});

describe("QUnitChainer.clearHistory/setHistory/getHistory - history list can be saved and manipulated", function () {
   var rAllStorage;
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to save storage) called');

      rAllStorage = QUnitChainer.getAllStorage();
      QUnitChainer.clearHistory();
      QUnitChainer.History = [];
   });
   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore storage) called');
      QUnitChainer.clearAllStorage();
      QUnitChainer.saveToStorage(rAllStorage);
   });

   it("should have nothing in test plan history", function () {
      var raHistory = QUnitChainer.getHistory();
      expect(raHistory).toEqual([]);
   });

   it("should store things to history", function () {
      var raHistory;
      QUnitChainer.storeHistory(['z', 'a', 'b', 'c']);
      raHistory = QUnitChainer.getHistory();
      expect(raHistory).toEqual(['z', 'a', 'b', 'c']);
   });

   it("should keep history sorted and unique", function () {
      var raHistory;
      QUnitChainer.addHistory('z');
      QUnitChainer.addHistory('b');
      QUnitChainer.addHistory('c');
      QUnitChainer.addHistory('a');
      QUnitChainer.storeHistory();
      raHistory = QUnitChainer.getHistory();
      expect(raHistory).toEqual(['a', 'b', 'c', 'z']);
   });
});

describe("QUnitChainer.getLocation() - getting document location strips random number", function () {
   it('should remove ?random=', function () {
      expect(QUnitChainer.getLocation('http://www.ft.com?random=9812749754')).toEqual('http://www.ft.com');
      expect(QUnitChainer.getLocation('http://www.ft.com?random=9812749754&something=what')).toEqual('http://www.ft.com?something=what');
   });
   it('should remove &random=', function () {
      expect(QUnitChainer.getLocation('http://www.ft.com?something=what&random=9812749754')).toEqual('http://www.ft.com?something=what');
      expect(QUnitChainer.getLocation('http://www.ft.com?this=that&random=9812749754&something=what')).toEqual('http://www.ft.com?this=that&something=what');
   });
});

describe("QUnitChainer.addRandomParam() - setting document location adds a random number", function () {
   it('should add ?random=', function () {
      expect(QUnitChainer.addRandomParam('http://www.ft.com')).toMatch(/^http:\/\/www\.ft\.com\?random=\d+$/);
      expect(QUnitChainer.addRandomParam('http://www.ft.com?random=98374982')).toMatch(/^http:\/\/www\.ft\.com\?random=\d+$/);
      expect(QUnitChainer.addRandomParam('http://www.ft.com?random=98374982')).not.toEqual('http:\/\/www.ft.com?random=98374982');
   });
   it('should add &random=', function () {
      expect(QUnitChainer.addRandomParam('http://www.ft.com?something=what')).toMatch(/^http:\/\/www\.ft\.com\?something=what\&random=\d+$/);
      expect(QUnitChainer.addRandomParam('http://www.ft.com?random=98374982&this=that')).toMatch(/^http:\/\/www\.ft\.com\?this=that\&random=\d+$/);
      expect(QUnitChainer.addRandomParam('http://www.ft.com?this=that&random=9812749754&something=what')).toMatch(/^http:\/\/www\.ft\.com\?this=that\&something=what\&random=\d+$/);
   });
});

describe("QUnitChainer.injectControlPage() Control Page - inject into document", function () {
   it('should default to non-control page mode', function () {
      expect(QUnitChainer.bIsControlPage).toEqual(false);
   });
});

describe("QUnitChainer.injectControlPage() Control Page - inject into document", function () {
   beforeEach(function () {
      QUnitChainer.injectControlPage('#test-dom-output');
   });

   it('should have a h1#qunit-header on the page', function () {
      expect(jQuery('h1#qunit-header').length).toEqual(1);
   });

   it('should have a h2#qunit-banner on the page', function () {
      expect(jQuery('h2#qunit-banner').length).toEqual(1);
   });

   it('should have a div#qunit-testrunner-toolbar on the page', function () {
      expect(jQuery('div#qunit-testrunner-toolbar').length).toEqual(1);
   });

   it('should have a h2#qunit-userAgent on the page', function () {
      expect(jQuery('h2#qunit-userAgent').length).toEqual(1);
   });

   it('should have a ol#qunit-tests on the page', function () {
      expect(jQuery('ol#qunit-tests').length).toEqual(1);
   });

   it('should have a div#qunitchainer-dump on the page', function () {
      expect(jQuery('div#qunitchainer-dump').length).toEqual(1);
   });

   it('should have a div#qunit-fixture on the page', function () {
      expect(jQuery('div#qunit-fixture').length).toEqual(1);
      expect(jQuery('div#qunit-fixture').html()).toEqual('If you can see this then the #qunit-fixture DIV in your test plans will be visible.');
   });

});

describe("QUnitChainer.showControlPage() Control Page - show control page", function () {
   var idx, title = 'nothing';
   beforeEach(function () {
      title = document.title;
      QUnitChainer.showControlPage('#test-dom-output');
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 1) called');
      document.title = title;
   });

   it('should have a document title of "\u2716 0 - QUnitChainer Control Page"', function () {
      expect(jQuery('title').html()).toEqual("\u2716 0 - QUnitChainer Control Page");
   });

   it('should have a header of "QUnitChainer Control Page"', function () {
      expect(jQuery('#qunit-header').text()).toEqual("QUnitChainer Control Page");
   });

   it('should have some form inputs', function () {
      expect(jQuery('#test-dom-output input').length).toEqual(Test.NUM_INPUTS);
   });

   it('should have a text input field for the test plan to run', function () {
      expect(jQuery('input#testPlan[type="text"][name="testPlan"][id="testPlan"][size="40"]').length).toEqual(1);
   });

   it('should have a run tests button on the page', function () {
      expect(jQuery('input[type="button"][name="runTests"][id="runTests"][value="run tests"]').length).toEqual(1);
   });

   it('should have a clear tests button on the page', function () {
      expect(jQuery('input[type="button"][name="clearTests"][id="clearTests"][value="clear tests"]').length).toEqual(1);
   });

   it('should have a clear storage button on the page', function () {
      expect(jQuery('input[type="button"][name="clearStorage"][id="clearStorage"][value="clear storage"]').length).toEqual(1);
   });

   for (idx = 0; idx < Test.CheckBoxes.length; ++idx) {
      itShouldHaveCheckBox(Test.CheckBoxLabel[idx], Test.CheckBoxes[idx]);
   }

   it('should show the auto refresh period', function () {
      expect(jQuery('#autoRunInterval').text()).toEqual("15 sec");
   });

   it('should have a message showing no tests plans are in storage', function () {
      expect(jQuery('#qunit-tests').text()).toBeEqualAsHtml(Test.NoTestRunsMessage);
   });

   it('should have a header of "QUnitChainer Control Page"', function () {
      expect(jQuery('#qunit-header').text()).toEqual("QUnitChainer Control Page");
   });

});

describe("QUnitChainer.showControlPage() Control Page - checkbox state defaults unchecked", function () {
   var idx, title = 'nothing';

   beforeEach(function () {
      title = document.title;
      QUnitChainer.showControlPage('#test-dom-output');
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 2) called');
      document.title = title;
   });

   for (idx = 0; idx < Test.CheckBoxes.length; ++idx) {
      testCheckBoxFalse(Test.CheckBoxes[idx]);
   }
});

describe("QUnitChainer.updateControlFields() Control Page - checkbox state defaults true, text field updated", function () {
   var idx, title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set checkbox properties) called');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan.html",
         'storage': "sessionStorage",
         'skey': "QUCTest"
      };
      QUnitChainer.init(Plan);
      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], true);
      }
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');
      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 1) called');
      document.title = title;
      Plan = {};
   });

   it("should have text field testPlan set to next-test-plan.html", function () {
      expect('testPlan ' + jQuery('input[type="text"][name="testPlan"]')[0].value).toEqual('testPlan next-test-plan.html');
   });

   for (idx = 0; idx < Test.CheckBoxes.length; ++idx) {
      testCheckBoxTrue(Test.CheckBoxes[idx]);
   }

   it("should have bFollowChain cleared in storage", function () {
      expect(rStorage.bFollowChain).toEqual(false);
   });
});

describe("QUnitChainer.debugStorage() - Provide debugging info about storage", function () {
   var idx, rAllStorage;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set properties and test summary storage for storage debugging) called');
      rAllStorage = QUnitChainer.getAllStorage();
      QUnitChainer.clearAllStorage();
      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], true);
      }
      QUnitChainer.storeProperties();
      QUnitChainer.storeHistory(['test-plan.html']);
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));
   });
   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore storage) called');
      QUnitChainer.clearAllStorage();
      QUnitChainer.saveToStorage(rAllStorage);
   });

   it("should have storage formatted in a debug string", function () {
      expect(QUnitChainer.debugStorage('DEBUG', 30)).toBeEqualAsHtml(Test.ExpectDebugStorage);
   });
});

describe("QUnitChainer.showStorage() Control Page - Properties and Test Summary Storage dumped when flag set", function () {
   var idx, title = 'nothing';

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set properties and test summary storage for storage dump) called');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan2.html",
         'storage': "sessionStorage",
         'skey': "QUCTest"
      };
      QUnitChainer.init(Plan);
      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], true);
      }
      QUnitChainer.storeProperties();
      QUnitChainer.storeHistory(['test-plan.html']);
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStorageFail));
      QUnitChainer.showControlPage('#test-dom-output');
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 2) called');
      document.title = title;
      Plan = {};
   });

   it("should have Properties displayed in storage dump area", function () {
      expect(jQuery('#qunitchainer-dump').html()).toBeEqualAsHtml(Test.ExpectDumpStorage);
   });
});

describe("QUnitChainer.showTestSummary() Control Page - Banner class set for Success and passing tests hidden", function () {
   var title = 'nothing';

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set test storage to test for success banner');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan3.html",
         'storage': "sessionStorage",
         'skey': "QUCTest"
      };
      QUnitChainer.init(Plan);
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));
      QUnitChainer.showControlPage('#test-dom-output');
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 3) called');
      document.title = title;
      Plan = {};
   });

   it('should have a document title of "\u2714 1 - QUnitChainer Control Page"', function () {
      expect(jQuery('title').html()).toEqual("\u2714 1 - QUnitChainer Control Page");
   });

   it('should have a test result of "0 failing test plan, 1 passing test plan"', function () {
      expect(jQuery('#qunit-testresult.result').html()).toEqual("0 failing test plan, 1 passing test plan");
   });

   it("should have the success class added to the banner line", function () {
      expect(jQuery('#qunit-banner').attr('class')).toEqual('qunit-pass');
   });

   it("should have the hidepass class added to the #qunit-tests div", function () {
      expect(jQuery('#qunit-tests').attr('class')).toEqual('hidepass');

   });
});

describe("QUnitChainer.showTestSummary() Control Page - Test Summary rendered, passing tests not hidden and banner class set for Failure", function () {
   var idx, title = 'nothing';

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set properties and test summary storage for test summary) called');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan4.html",
         'storage': "sessionStorage",
         'skey': "QUCTest"
      };
      QUnitChainer.init(Plan);
      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], true);
      }
      QUnitChainer.setProperty('bDumpStorage', false);
      QUnitChainer.storeProperties();
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStorageFail));
      QUnitChainer.showControlPage('#test-dom-output');
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 4) called');
      document.title = title;
      Plan = {};
   });

   it('should have a document title of "FAIL 1 - QUnitChainer Control Page"', function () {
      expect(jQuery('title').html()).toEqual("FAIL 1 - QUnitChainer Control Page");
   });

   it('should have a test result of "1 failing test plan, 1 passing test plan"', function () {
      expect(jQuery('#qunit-testresult.result').html()).toEqual("1 failing test plan, 1 passing test plan");
//      <p id="qunit-testresult" class="result">Tests completed in 53 milliseconds.<br><span class="passed">0</span> tests of <span class="total">0</span> passed, <span class="failed">0</span> failed.</p>
   });

   it("should have the failure class added to the banner line", function () {
      expect(jQuery('#qunit-banner').attr('class')).toEqual('qunit-fail');
   });

   it("should NOT have the hidepass class added to the #qunit-tests div", function () {
      expect(jQuery('#qunit-tests.hidepass').length).toEqual(0);

   });

   it("should have two user agent entries (uses module-name)", function () {
      expect(jQuery('#test-dom-output .module-name').length).toEqual(2);
   });

   it("should have first user agent 'mozilla'", function () {
      expect(jQuery('#test-dom-output .module-name')[0].innerHTML).toEqual('mozilla');
   });
   it("should have second user agent 'after change'", function () {
      expect(jQuery('#test-dom-output .module-name')[1].innerHTML).toEqual('after change');
   });

   it("should have one test plan under 'mozilla'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first>ol>li').length).toEqual(1);
   });
   it("should have one test plan under 'after change'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last>ol>li').length).toEqual(1);
   });

   it("should have red failure on 'mozilla'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first').attr('class')).toEqual('fail');
   });
   it("should have green pass on 'after change'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last').attr('class')).toEqual('pass');
   });

   it("should have q-test3.html test plan in 'mozilla'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first a').text()).toEqual('q-test3.html');
   });
   it("should have A HREF to re-run the q-test3.html test plan", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first a').attr('href')).toMatch(/^http:\/\/localhost:8888\/qunit-chainer\/q-test3\.html\?random=\d+$/);
   });
   it("should have QUnit example - no tests for q-test3.html test plan in 'mozilla'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first li>span.test-message').text()).toEqual('QUnit example - no tests');
   });
   it("should have red failure for q-test3.html test plan in 'mozilla'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first li').attr('class')).toEqual('fail');
   });
   it("should have (0,0,0) as fail/pass/total for q-test3.html test plan in 'mozilla'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:first li>b.counts').text()).toEqual('(0, 0, 0)');
   });

   it("should have q-test4.html test plan in 'after change'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last a').text()).toEqual('q-test4.html');
   });
   it("should have A HREF to re-run the q-test4.html test plan", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last a').attr('href')).toMatch(/^http:\/\/localhost:8888\/qunit-chainer\/q-test4\.html\?random=\d+$/);
   });
   it("should have QUnit example - one passing test for q-test4.html test plan in 'after change'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last li>span.test-message').text()).toEqual('QUnit example - one passing test');
   });
   it("should have green success for q-test4.html test plan in 'after change'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last li').attr('class')).toEqual('pass');
   });
   it("should have (0,1,1) as fail/pass/total for q-test4.html test plan in 'after change'", function () {
      expect(jQuery('#test-dom-output #qunit-tests>li:last li>b.counts').text()).toEqual('(0, 1, 1)');
   });

});

describe("QUnitChainer.setControlPageTestStatus() Control Page - if Plan.title exists, use it as title", function () {
   var title = 'nothing', TITLE = 'CUSTOM TITLE FOR TEST PLAN';
   beforeEach(function () {
      title = document.title;
      Plan = { 'title': TITLE };
      QUnitChainer.init(Plan);
      QUnitChainer.showControlPage('#test-dom-output');
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 1) called');
      document.title = title;
   });

   it('should have a document title of "\u2716 0 - ' + TITLE + '"', function () {
      expect(jQuery('title').html()).toEqual("\u2716 0 - " + TITLE);
   });

   it('should have a header of "' + TITLE + '"', function () {
      expect(jQuery('#qunit-header').text()).toEqual(TITLE);
   });
});

describe("QUnitChainer.clickPause() Control Page - clicking Pause checkbox clears Auto Run checkbox", function () {
   var title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set auto run checkbox for pause test) called');
      title = document.title;

      QUnitChainer.setProperty('bAutoRun', true);
      QUnitChainer.setProperty('bDumpStorage', true);
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');

      QUnitChainer.bindUIEvents();
      jQuery('#bPause').click();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 3) called');
      document.title = title;
   });

   // TODO THESE TESTS FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it('should have the pause and auto-run checkboxes checked and saved to storage', function () {
         waits(100);
         runs(function () {
            rStorage = QUnitChainer.getProperties();
            expect('#bPause ' + jQuery('#bPause')[0].checked).toEqual('#bPause true');
            expect('#bAutoRun ' + jQuery('#bAutoRun')[0].checked).toEqual('#bAutoRun false');
            expect('bPause ' + rStorage.bPause).toEqual('bPause true');
            expect('bAutoRun ' + rStorage.bAutoRun).toEqual('bAutoRun false');
         });
      });
   }
});

describe("QUnitChainer.clickAutoRun() Control Page - clicking Auto Run checkbox clears Pause checkbox", function () {
   var title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set pause checkbox for auto run test) called');
      title = document.title;
      QUnitChainer.setProperty('bPause', true);
      QUnitChainer.setProperty('bDumpStorage', true);
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');

      QUnitChainer.bindUIEvents();
      jQuery('#bAutoRun').click();

      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 4) called');
      document.title = title;
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it('should have the auto run, pause checkboxes cleared and saved to storage', function () {
         expect('#bAutoRun ' + jQuery('#bAutoRun')[0].checked).toEqual('#bAutoRun true');
         expect('#bPause ' + jQuery('#bPause')[0].checked).toEqual('#bPause false');
         expect('bAutoRun ' + rStorage.bAutoRun).toEqual('bAutoRun true');
         expect('bPause ' + rStorage.bPause).toEqual('bPause false');
      });
   }
});

describe("QUnitChainer.clickLog() Control Page - clicking Log checkbox changes value in storage", function () {
   var title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for log checkbox test) called');
      title = document.title;
      QUnitChainer.setProperty('bDumpStorage', true);
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');

      QUnitChainer.bindUIEvents();
      jQuery('#bLog').click();

      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 5) called');
      document.title = title;
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it('should have the log checkbox checked and in storage', function () {
         expect('#bLog ' + jQuery('#bLog')[0].checked).toEqual('#bLog true');
         expect('bLog ' + rStorage.bLog).toEqual('bLog true');
      });
   }
});

describe("QUnitChainer.clickDumpStorage() Control Page - clicking Dump Storage checkbox changes value in storage", function () {
   var title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for dump storage checkbox on test) called');
      title = document.title;
      QUnitChainer.showControlPage('#test-dom-output');

      QUnitChainer.bindUIEvents();
      jQuery('#bDumpStorage').click();

      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 6) called');
      document.title = title;
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it('should have the dump storage checkbox checked and in storage and visible on page', function () {
         expect('#bDumpStorage ' + jQuery('#bDumpStorage')[0].checked).toEqual('#bDumpStorage true');
         expect('bDumpStorage ' + rStorage.bDumpStorage).toEqual('bDumpStorage true');
         expect(jQuery('#qunitchainer-dump').html()).toMatch('"bDumpStorage": true');
      });
   }
});

describe("QUnitChainer.clickDumpStorage() Control Page - clicking Dump Storage checkbox off changes value in storage and hides the dump", function () {
   var title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for dump storage checkbox off test) called');
      title = document.title;
      QUnitChainer.setProperty('bDumpStorage', true);
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');

      QUnitChainer.bindUIEvents();
      jQuery('#bDumpStorage').click();

      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 7) called');
      document.title = title;
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it('should have the dump storage checkbox unchecked and in storage and visible on page', function () {
         expect('#bDumpStorage ' + jQuery('#bDumpStorage')[0].checked).toEqual('#bDumpStorage false');
         expect('bDumpStorage ' + rStorage.bDumpStorage).toEqual('bDumpStorage false');
         expect(jQuery('#qunitchainer-dump').html()).toEqual('');
      });
   }
});

describe("QUnitChainer.clickAlertStorage() Control Page - clicking Alert Storage checkbox changes value in storage", function () {
   var title = 'nothing', rStorage = null;

   QUnitChainer.logIt(Test.bLog, 'In the Test');
   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for alert storage checkbox test) called');
      title = document.title;

      QUnitChainer.setProperty('bDumpStorage', true);
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');

      QUnitChainer.bindUIEvents();

      spyOn(QUnitChainer, 'maybeAlertStorage').andCallThrough();
      spyOn(QUnitChainer, 'myAlert').andReturn();
      spyOn(window, 'alert').andReturn();

      jQuery('#bAlertStorage').click();

      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 8) called');
      document.title = title;
   });

   QUnitChainer.logIt(Test.bLog, 'Do the tests');
   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it('should have the alert storage checkbox checked and saved in storage', function () {
         expect('#bAlertStorage ' + jQuery('#bAlertStorage')[0].checked).toEqual('#bAlertStorage true');
         expect('bAlertStorage ' + rStorage.bAlertStorage).toEqual('bAlertStorage true');

         expect(QUnitChainer.maybeAlertStorage).not.toHaveBeenCalled();
         expect(QUnitChainer.myAlert).not.toHaveBeenCalled();
         expect(window.alert).not.toHaveBeenCalled();
      });
   }
});

describe("QUnitChainer.clickShowFailTitle() Control Page - clicking Show Fail Title checkbox changes title from unicode to text", function () {
   var title = 'nothing', rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for Show Fail Title checkbox test) called');

      title = document.title;
      Plan = { 'nextTestPlan': "next-test-plan5.html" };
      QUnitChainer.showControlPage('#test-dom-output');
      QUnitChainer.bindUIEvents();
      jQuery('#bShowFailTitle').click();
      rStorage = QUnitChainer.getProperties();
   });
   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 6) called');
      document.title = title;
      Plan = {};
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it("should have bShowFailTitle property set and changed the title to text", function () {
         expect(rStorage.bShowFailTitle).toEqual(true);
         expect(jQuery('title').html()).toEqual("FAIL 0 - QUnitChainer Control Page");
      });
   }
});

describe("QUnitChainer.clickShowPassed() Control Page - clicking Show Passed checkbox unhides the passing test plans", function () {
   var title = 'nothing', rStorage = null, classBefore = 'nothing';

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for bShowPassed checkbox click test');

      title = document.title;
      Plan = { 'nextTestPlan': "next-test-plan6.html" };
      QUnitChainer.init({ 'storage': "sessionStorage", 'skey': "QUCTest"});
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));
      QUnitChainer.showControlPage('#test-dom-output');
      classBefore = jQuery('#qunit-tests').attr('class');
      QUnitChainer.bindUIEvents();
      jQuery('#bShowPassed').click();
      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 7) called');
      document.title = title;
      Plan = {};
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it("should have bShowPassed property set and should have removed the hidepass class from the #qunit-tests div", function () {
         expect(classBefore).toEqual('hidepass');
         expect(rStorage.bShowPassed).toEqual(true);
         expect(jQuery('#qunit-tests.hidepass').length).toEqual(0);
      });
   }
});

describe("QUnitChainer.clickShowFixture() Control Page - clicking Show Fixture checkbox positions the qunit-fixture so it is visible", function () {
   var title = 'nothing', rStorage = null, posBefore = 'nothing', posAfter = 'somewhere';

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for bShowFixture checkbox click test');

      title = document.title;
      Plan = { 'nextTestPlan': "next-test-plan7.html" };
      QUnitChainer.init({ 'storage': "sessionStorage", 'skey': "QUCTest"});
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));
      QUnitChainer.showControlPage('#test-dom-output');
      posBefore = getPosition(jQuery('#qunit-fixture'));
      QUnitChainer.bindUIEvents();
      jQuery('#bShowFixture').click();
      rStorage = QUnitChainer.getProperties();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 7) called');
      document.title = title;
      Plan = {};
   });

   // TODO THESE TESTS FAIL FAIL IN IE BUT THE CODE WORKS WHEN IT RUNS ON ITS OWN!!
   if (!QUnitChainer.browserIsIE()) {
      it("should have bShowFixture property set and should have positioned the #qunit-fixture div so it is visible", function () {
         expect(posBefore).toEqual('absolute -10000px -10000px');
         expect(rStorage.bShowFixture).toEqual(true);
         posAfter = getPosition(jQuery('#qunit-fixture'));
         expect(posAfter).toEqual('relative 0px 0px');
      });
   }
});

describe("QUnitChainer.clickClearStorage() Control Page - clicking Clear Storage button clears all of storage", function () {
   var idx, title = 'nothing', rProperties = null, rTestSummary = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for clear storage button test) called');
      title = document.title;
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));
      QUnitChainer.setProperty('bDumpStorage', true);
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');
      QUnitChainer.bindUIEvents();
      jQuery('#clearStorage').click();
      rProperties = QUnitChainer.getProperties();
      rTestSummary = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 9) called');
      document.title = title;
   });

   // Must put these tests inside a function to prevent a closure in the for loop below.
   function testPropertiesFalse(key) {
      it("should have " + key + " set to false", function () {
         expect(key + ' ' + rProperties[key]).toEqual(key + ' false');
      });
      it("should have storage Property of " + key + " set to false", function () {
         expect(key + ' ' + QUnitChainer.getProperty(key)).toEqual(key + ' false');
      });
      if (key !== 'bFollowChain') {
         it("should have " + key + " checkbox unchecked", function () {
            expect(key + ' ' + jQuery('#' + key)[0].checked).toEqual(key + ' false');
         });
      }
   }

   for (idx = 0; idx < Test.Properties.length; ++idx) {
      testPropertiesFalse(Test.Properties[idx]);
   }

   it('should have no test summary data', function () {
      expect(JSON.stringify(rTestSummary)).toEqual('{}');
   });
   it('should have a message showing no tests plans are in storage', function () {
      expect(jQuery('#qunit-tests').text()).toBeEqualAsHtml(Test.NoTestRunsMessage);
   });
});

describe("QUnitChainer.clickClearTests() Control Page - clicking Clear Tests button clears tests", function () {
   var idx, title = 'nothing', rProperties = null, rTestSummary = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for clear tests button test) called');
      title = document.title;
      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));
      for (idx = 0; idx < Test.Properties.length; ++idx) {
         QUnitChainer.setProperty(Test.Properties[idx], true);
      }
      QUnitChainer.storeProperties();
      QUnitChainer.showControlPage('#test-dom-output');
      QUnitChainer.bindUIEvents();
      jQuery('#clearTests').click();
      rProperties = QUnitChainer.getProperties();
      rTestSummary = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title 10) called');
      document.title = title;
   });

   // Must put these tests inside a function to prevent a closure in the for loop below.
   function testPropertiesTrue(key) {
      if (key !== 'bFollowChain') {
         it("should have " + key + " set to true", function () {
            expect(key + ' ' + rProperties[key]).toEqual(key + ' true');
         });
         it("should have storage Property of " + key + " set to true", function () {
            expect(key + ' ' + QUnitChainer.getProperty(key)).toEqual(key + ' true');
         });
         it("should have " + key + " checkbox checked", function () {
            expect(key + ' ' + jQuery('#' + key)[0].checked).toEqual(key + ' true');
         });
      }
   }

   for (idx = 0; idx < Test.Properties.length; ++idx) {
      testPropertiesTrue(Test.Properties[idx]);
   }

   it('should have no test summary data', function () {
      expect(JSON.stringify(rTestSummary)).toEqual('{}');
   });
   it('should have a message showing no tests plans are in storage', function () {
      expect(jQuery('#qunit-tests').text()).toBeEqualAsHtml(Test.NoTestRunsMessage);
   });
});

describe("QUnitChainer.clickRunTests() Control Page - Follow Chain set and document location changed", function () {
   var title = 'nothing', raTestPlanHistory = null, rStorage = null;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for Run Tests button test) called');

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // Prevent document submission so we remain in control
      // TODO THIS IS NOT WORKING!!
      //jQuery('form').submit(function () {
      //  alert('yeah!'); return false; });

      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan8.html",
         'storage':      "sessionStorage",
         'skey':         "QUCTest"
      };

      QUnitChainer.clearHistory();
      QUnitChainer.storeHistory(['ztest.html']);

      QUnitChainer.init(Plan);
      QUnitChainer.showControlPage('#test-dom-output');
      QUnitChainer.bindUIEvents();
      jQuery('#runTests').click();
      rStorage = QUnitChainer.getProperties();
      raTestPlanHistory = QUnitChainer.getHistory();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and Plan 5) called');
      QUnitChainer.clearHistory();
      document.title = title;
      Plan = {};
   });

   it("should have bFollowChain property set and invoked setLocation() with next test plan name", function () {
      expect(rStorage.bFollowChain).toEqual(true);
      expect(raTestPlanHistory).toEqual(["next-test-plan8.html", "ztest.html"]);
      expect(QUnitChainer.setLocation).toHaveBeenCalledWith('next-test-plan8.html');
   });
});

describe("QUnitChainer.init() Control Page - Plan.bControl true causes init to display the control page and invoke autorun handler", function () {
   var autoRunInterval = QUnitChainer.autoRunInterval, title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up Plan.bControl true) called');
      title = document.title;
      autoRunInterval = QUnitChainer.autoRunInterval;
      Plan = {
         'bControl':     true,
         'nextTestPlan': "next-test-plan9.html",
         'jqInjectAt':   '#test-dom-output'
      };

      // Turn on auto run to check if the handler is invoked
      QUnitChainer.setProperty('bAutoRun', true);
      QUnitChainer.storeProperties();

      spyOn(QUnitChainer, 'initControlPage').andCallThrough();
      spyOn(QUnitChainer, 'injectControlPage').andCallThrough();
      spyOn(QUnitChainer, 'showControlPage').andCallThrough();
      spyOn(QUnitChainer, 'renderPage').andCallThrough();
      spyOn(QUnitChainer, 'bindUIEvents').andCallThrough();
      spyOn(QUnitChainer, 'handleAutoRun').andCallThrough();

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // Make the auto run call happen faster than normal
      QUnitChainer.autoRunInterval = 100;
      QUnitChainer.init(Plan);
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, Plan and autoRunInterval) called');
      document.title = title;
      QUnitChainer.autoRunInterval = autoRunInterval;
      Plan = {};
   });

   it("should have called methods to display the control page and then invoked the autorun", function () {
      runs(function () {
         expect('bIsControlPage ' + QUnitChainer.bIsControlPage).toEqual('bIsControlPage true');
         expect(QUnitChainer.initControlPage).toHaveBeenCalled();
         expect(QUnitChainer.injectControlPage).toHaveBeenCalledWith('#test-dom-output');
         expect(QUnitChainer.showControlPage).toHaveBeenCalledWith('#test-dom-output');
         expect(QUnitChainer.renderPage).toHaveBeenCalled();
         expect(QUnitChainer.bindUIEvents).toHaveBeenCalled();
      });
      // Give it time for the auto run timeout to happen
      waits(200);
      runs(function () {
         expect(QUnitChainer.handleAutoRun).toHaveBeenCalled();
         expect(QUnitChainer.setLocation).toHaveBeenCalledWith('next-test-plan9.html');
      });
   });
});

describe("QUnitChainer.init() QUnit Run Mode - QUnit existence and no Plan.bControl causes qunit run mode handlers to be installed", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up QUnit run mode) called');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan10.html",
         'jqInjectAt':   '#test-dom-output'
      };
      window.QUnit = {};
      jQuery('#test-dom-output').html(Test.qunitHTML);

      spyOn(QUnitChainer, 'installQUnitHandlers').andCallThrough();
      spyOn(QUnitChainer, 'initTests').andCallThrough();
      spyOn(QUnitChainer, 'initControlPage').andReturn();
      spyOn(QUnitChainer, 'showFixture').andCallThrough();

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      QUnitChainer.init(Plan);
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, Plan and QUnit) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should have called methods to enter QUnit run mode with fixture hidden", function () {
      expect('bIsControlPage ' + QUnitChainer.bIsControlPage).toEqual('bIsControlPage false');
      expect('bHasHandlers ' + QUnitChainer.bHasHandlers).toEqual('bHasHandlers true');
      expect(QUnitChainer.initControlPage).not.toHaveBeenCalled();
      expect(QUnitChainer.installQUnitHandlers).toHaveBeenCalled();
      expect(QUnitChainer.initTests).toHaveBeenCalled();
      expect(QUnitChainer.showFixture).toHaveBeenCalledWith(false);
      expect(QUnit.begin).toBeDefined();
      expect(QUnit.done).toBeDefined();
      expect(QUnit.moduleStart).toBeDefined();
      expect(QUnit.moduleDone).toBeDefined();
      expect(QUnit.testStart).toBeDefined();
      expect(getPosition(jQuery('#qunit-fixture'))).toEqual('absolute -10000px -10000px');

   });
});

describe("QUnitChainer.init() QUnit Run Mode - QUnit mode with fixture visible due to bShowFixture flag", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up QUnit run mode with visible fixture) called');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan11.html",
         'jqInjectAt': '#test-dom-output'
      };
      window.QUnit = {};
      jQuery('#test-dom-output').html(Test.qunitHTML);

      // Turn on show fixture flag
      QUnitChainer.setProperty('bShowFixture', true);
      QUnitChainer.storeProperties();

      spyOn(QUnitChainer, 'showFixture').andCallThrough();

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      QUnitChainer.init(Plan);
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, Plan and QUnit 0) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should have the qunit fixture visible", function () {
      expect(QUnitChainer.showFixture).toHaveBeenCalledWith(true);
      expect(getPosition(jQuery('#qunit-fixture'))).toEqual('relative 0px 0px');
   });
});

describe("QUnitChainer.begin() QUnit Run Mode - When QUnit tests begin, capture document location, test page header, set document title", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit begin) called');
      title = document.title;
      window.QUnit = {};

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      Plan = {'jqInjectAt': '#test-dom-output'};
      QUnitChainer.init(Plan);
      QUnit.begin();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and QUnit 1) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should have called methods to enter QUnit run mode", function () {
      expect(QUnitChainer.Tests.plan).toEqual(document.location.href);
      expect(QUnitChainer.Tests.header).toEqual(Test.ExpectTestPlanTitle);
      expect(jQuery('title').html()).toEqual(Test.ExpectTestPlanTitle);
   });
});

describe("QUnitChainer.moduleStart() QUnit Run Mode - moduleStart records info about the module and clears test counter", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit moduleStart) called');
      title = document.title;
      window.QUnit = {};

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // add QUnit test plan header to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1>');

      Plan = {'jqInjectAt': '#test-dom-output'};
      QUnitChainer.init(Plan);
      QUnitChainer.testIdx = 42;
      QUnit.begin();
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and QUnit 2) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should have saved module name, updated module count, and reset test count", function () {
      expect(QUnitChainer.moduleIdx).toEqual(0);
      expect(QUnitChainer.testIdx).toEqual(-1);
      expect(QUnitChainer.Tests.module).toEqual(Test.ExpectTestModuleName);
   });
});

describe("QUnitChainer.testStart() QUnit Run Mode - testStart records info about the test", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit testStart) called');
      title = document.title;
      window.QUnit = {};

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      Plan = {'jqInjectAt': '#test-dom-output'};
      QUnitChainer.init(Plan);
      QUnit.begin();
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
      QUnit.testStart({"name": Test.ExpectTestName});
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and QUnit 3) called');
      document.title = title;
      window.QUnit = null;
   });

   it("should have saved test name, module name and updated test counter", function () {
      expect(QUnitChainer.testIdx).toEqual(0);
      expect(QUnitChainer.Tests.module).toEqual(Test.ExpectTestModuleName);
      expect(QUnitChainer.Tests.test).toEqual(Test.ExpectTestName);
   });
});

describe("QUnitChainer.testStart() QUnit Run Mode - testStart with no module() call still records info about the test", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit testStart with no module() call) called');
      title = document.title;
      window.QUnit = {};

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      Plan = {'jqInjectAt': '#test-dom-output'};
      QUnitChainer.init(Plan);
      QUnit.begin();
      QUnit.testStart({"name": Test.ExpectTestName});
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and QUnit 3.1) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should have saved test name, module name and updated test counter", function () {
      expect(QUnitChainer.testIdx).toEqual(0);
      expect(QUnitChainer.Tests.module).toEqual(Test.ExpectNoModuleName);
      expect(QUnitChainer.Tests.test).toEqual(Test.ExpectTestName);
   });
});

describe("QUnitChainer.moduleDone() QUnit Run Mode - moduleDone accumulates stats on tests passed/failed and total", function () {
   var title = document.title;

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit moduleDone) called');
      title = document.title;
      window.QUnit = {};

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      Plan = {'jqInjectAt': '#test-dom-output'};
      QUnitChainer.init(Plan);

      // Set up with a previous record of tests which pass/fail/total
      QUnitChainer.Tests.failed = 1;
      QUnitChainer.Tests.passed = 1;
      QUnitChainer.Tests.total  = 2;

      QUnit.begin();
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
      QUnit.testStart({"name": Test.ExpectTestName});

      QUnit.moduleDone({"name": Test.ExpectTestModuleName, "failed": 2, "passed": 4, "total": 6});
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title and QUnit 4) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should have counted failed, passed and total tests", function () {
      expect(QUnitChainer.Tests.failed).toEqual(3);
      expect(QUnitChainer.Tests.passed).toEqual(5);
      expect(QUnitChainer.Tests.total).toEqual(8);
   });
});

describe("QUnitChainer.done() QUnit Run Mode - done with bFollowChain false and bPause true cleans user agent/test plan and stores results in storage, WITHOUT pausing or chaining to next test plan", function () {
   var title = document.title, rAlert = window.alert, rTests = {};

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit done with follow chain true and no next test plan) called');
      title = document.title;
      Plan = {
         'bPause':  true,
         'jqInjectAt': '#test-dom-output'
      };

      window.QUnit = {};
      window.alert = function () {};

      QUnitChainer.cleanUserAgent = function (userAgent) { return userAgent; };
      QUnitChainer.cleanTestPlan = function (testPlan) { return testPlan; };

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      QUnitChainer.init(Plan);

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();
      spyOn(QUnitChainer, 'cleanUserAgent').andReturn('userAgent');
      spyOn(QUnitChainer, 'cleanTestPlan').andReturn('testPlan');

      spyOn(QUnitChainer, 'myAlert').andReturn();
      spyOn(window, 'alert').andCallThrough();

      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));

      QUnit.begin();
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
      QUnit.testStart({"name": Test.ExpectTestName});
      QUnit.moduleDone({"name": Test.ExpectTestModuleName, "failed": 2, "passed": 4, "total": 6});
      QUnit.done({"failed": 3, "passed": 7, "total": 10, "runtime": 164});

      rTests = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, QUnit, alert etc 1) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
      window.alert = rAlert;
      delete QUnitChainer.cleanTestPlan;
      delete QUnitChainer.cleanUserAgent;
   });

   it("should clean the userAgent and testPlan name then save data to storage and chain to the next test plan", function () {
      var testPlan = document.location.href.replace(/\?.*$/, '');

      expect(QUnitChainer.Tests.module).toBeUndefined();
      expect(QUnitChainer.Tests.tests).toBeUndefined();
      expect(QUnitChainer.Tests.userAgent).toEqual(Test.ExpectUserAgent);
      expect(QUnitChainer.cleanUserAgent).toHaveBeenCalledWith(Test.ExpectUserAgent);
      expect(QUnitChainer.cleanTestPlan).toHaveBeenCalledWith(testPlan);

      // Verify that test plan records made it into storage (including previous test run in storage)
      expect(rTests.userAgent).toBeDefined();
      expect(rTests['after change']).toBeDefined();

      // Verify that the alert dialog is not shown
      expect(QUnitChainer.myAlert).not.toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled();

      // Verify that the next test plan is not invoked
      expect(QUnitChainer.setLocation).not.toHaveBeenCalled();
   });
});

describe("QUnitChainer.done() QUnit Run Mode - done with bFollowChain false and bPause true cleans user agent/test plan and stores results in storage, WITHOUT pausing or chaining to next test plan", function () {
   var title = document.title, rAlert = window.alert, rTests = {};

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit done with follow chain true and no next test plan) called');
      title = document.title;
      Plan = {
         'bPause':  true,
         'jqInjectAt': '#test-dom-output'
      };

      window.QUnit = {};
      window.alert = function () {};

      QUnitChainer.cleanUserAgent = function (userAgent) { return userAgent; };
      QUnitChainer.cleanTestPlan = function (testPlan) { return testPlan; };

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      QUnitChainer.init(Plan);

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();
      spyOn(QUnitChainer, 'cleanUserAgent').andReturn('userAgent');
      spyOn(QUnitChainer, 'cleanTestPlan').andReturn('testPlan');

      spyOn(QUnitChainer, 'myAlert').andReturn();
      spyOn(window, 'alert').andCallThrough();

      QUnitChainer.storeTestResults(JSON.parse(Test.TestRunStoragePass));

      QUnit.begin();
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
      QUnit.testStart({"name": Test.ExpectTestName});
      QUnit.moduleDone({"name": Test.ExpectTestModuleName, "failed": 2, "passed": 4, "total": 6});
      QUnit.done({"failed": 3, "passed": 7, "total": 10, "runtime": 164});

      rTests = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, QUnit, alert etc 1) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
      window.alert = rAlert;
      delete QUnitChainer.cleanTestPlan;
      delete QUnitChainer.cleanUserAgent;
   });

   it("should clean the userAgent and testPlan name then save data to storage and chain to the next test plan", function () {
      var testPlan = document.location.href.replace(/\?.*$/, '');
      expect(QUnitChainer.Tests.module).toBeUndefined();
      expect(QUnitChainer.Tests.tests).toBeUndefined();
      expect(QUnitChainer.Tests.userAgent).toEqual(Test.ExpectUserAgent);
      expect(QUnitChainer.cleanUserAgent).toHaveBeenCalledWith(Test.ExpectUserAgent);
      expect(QUnitChainer.cleanTestPlan).toHaveBeenCalledWith(testPlan);

      // Verify that test plan records made it into storage (including previous test run in storage)
      expect(rTests.userAgent).toBeDefined();
      expect(rTests['after change']).toBeDefined();

      // Verify that the alert dialog is not shown
      expect(QUnitChainer.myAlert).not.toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled();

      // Verify that the next test plan is not invoked
      expect(QUnitChainer.setLocation).not.toHaveBeenCalled();
   });
});

describe("QUnitChainer.done() QUnit Run Mode - done with ?filter= in the document URL does not store results in storage (this represents running a single test case)", function () {
   var title = document.title, rTests = {};

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit done with ?filter=) called');
      title = document.title;
      Plan = {
         'nextTestPlan': "next-test-plan12.html",
         'jqInjectAt': '#test-dom-output'
      };

      window.QUnit = {};

      QUnitChainer.init(Plan);

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();

      QUnit.begin();
      // Override the document location to include ?filter=
      QUnitChainer.Tests.plan = QUnitChainer.Tests.plan + "?filter=Some%20Test%20Case";
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
      QUnit.testStart({"name": Test.ExpectTestName});
      QUnit.moduleDone({"name": Test.ExpectTestModuleName, "failed": 2, "passed": 4, "total": 6});
      QUnit.done({"failed": 3, "passed": 7, "total": 10, "runtime": 164});

      rTests = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title after ?filter=) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
   });

   it("should not save data to storage", function () {
      // Verify that test plan records are not in storage

      expect(rTests.userAgent).toBeUndefined();
      expect(rTests).toEqual({});
   });
});

describe("QUnitChainer.done() QUnit Run Mode - module() not called during tests, ensure we store results in storage correctly", function () {
   var title = document.title, rAlert = QUnitChainer.myAlert, rTests = {};

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit tests with no module() call) called');
      title = document.title;

      window.QUnit = {};
      QUnitChainer.myAlert = function () {};

      QUnitChainer.cleanUserAgent = function (userAgent) { return userAgent; };
      QUnitChainer.cleanTestPlan = function (testPlan) { return testPlan; };

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      Plan = {'jqInjectAt': '#test-dom-output'};
      QUnitChainer.init(Plan);

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();
      spyOn(QUnitChainer, 'cleanUserAgent').andReturn('userAgent');
      spyOn(QUnitChainer, 'cleanTestPlan').andReturn('testPlan');

      spyOn(QUnitChainer, 'maybeAlertStorage').andCallThrough();
      spyOn(QUnitChainer, 'myAlert').andCallThrough();
      spyOn(window, 'alert').andReturn();

      QUnit.begin();
      QUnit.testStart({"name": Test.ExpectTestName});
      QUnit.testDone({"name": Test.ExpectTestName, "failed": 2, "passed": 4, "total": 6 });
      QUnit.done({"failed": 3, "passed": 7, "total": 10, "runtime": 164});

      rTests = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, QUnit, alert etc 3) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
      QUnitChainer.myAlert = rAlert;
      delete QUnitChainer.cleanTestPlan;
      delete QUnitChainer.cleanUserAgent;
   });

   it("should clean the userAgent and testPlan name then save data to storage and chain to the next test plan", function () {
      expect(QUnitChainer.Tests.module).toBeUndefined();
      expect(QUnitChainer.Tests.tests).toBeUndefined();
      expect(QUnitChainer.Tests.userAgent).toEqual(Test.ExpectUserAgent);

      // Verify that test plan records made it into storage
      // Expected '{"userAgent":{"testPlan":{"plan":"http://local.ft.com/qunit-chainer/SpecRunner.html","userAgent":"userAgentMan","header":"QUnit Test Example",
      // "failed":2,"passed":4,"total":6,"log":{}}}}'

      expect(rTests.userAgent).toBeDefined();
      expect(rTests.userAgent.testPlan).toBeDefined();
      expect(rTests.userAgent.testPlan.plan).toEqual(document.location.href);
      expect(rTests.userAgent.testPlan.userAgent).toEqual(Test.ExpectUserAgent);
      expect(rTests.userAgent.testPlan.header).toEqual(Test.ExpectTestPlanTitle);
      expect(rTests.userAgent.testPlan.failed).toEqual(2);
      expect(rTests.userAgent.testPlan.passed).toEqual(4);
      expect(rTests.userAgent.testPlan.total).toEqual(6);

      // Verify that the alert dialog is not shown

      expect(window.alert).not.toHaveBeenCalled();
   });
});

describe("QUnitChainer.done() QUnit Run Mode - done with bPause and bFollowChain true and no next test plan cleans user agent/test plan and stores results in storage, showing the control page after pausing", function () {
   var title = document.title, rAlert = window.alert, message = 'nothing', rTests = {};

   beforeEach(function () {
      QUnitChainer.logIt(Test.bLog, 'beforeEach(to set up for QUnit done with follow chain true and no next test plan) called');
      title = document.title;
      Plan = {
         'bPause':  true,
         'jqInjectAt': '#test-dom-output'
      };

      window.QUnit = {};
      QUnitChainer.myAlert = function (msg) { message = msg; };

      QUnitChainer.cleanUserAgent = function (userAgent) { return userAgent; };
      QUnitChainer.cleanTestPlan = function (testPlan) { return testPlan; };

      // add QUnit test plan header and user Agent to page
      jQuery('#test-dom-output').html('<h1 id="qunit-header">' + Test.ExpectTestPlanTitle + '</h1><h2 id="qunit-userAgent">' + Test.ExpectUserAgent + '</h2>');

      QUnitChainer.init(Plan);

      // Spy on the setLocation function and prevent it from actually changing the document.location
      spyOn(QUnitChainer, 'setLocation').andReturn();
      spyOn(QUnitChainer, 'cleanUserAgent').andReturn('userAgent');
      spyOn(QUnitChainer, 'cleanTestPlan').andReturn('testPlan');
      spyOn(QUnitChainer, 'wipeQUnitOutput').andCallThrough();
      spyOn(QUnitChainer, 'showControlPage').andCallThrough();

      spyOn(QUnitChainer, 'maybeAlertStorage').andCallThrough();
      spyOn(QUnitChainer, 'myAlert').andCallThrough();
      spyOn(window, 'alert').andReturn();

      QUnitChainer.setProperty('bFollowChain', true);
      QUnitChainer.storeProperties();

      QUnit.begin();
      QUnit.moduleStart({"name": Test.ExpectTestModuleName});
      QUnit.testStart({"name": Test.ExpectTestName});
      QUnit.moduleDone({"name": Test.ExpectTestModuleName, "failed": 2, "passed": 4, "total": 6});

      QUnit.done({"failed": 3, "passed": 7, "total": 10, "runtime": 164});

      rTests = QUnitChainer.getTestResults();
   });

   afterEach(function () {
      QUnitChainer.logIt(Test.bLog, 'afterEach(to restore title, QUnit, alert etc 4) called');
      document.title = title;
      Plan = {};
      window.QUnit = null;
      window.alert = rAlert;
      delete QUnitChainer.cleanTestPlan;
      delete QUnitChainer.cleanUserAgent;
   });

   it("should clean the userAgent and testPlan name then save data to storage and chain to the next test plan", function () {
      var testPlan = document.location.href.replace(/\?.*$/, '');

      expect(QUnitChainer.Tests.module).toBeUndefined();
      expect(QUnitChainer.Tests.tests).toBeUndefined();
      expect(QUnitChainer.Tests.userAgent).toEqual(Test.ExpectUserAgent);
      expect(QUnitChainer.cleanUserAgent).toHaveBeenCalledWith(Test.ExpectUserAgent);
      expect(QUnitChainer.cleanTestPlan).toHaveBeenCalledWith(testPlan);

      // Verify that test plan records made it into storage
      // Expected '{"userAgent":{"testPlan":{"plan":"http://local.ft.com/qunit-chainer/SpecRunner.html","userAgent":"userAgentMan","header":"QUnit Test Example",
      // "failed":2,"passed":4,"total":6,"log":{}}}}'

      expect(rTests.userAgent).toBeDefined();
      expect(rTests.userAgent.testPlan).toBeDefined();
      expect(rTests.userAgent.testPlan.plan).toEqual(document.location.href);
      expect(rTests.userAgent.testPlan.userAgent).toEqual(Test.ExpectUserAgent);
      expect(rTests.userAgent.testPlan.header).toEqual(Test.ExpectTestPlanTitle);
      expect(rTests.userAgent.testPlan.failed).toEqual(2);
      expect(rTests.userAgent.testPlan.passed).toEqual(4);
      expect(rTests.userAgent.testPlan.total).toEqual(6);

      // Verify that the alert dialog is shown since bPause is true
      expect(message).toEqual(Test.ExpectEndAlertMessage);

      expect(QUnitChainer.maybeAlertStorage).toHaveBeenCalled();
      expect(QUnitChainer.myAlert).toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled();

      expect(QUnitChainer.maybeAlertStorage.callCount).toEqual(5);
      expect(QUnitChainer.myAlert.callCount).toEqual(1);
      expect(window.alert.callCount).toEqual(0);

      // Verify that the next test plan is not invoked
      expect(QUnitChainer.setLocation.callCount).toEqual(0);
      expect(QUnitChainer.setLocation).not.toHaveBeenCalled();

      // Verify that the control page is shown
      expect(QUnitChainer.wipeQUnitOutput).toHaveBeenCalledWith('#test-dom-output');
      expect(QUnitChainer.showControlPage).toHaveBeenCalledWith('#test-dom-output');
      expect(jQuery('#qunit-banner').attr('class')).toEqual('qunit-fail');
      expect(jQuery('#test-dom-output .module-name').length).toEqual(1);
      expect(jQuery('#test-dom-output .module-name')[0].innerHTML).toEqual('userAgent');
   });
});

function chainToNextTest() {
   // Invoke QUnitChainer in normal mode to use it to go to the next test plan
   // We take the jasmine test results and store them as QUnitChainer results
   Plan = {
      'nextTestPlan': '../sample/q-test.html', // REPLACE
      'storage': "localStorage",
      'skey': "QUnitChainer"
   };
   QUnitChainer.init(Plan);
   if (QUnitChainer.getProperty('bFollowChain')) {
      var failed = 0, passed = 0, total = 0, runtime = 0, Match;
      Match = jQuery('a.description').html().match(/(\d+) specs?, (\d+) failures? in ([\d\.]+)s/);
      if (Match) {
         total   = parseInt(Match[1], 10);
         failed  = parseInt(Match[2], 10);
         runtime = parseFloat(Match[3]) * 1000;
         passed  = total - failed;
         QUnitChainer.Tests.failed = failed;
         QUnitChainer.Tests.passed = passed;
         QUnitChainer.Tests.total = total;
         QUnitChainer.Tests.header = 'QUnitChainer Jasmine unit tests';
         QUnitChainer.Tests.plan = document.location.href;
         QUnitChainer.done({ 'failed': failed, 'passed': passed, 'total': total, 'runtime': runtime });
      }
      QUnitChainer.setLocation(Plan.nextTestPlan);
   }
}

describe("END", function () {
   // Final case to hide the qunit control page output at top of test plan
   // and verify that the correct number of tests have been run
   it("should have correct number of describe() blocks", function () {
      expect(jasmine.currentEnv_.nextSuiteId_).toEqual(Test.totalSuites);
   });
   it("should have correct number of it() blocks", function () {
      expect(jasmine.currentEnv_.nextSpecId_).toEqual(Test.totalSpecs);

      // Chain to the next test plan waiting a moment so that the DOM
      // has time to be updated.
      setTimeout(function () {
         chainToNextTest();
      }, 300);
   });
});

// TODO if log is turned on store calls to log() in storage and display on the control page in a textarea
// TODO store order of tests in storage and edit from control page
