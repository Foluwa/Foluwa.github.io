Google Chrome’s V8 engine, which has been reused here by Node.js, works completely differently. It is highly optimized and carries out what we call JIT (Just In Time) compilation. It quickly transforms JavaScript code into machine language and even optimizes via complex processes like code inlining and copy elision, amongst others.




Non-blocking model
As JavaScript is a language built around the idea of events, Node.js allows an entirely non-blocking code algorithm to be put into place.

By the way, do you know the difference between a blocking code and a non-blocking code? Hmmm, perhaps a little explanation is called for! ;)

Blocking model vs. non-blocking model
Imagine a program which is created to upload a file and then display it. This is how we would write the code in a blocking model:

Upload the file
Display the file
Do something else
The actions are carried out in order. The lines need to be read from top to bottom:

The program will upload a file to the Internet.

The program will display the file to the user.

Then, the program can do other things (i.e. carry out other actions).

Now, we can write the same code in a non-blocking model: