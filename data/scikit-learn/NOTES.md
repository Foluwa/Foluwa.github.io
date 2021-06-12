having redundant (or highly correlated) columns can be a problem for machine learning algorithms.
 
 in a machine-learning setting, a model automatically creates the "rules" from the data in order to make predictions on new unseen data.

Note that machine learning is really interesting when creating rules by hand is not straightforward, for example because we are in high dimension (many features) or because there are no simple and obvious rules that separate the two classes as in the top-right region of the previous plot.



## The scikit-learn API: .fit(X, y)/.predict(X)/.score(X, y);

- The fit method is called to train the model from the input (features) and target data.
  [what is input (features) and target data?]

  


  _________________________________
  Since data are stored in a pandas dataframe, a dataframe is a type of structured data composed of two dimensions. This type of data is also referred as tabular data.

  Each row in the table represents a sample also called "record", "instance", or "observation"

  Each column is called a feature they represents a type of information that has been collected . In the field of machine learning and descriptive statistics, commonly used equivalent terms are "variable", "attribute", or "covariate".

  include diagram for model.fit[https://mooc-scikit-1.saclay.inria.fr/jhub/user/a91e9be622facec0ef95f455f7a3983c/notebooks/figures/api_diagram-predictor.fit.svg]

  The method fit is composed of two elements: (i) a learning algorithm and (ii) some model states. The learning algorithm takes the training data and training target as input and sets the model states. These model states will be used later to either predict (for classifiers and regressors) or transform data (for transformers).
  In scikit-learn documentation, data is commonly named X and target is commonly called y.

_____________________________

To predict, a model uses a prediction function that will use the input data together with the model states. As for the learning algorithm and the model states, the prediction function is specific for each type of model.

When building a machine learning model, it is important to evaluate the trained model on data that was not used to fit it, as generalization is more than memorization (meaning we want a rule that generalizes to new data, without comparing to data we memorized). It is harder to conclude on never-seen instances than on already seen ones.

Correct evaluation is easily done by leaving out a subset of the data when training the model and using it afterwards for model evaluation. The data used to fit a model is called training data while the data used to assess a model is called testing data.

We can load more data, which was actually left-out from the original data set.