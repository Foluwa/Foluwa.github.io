# Beginner Intro to Numpy

### What exactly is Numpy?

 Numpy is a multidimentional array library,

### Why use numpy over list?
- Numpy is faster than list because numpy uses fixed type.

- When iterating through each item in a numpy array, we dont have to use type checking each time

- Numpy utilizes computer memory

- Numpy effectively utilize cache

### Getting Started 

    a = np.array([1,3,5])
    b = np.array([1,2,3])

    >> a*b = np.array([1,6,15])



### Applications of Numpy
- MATLAB replacement
- Plotting (Matplotlib)
- Backend (Pandas, Connect4)
- You can store images with Numpy
- Machine Learning


# Coding
    import numpy as np


### TIPS
    Dimension is ...
    # Get Dimension
    > .ndim

#####
    A shape is ....

    # Get Shape
    > .shape

#####
    Data type

    > .dtype 

    To specify type of data to store do 
    a = np.array([1,2,3], dtype='int16')

#####
    A size is ....

    # Get Size
    > .itemsize

#####
    # To Get number of bytes
    > .nbytes

###################


#####
    # Accessing specific element
    a = np.array([[1,2,3,4,5,6,7],[8,9,10,11,12,13,14]])
    print(a)

    Output>>> [[ 1  2  3  4  5  6  7]
               [ 8  9 10 11 12 13 14]]

    # GET SPECIFIC ELEMENT [r, c]
    a[1, 5]

    Output>>> 13

