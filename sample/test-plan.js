/*
   Test plan file containing tests
 */

// Clean up the user agent and test plan name for storage
QUnitChainer.cleanUserAgent = function (userAgent) {
   return 'mozilla';
};
QUnitChainer.cleanTestPlan = function (testPlan) {
   testPlan = testPlan.replace('http://sandbox.bsac.com/ipad-testing/', '');
   return testPlan;
};

$(document).ready(function() {

  module("Basic Unit Test");

  test("Sample test", function()
  {
     expect(1);
     var result = divide(4,2);
     var expected = 2;
     equals(result, expected, 'divide(4,2) should be ' + expected);
  });

  test("Sample test repeat", function()
  {
     expect(1);
     var result = divide(4,2);
     var expected = 2;
     equals(result, expected, 'divide(4,2) should be ' + expected);
  });

  module("Failing Unit Test with setup and teardown code", {
    setup: function() {
      this.extraTests = 2;
      this.result = divide(4,2);
      ok(true, "setup tests: one extra assert per test");
    },
    teardown: function() {
      ok(true, "teardown tests: and one extra assert after each test");
    }
  });

  test("Sample test fails", function()
  {
     expect(1 + this.extraTests);
     var expected = 3;
     equals(this.result, expected, 'divide(4,2) should be ' + expected);
  });

  test("Sample test fails again", function()
  {
     expect(1 + this.extraTests);
     var expected = 3;
     equals(this.result, expected, 'divide(4,2) should be ' + expected);
  });

  module("Broken Unit Test");

  test("Sample test count wrong", function()
  {
     expect(2);
     var result = divide(4,2);
     var expected = 2;
     equals(result, expected, 'divide(4,2) should be ' + expected);
  });

});
