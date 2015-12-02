# using mocha



###### how to skipping test/testing only one

to skip: 
​	put x in front of it or describe: xit and xdescribe(skip the entire block)
to test only specific test/block: 
​	describe.only or it.only: only run this block/test
​	no need to commend out codes anymore!
​	should only use one "only" per file, there seems to be some tricky things related to it

###### how to call mocha to test things how to make mocha watch an entire folder

​	in terminal: mocha file.file
​	if testing multiple files:
​	mocha name.js name002.js
but if have a test/ directory in current dir then, command: mocha will run all js files at root of that dir.
(means to watch, like grunt)
​	mocha -w

###### IO and Async Operation: how to test

​	by using done(): it is a function that passes to the test function
``` javascript
it('test async', function(done){
	//done should be call where async operation is done
  fs.read('file', function(){
  	done()//call done here to tell mocha that this function is actually done now, and your tests are done now, time to move on.
    //The basic idea behind the `done()` call is that you call this after your async code has completed, and your test has modified everything it needs to modify, so you can check the results correctly. then call done() to finally finish current test.
  })
})
//done takes argument too, if passing error, it will help to fail the test
```



# using chai



###### before you can use it, what to set up?

```
​	var expect = chai.expect
​	chai.should() //will make a method for all object/values that's why you can 'hey'.should
​	//also: chai.should() returns  an object which you can should.someTest(value)
```

###### if to test if error can throw successfully:

``` javascript
expect(function(){
  //code that should throw error, let it throw here
  //this function will catch it.
}).to.throw();
```



# test coverage:



###### how to use isntanbul	

istanbul: 
``` javascript
npm install -g instabul
instabul cover path/to/_mocha path/to/test.file
```



# test in general



###### writing a good units test: 

​	test individual function/class see if they work the way they should
​	test and see if they break when they should/ test negative case
​	naming of the test should match the target function/intention of the test
Some people believe in writing the tests first, having them fail, and then writing the code to make them pass. Some write tests after the code is already written.

###### how to write code that is testable or accessible: anonymous functions/private pattern/self initializing functions/dependency injection:

​	exposing the functions/part by avoiding using anonymous functions
​	externalize and name  the anonymous functions/part(put it right around where is it used)
​	if private pattern: make sure to have public interface for testing
​	but beware of data in the private module/pattern, you might forget to reset it.
​	if self initializing functions: as soon they are load, they will run. so attach it to something global so you can access it once it runs: ex:
​	window.name, then in the test grab that.
​	dependency injection: if code calls other code out side of it, like within a function, it directly calls other functions/code. Those code are dependencies. It still be tested by finding what those dependencies are and mock them.
​	or you can pass those dependencies in as parameters, there by allowing easier manipulation of dependencies(like passing in simon stub or mock object)

###### to access the code you need to test:

make an html to put everything in one global scope, maybe just simply modify the index.html
or write code in a way that they could be exported as modules, then require the files together.
again anticipate how your code will be tested while writing them.
​	in this way: good code and good testable code are the same: modular, isolated, whatever you need to use/interact needs to be easily exposed, you can easily test them too.

###### basic steps to test things

arrange: set things up, set up the state
act: run the code to produce something, modify the state
assert: check and see if things come out the way you want, check the state



#----update----



###### IO and Async Operation: how to test

​	by using done(): it is a function that passes to the test function
``` javascript
it('test async', function(done){
	//done should be call where async operation is done
  fs.read('file', function(){
  	done()//call done here to tell mocha that this function is actually done now, and your tests are done now, time to move on.
    //The basic idea behind the `done()` call is that you call this after your async code has completed, and your test has modified everything it needs to modify, so you can check the results correctly. then call done() to finally finish current test.
  })
})
//done takes argument too, if passing error, it will help to fail the test
```

###### writing a good units test: 

​	test individual function/class see if they work the way they should
​	test and see if they break when they should/ test negative case
​	naming of the test should match the target function/intention of the test
Some people believe in writing the tests first, having them fail, and then writing the code to make them pass. Some write tests after the code is already written.