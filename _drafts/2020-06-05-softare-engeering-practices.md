SOFTWARE ENGINEERINFG PRACTICES

- Writing clean and modular codes
		Modularizing your code - or breaking up your code into logical functions and modules - really helps you organize your program in cleaner and more efficient ways.


- Improve code efficiency


- Effective documentation
		- Use inline comment
		- Documentation strings (doc strings)
				Project documentation is essential for getting others to understand why and how your code is relevant to them, whether they are potentials users of your project or developers who may contribute to your code. A great first step in project documentation is your README file. It will often be the first interaction most users will have with your project.
		- 
	** explaining roles of arguments in the comments and outputs of functions

- Version Control


- Writing unit tests
		- unit tests is that they are isolated from the rest of your program, and thus, no dependencies are involved. They don't require access to databases, APIs, or other external sources of information. However, passing unit tests isn’t always enough to prove that our program is working successfully. To show that all the parts of our program work with each other properly, communicating and transferring data between them correctly, we use integration tests.
	** hve once assert statement per test

- Logging


- code reviews
		- Code reviews benefit everyone in a team to promote best programming practices and prepare code for production. , -Use a code linter


- using vector operations over loops when possible
		(in python, numpy and pandas are your best friends for this)


- Implmenting data structure methods that are faster




________________________________________________
Is the code clean and modular?
Can I understand the code easily?
Does it use meaningful names and whitespace?
Is there duplicated code?
Can you provide another layer of abstraction?
Is each function and module necessary?
Is each function or module too long?
Is the code efficient?
Are there loops or other steps we can vectorize?
Can we use better data structures to optimize any steps?
Can we shorten the number of calculations needed for any steps?
Can we use generators or multiprocessing to optimize any steps?
Is documentation effective?
Are in-line comments concise and meaningful?
Is there complex code that's missing documentation?
Do function use effective docstrings?
Is the necessary project documentation provided?
Is the code well tested?
Does the code high test coverage?
Do tests check for interesting cases?
Are the tests readable?
Can the tests be made more efficient?
Is the logging effective?
Are log messages clear, concise, and professional?
Do they include all relevant and useful information?
Do they use the appropriate logging level?

