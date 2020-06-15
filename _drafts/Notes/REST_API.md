# REST API



REST stands for Representational State Transfer and is simply a set of architectural standards or guidelines that structure how you communicate data between your application and the rest of the world, or between different components of your application. 


We use RESTful as the adjective to describe REST APIs. All REST APIs are a type of API - but not all APIs are RESTful! 

RESTful APIs rely on HTTP to transfer information - the same protocol that web communication is based on! So when you see the http in the beginning of a URL, like http://twitter.com - your browser is using HTTP to request that website from a server. REST works in the same way!

There are a six key architectural g

### six key architectural guidelines to using REST APIs. 

 	- Client-Server Architecture

 	- Stateless
 	-  Cacheable

 	- Uniform Interface

 	-Layered System
 	-Code on Demand (Optional)



REST is only one type of API. There are other alternatives that are also good for you to know, notably SOAP APIs.

SOAP stands for Simple Object Access Protocol. Unlike REST, it is considered a protocol, not an architectural style. SOAP was the most common API before REST came along. While REST uses HTTP to communicate, SOAP can use multiple means of communication.  This adds a lot of complexity because developers have to coordinate to ensure they're communicating the same way. Additionally, SOAP can require more bandwidth, which leads to slower page load times. REST was created to resolve some of these issues by being lighter and more flexible.

SOAP is currently used more often in enterprise applications because you can add additional layers of security, data privacy, and integrity. REST can be just as secure, but it needs to be implemented instead of being built in like it is with SOAP.

Let's Recap!
Not all APIs are RESTful and REST APIs have specific architecture guidelines.

Some key advantages to REST APIs are:

Separation between client and server, which helps apps be more scalable. 

Statelessness, which makes API requests very specific and detail-driven. 

Cacheable, which lets clients save data so they don't have to constantly query servers.

Another popular API type is SOAP.



### REST API REQUEST AND RETURNS DATA

Rest uses Uniform Resource Identifiers to identify resources.


Resources can either be XML or JSON