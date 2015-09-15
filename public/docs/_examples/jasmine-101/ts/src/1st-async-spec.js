describe('1st async tests', function () {
    it('setTimeout delay test passes', function (done) {
        setTimeout(function () {
            expect(false).toBe(false);
            done();
        }, 50);
    });
    it('resolved promise succeeds as expected', function (done) {
        Promise.resolve(true)
            .then(function (result) {
            expect(result).toEqual(true);
        })
            .catch(fail).then(done);
    });
    ////// Demonstrate the `.catch(fail).then(done)` pattern /////
    // If something goes wrong, we want to see the real error
    // not get an obscuring "async timeout" error
    //
    // Testing dilemma: to see it work we have to let the error through
    // but then it looks like our tests are failing.
    // Can't use Jasmine's expectToThrow because its `fail` function
    // doesn't actually throw.
    //
    // Our solution is to let you see how it works by COMMENTING OUT
    // ".catch(()=>{}) // eat the failure.""
    it('rejected promise fails as expected', function (done) {
        Promise.reject('reject on purpose')
            .then(function (result) {
            fail('should not get here');
        })
            .catch(function () { }) // eat the failure. Comment out to see how catch-fail-done idiom works
            .catch(fail).then(done);
    });
    it('exception in promise handler fails as expected', function (done) {
        Promise.resolve(true)
            .then(function (result) {
            throw new Error('intentional exception');
            fail('should not get here');
        })
            .catch(function () { }) // eat the failure. Comment out to see how catch-fail-done idiom works
            .catch(fail).then(done);
    });
});
//# sourceMappingURL=1st-async-spec.js.map