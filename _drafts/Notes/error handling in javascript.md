In everything we code, we should do our best to make our code as robust and reliable as possible. Basic JavaScript error handling is often achieved with  try...catch...finally  blocks, and although this can be good enough in some cases, there are many strategies for code reliability.  

For example, if you have a function that requires three arguments, will you use a try/catch block to try and manipulate them? Or would it be better to test for the arguments before doing anything and sending back a meaningful error message? Or should you use default values? There is no single "right answer" to these questions, but what would be wrong is to ignore the problem completely.














<!--- THE END -->



ust these few seemingly simple steps can make a real difference between buggy, hard-to-maintain code and a robust, maintainable, reliable app.  Writing code with error handling in mind will also make you write better code, as you will constantly be wondering about what could go wrong and preemptively avoiding unnecessary errors.