# How to contribute

Hey there, about the third person to every read this! Welcome. It's great that you're here reading this. 

I like to keep things simple, so here goes. 

## Branches
The project use 2 main branches:
1. master
2. stage

All feature branches should be branched off the `stage` branch.

**Branch names**

Branch names should include the issue ID (e.g. issue-1234) and a prefix of what it is. e.g. feature, bug, hotfix, release, existential dread. That kind of thing.

**Example:** `git branch -b feature/issue-1234`

## Testing
I'll be honest this is more for myself than anyone else...

**Simplify your code** - If you find yourself struggling to write tests, that is a code smell. [Good tests are easy to write and read](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3). If you find yourself mocking a lot for your unit tests, [that could be a code smell for tight coupling](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a). The solution is often to "move a level up" and use functional tests instead.

**Give you confidence** - aka [Avoid testing implementation details](https://kentcdodds.com/blog/testing-implementation-details). Good tests are resilient to refactors.

**Document your requirements** - If you [write your tests in a meaningful way](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d) you will have nice documentation that helps you in the future to remember what your intention was. And it makes onboarding new developers on the team easier.

[Source](https://github.com/aws-amplify/amplify-js/issues/3893#issuecomment-525603643)

I quite like this template/intent for a test and I should use it more often.
```
// For each unit test you write,
// answer these questions:
test('What component aspect are you testing?', assert => {
  const actual = 'What is the actual output?';
  const expected = 'What is the expected output?';

  assert.equal(actual, expected, 'What should the feature do?');

  assert.end();
});
```

## Pull requests
The title of a pull request should include the issue ID and title.

`issue-1465 Add feature to section`

The description of a pull request should contain a link to the issue for easy reference by the reviewers.

Pull requests will be rejected when:
* Coding conventions are not followed
* Link to issue is missing
* The changes do not implement the requested feature/change correctly
* Tests are failing
