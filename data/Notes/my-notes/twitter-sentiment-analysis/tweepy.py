from tweepy import OAuthHandler
from tweepy import API

# Consumer key authentication
auth = OAuthHandler(consumer_key, consumer_secret)

# Access key authentication
auth.set_access_token(access_token, access_token_secret)

# Set up the API with the authentication handler
api = API(auth)


# Collecting data on keywords
from tweepy import Stream

# Set up words to track
keywords_to_track = ['#rstats','#python' ]

# Instantiate the SListener object 
listen = SListener(api)

# Instantiate the Stream object
stream = Stream(auth, listen)

# Begin collecting data
stream.filter(track = keywords_to_track)