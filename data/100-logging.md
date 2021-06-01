https://courses.packtpub.com/courses/take/python/texts/8944235-logging
https://docs.python.org/3/howto/logging-cookbook.html

# Logging

Setting up an application or a library to log is not just good practice; it is a key task of a responsible developer. It is as important as writing documentation or tests. Many people consider logging the "runtime documentation"; the same way developers read the documentation when interacting with the DevOps source code, and other developers will use the log traces when the application is running.

Logging is the best way to let the users of the running application know which state the process is in, and how it is processing its work. It can also be used for auditing or troubleshooting client issues. There is nothing more frustrating than trying to figure out how your application behaved last week and having no information at all about what happened when it faced an issue.

You should also be careful about what information we log. Many companies will require users to never log information such as credit cards or any sensitive user data. Whilst it is possible to conceal such data after it is logged, it is better to be mindful when we log it.

You might wonder what is wrong with just using print statements, but when you start to write large-scale applications or libraries, you realize that just using print does nothing to instrument an application. By using the logging module, you also get the following:


#### Multithreading support
#### Categorization through multiple levels of logging
#### Separation of concerns between instrumentation and configuration
#### Flexibility and configurability

The main class you interact with when using the logging library is logger. can be used to emit logs in any category. You usually create loggers by getting them through the logging.getLogger(<logger name>) factory method.
- debug
- info
- warning
- error
- fatal

debug: Fine-grained messages that are helpful for debugging and troubleshooting applications, usually enabled in development. As an example, a web server will log the input payload when receiving a request at this level.

info: Coarse-grained informational messages that highlight the progress of an application. As an example, a web server will emit the requests being handled at this level without details of the data being received.

warning: Messages that inform the user of a potentially harmful situation in the application or library. In our example of a web server, this will happen if you fail to decode an input JSON payload because it is corrupted. Note that while it might feel like an error and it might be for the whole system, if you own the frontend as well, the issue is not in the application handling the request; it is in the process sending it. Therefore, a warning might help notify the user of such an issue, but it is not an error. The error should be reported to the client as an error response, and the client should handle it as appropriate.

error: Used for situations where an error has taken place, but the application can continue to function properly. Logging an error usually means there is an action that needs to be carried out by a developer in the source code that logged it. Logging errors commonly happen when you capture an exception, and you have no way of handling it effectively. It is quite common to set up alerts in connection with errors to inform the DevOps or developer that an error situation took place. In our web server application, this might happen if you fail to encode a response or an exception is raised that was not expected when handling the request.

fatal: Fatal logs indicate that there has been an error situation that compromises the current stability of the program, and, quite often, the process is restarted after a fatal message is logged. A fatal log means that the application needs an operator to take action urgently, compared to an error that a developer is expected to handle. A common situation is when the connection to a database is lost, or any other resource that is key for the application is no longer reachable.




# Explanation
Loggers have a hierarchy of names split by a dot. For example, if you ask for a logger named my.logger, you are creating a logger that is a child of my, which is a child of the root logger. All top-level loggers "inherit" from the root logger.

You can get the root logger by calling getLogger without arguments or by logging directly with the logging module. A common practice is to use __name__ as the logger module. This makes your logging hierarchy follow your source code hierarchy. Unless you have a strong reason not to do that, use __name__ when developing libraries and applications.