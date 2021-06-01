When I first got into software development, I just code without using the best practices. I learnt in the bitter if I had the chance to start again, the following tips will be what I would pay attention to most

Tip 1: Writing clean and modularized codes
        Modularizing your code means breaking up your code into logical functions and modules. I can not overemphasize this because It helps you organize your program in cleaner and more efficient ways.  No competent organization uses a giant `app.py` or `app.js`  in production for large scale projects. Bear in mind that you most likely would not be working on the project alone so you would not want to give your teammates hard time finding a variable declaration or function. This brings us to the second tip version control.

Tip 2: Version Control
 	Version Control is tracking and managing changes to software code. You most likely would have heard of Git or Github by now. 

Tip 3: Effective documentation
	Although many senior developers have different opinions on documentation, documenting your code will save you a tonne of time trying to figure what a function or variable does long after you must have implemented it and it is essential for getting others to understand why and how your code is relevant to them, whether they are potentials users of your project or developers who may contribute to your code.  If you are a backend developer, Swagger and Postman would be your best bet for this. Also, make sure to include every detail in your README file It will often be the first interaction most users will have with your project. Other approaches to proper documentation include:
        - Use inline comments
        - Documentation strings (docstrings)
        - Explaining roles of arguments in the comments and outputs of 			functions

Tip 4:  Improve code efficiency
	- Using vector operations over loops when possible
        (in python, NumPy and Pandas are your best friends for this)
	- Implementing data structure methods that are faster

Tip 5: Writing unit tests
        - Unit tests is that they are isolated from the rest of your program, and thus, no dependencies are involved. They don't require access to databases, APIs, or other external sources of information. However, passing unit tests isn’t always enough to prove that our program is working successfully. To show that all the parts of our program work with each other properly, communicating and transferring data between them correctly, we use integration tests.


Tip 6: Logging
	Logging is the process of writing down everything your software does. There are different types of logging, you might decide to log when errors occur or log critical operations done this could be for audit purposes. Asides from those reasons, Logging makes troubleshooting and debugging much easier. If you are working on a large scale or enterprise application, logging in an invaluable tool. Errors need to be logged with enough information to point to the line of code. 

Tip 7: Code reviews
      Code reviews benefit everyone in a team to promote best programming practices and prepare code for production. 

Tip 8:  Code linters
	A linter is a static code analysis tool used to flag programming errors, bugs, stylistic errors and suspicious constructs.






