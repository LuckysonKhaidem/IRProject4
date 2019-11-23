import requests
from urllib.parse import urlencode
import json
#This class interfaces with the IR backend
class IRConnector:
    def __init__(self, hostname,port, core):
        self.hostname = hostname
        self.port = port
        self.core = core

    def fetch_documents(self, query):
        q = urlencode({"q":query})
        qf = urlencode({"qf":"tweet_text text_pt text_en text_hi"})
        api_endpoint = 'http://{}:{}/solr/{}/select?defType=edismax&{}&{}&wt=json&indent=true&rows=100'.format(self.hostname,self.port,self.core,q,qf)
        response = requests.get(api_endpoint)
        return response.json()