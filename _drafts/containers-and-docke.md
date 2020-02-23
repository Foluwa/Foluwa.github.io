# Intro to Container and docker

### play-with-docker.com


Containers are process or group of process running in isolation. 
They provide standard developer to operations interface. 



Containers are just a process (or a group of processes) running in isolation, which is achieved with Linux namespaces and control groups. Linux namespaces and control groups are features that are built into the Linux kernel. Other than the Linux kernel itself, there is nothing special about containers.


Containers used a kernel feature called linux "namespaces" to provide isolated view.
- PID - process IDs
- User - user and group IDs
- UTS - hostname and domain name
- NS- mount points
- NET - Network devices, stacks, ports.
- IRC - Inter process communication

Containers vs VM
VM run on hypervisor, has a full blown OS and are very heavy and slow to start.

Con.. include OS specific files which can be trimmed down based on the functionalities of the application. They also run on a shared kernel with other containers and use linux namedspaces. They are very fast to start and light weight. Containers can be run on virtual machines.


## Docker is a tooling to manage containers
"Build once run anywhere model". Docker provide ecosystem for tooling.





Run a container
Use the Docker CLI to run your first container.

Open a terminal on your local computer and run this command:

& docker container run -t ubuntu top
You use the docker container run command to run a container with the Ubuntu image by using the top command. The -t flag allocates a pseudo-TTY, which you need for the top command to work correctly.



The docker run command first starts a docker pull to download the Ubuntu image onto your host. After it is downloaded, it will start the container. The output for the running container should look like this:



top is a Linux utility that prints the processes on a system and orders them by resource consumption. Notice that there is only a single process in this output: it is the top process itself. You don't see other processes from the host in this list because of the PID namespace isolation.

Containers use Linux namespaces to provide isolation of system resources from other containers or the host. The PID namespace provides isolation for process IDs. If you run top while inside the container, you will notice that it shows the processes within the PID namespace of the container, which is much different than what you can see if you ran top on the host.

Even though we are using the Ubuntu image, it is important to note that the container does not have its own kernel. It uses the kernel of the host and the Ubuntu image is used only to provide the file system and tools available on an Ubuntu system.

Inspect the container:

docker container exec
This command allows you to enter a running container's namespaces with a new process.

Open a new terminal. To open a new terminal connected to node1 by using Play-With-Docker.com, click Add New Instance on the left and then ssh from node2 into node1 by using the IP that is listed by node1, for example:



In the new terminal, get the ID of the running container that you just created:

docker container ls 
 


Use that container ID to run bash inside that container by using the docker container exec command. Because you are using bash and want to interact with this container from your terminal, use the -it flag to run using interactive mode while allocating a psuedo-terminal:

$ docker container exec -it b3ad2a23fab3 bash 
root@b3ad2a23fab3:/#
You just used the docker container exec command to enter the container's namespaces with the bash process. Using docker container exec with bash is a common way to inspect a Docker container.

Notice the change in the prefix of your terminal, for example,  root@b3ad2a23fab3:/. This is an indication that you are running bash inside the container.

Tip: This is not the same as using ssh to a separate host or a VM. You don't need an ssh server to connect with a bash process. Remember that containers use kernel-level features to achieve isolation and that containers run on top of the kernel. Your container is just a group of processes running in isolation on the same host, and you can use the command docker container exec to enter that isolation with the bash process. After you run the command docker container exec, the group of processes running in isolation (in other words, the container) includes top and bash.

From the same terminal, inspect the running processes:

$ ps -ef
 


You should see only the top process, bash process, and your ps process.

For comparison, exit the container and run ps -ef or top on the host. These commands will work on Linux or Mac. For Windows, you can inspect the running processes by using tasklist.

root@b3ad2a23fab3:/# exit 
exit
$ ps -ef
# Lots of processes!
PID is just one of the Linux namespaces that provides containers with isolation to system resources. Other Linux namespaces include:

MNT: Mount and unmount directories without affecting other namespaces.
NET: Containers have their own network stack.
IPC: Isolated interprocess communication mechanisms such as message queues.
User: Isolated view of users on the system.
UTC: Set hostname and domain name per container.
These namespaces provide the isolation for containers that allow them to run together securely and without conflict with other containers running on the same system.

In the next lab, you'll see different uses of containers and the benefit of isolation as you run multiple containers on the same host.

Tip: Namespaces are a feature of the Linux kernel. However, Docker allows you to run containers on Windows and Mac. The secret is that embedded in the Docker product is a Linux subsystem. Docker open-sourced this Linux subsystem to a new project: LinuxKit. Being able to run containers on many different platforms is one advantage of using the Docker tooling with containers.

In addition to running Linux containers on Windows by using a Linux subsystem, native Windows containers are now possible because of the creation of container primitives on the Windows operating system. Native Windows containers can be run on Windows 10 or Windows Server 2016 or later.

Clean up the container running the top processes:

<ctrl>-c




lato-black-webfont.woff
lato-blackitalic-webfont.woff
lato-bold-webfont.woff
lato-light-webfont.woff
lato-regular-webfont.woff
lato-thinitalic-webfont.woff




Containers are self-contained and isolated, which means you can avoid potential conflicts between containers with different system or runtime dependencies. For example, you  can deploy an app that uses Java 7 and another app that uses Java 8 on the same host. Or you can run multiple NGINX containers that all have port 80 as their default listening ports. (If you're exposing on the host by using the --publish flag, the ports selected for the host must be unique.) Isolation benefits are possible because of Linux namespaces.

Remember: You didn't have to install anything on your host (other than Docker) to run these processes! Each container includes the dependencies that it needs within the container, so you don't need to install anything on your host directly.