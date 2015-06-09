var expect = chai.expect;

describe('Basic Unit Tests', function() {
  it('should only accept elements', function() {

    expect(function() {new NewJax()}).to.throw(TypeError, /argument/);
    expect(function() {new NewJax(null)}).to.throw(TypeError, /argument/);
    expect(function() {new NewJax(1)}).to.throw(TypeError, /argument/);
    expect(function() {new NewJax('div')}).to.throw(TypeError, /argument/);
    expect(function() {new NewJax(document.createElement('div'))}).to.not.throw;
  });
});
