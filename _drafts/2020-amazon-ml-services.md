BlogPost - Amazon ML Services



AWS DeepLens: deep learning and computer vision (https://aws.amazon.com/deeplens/)


AWS DeepRacer(https://aws.amazon.com/deepracer/) and the AWS DeepRacer League(https://aws.amazon.com/deepracer/league/): reinforcement learning


AWS ML Training and Certification: Curriculum used to train Amazon developers (https://aws.amazon.com/deepcomposer/)


BlogPost - What are GANs?

BlogPost - Neural Network Loss Functions 
	Convergence occurs when the loss function stabilizes.


Challenges with GANs
	- Clean datasets are hard to obtain
	- Not all melodies sound good in all genres
	- Convergence in GAN is tricky – it can be fleeting rather than being a stable state
	- Complexity in defining meaningful quantitive metrics to measure the quality of music created

The generator network used in AWS DeepComposer is adapted from the U-Net architecture, a popular convolutional neural network that is used extensively in the computer vision domain.



Typically when training any sort of model, it is a standard practice to monitor the value of the loss function throughout the duration of the training. The discriminator loss has been found to correlate well with sample quality. You should expect the discriminator loss to converge to zero and the generator loss to converge to some number which need not be zero. When the loss function plateaus, it is an indicator that the model is no longer learning. At this point, you can stop training the model. You can view these loss function graphs in the AWS DeepComposer console.