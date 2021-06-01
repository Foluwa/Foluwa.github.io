


# Pytorch Methods
-  .size() check sixe of tensors.
-  .rand() generate random numbers
-  view()  reshape the tensor
-  .dtype() datatype
-  .FloatTensor()

            import torch 

            random_tensor = torch.rand([4, 2])
            print(random_tensor)
            #tensor([[0.9449, 0.6247],
            [0.1689, 0.4221],
            [0.9565, 0.0504],
            [0.5897, 0.9584]])

            random_tensor.view([2, 4])
            #tensor([[0.9449, 0.6247, 0.1689, 0.4221],
            [0.9565, 0.0504, 0.5897, 0.9584]])