import requests
from urllib.parse import urlencode
import json
#This class interfaces with the IR backend
class IRConnector:
    def __init__(self, hostname,port, core, news_core):
        self.hostname = hostname
        self.port = port
        self.core = core
        self.news_core = news_core

    def fetch_documents(self, query):
        q = urlencode({"q":query})
        qf = urlencode({"qf":"tweet_text text_pt text_en text_hi"})
        api_endpoint = 'http://{}:{}/solr/{}/select?defType=edismax&{}&{}&wt=json&indent=true&rows=100'.format(self.hostname,self.port,self.core,q,qf)
        response = requests.get(api_endpoint)
        return response.json()
    
    def fetch_news(self,query):
        q = urlencode({"q":query})
        qf = urlencode({"qf":"title text summary"})
        api_endpoint = 'http://{}:{}/solr/{}/select?defType=edismax&{}&{}&wt=json&indent=true&rows=100'.format(self.hostname,self.port,self.news_core,q,qf)
        response = requests.get(api_endpoint)
        return response.json()