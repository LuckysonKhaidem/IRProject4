#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Dec  1 03:49:47 2019

@author: ankitanand
"""

import os
import json
import spacy
import en_core_web_sm
import preprocessor as p
from nltk.probability import FreqDist
from pyvis.network import Network
from collections import Counter

nlp=en_core_web_sm.load()


class NamedEntityRecog():
    def __init__(self,data):
        self.data=data
        self.dct={}
        self.ner_dct={}
    
    #use if you want to
    def translate_data(self,tweets):
        subscription_key = "02b7040aea8449f78447645b79c4c88b"
        endpoint = "https://api.cognitive.microsofttranslator.com/"
        path = '/translate?api-version=3.0'
        params = '&to=en'
        constructed_url = endpoint + path + params
        headers = {
            'Ocp-Apim-Subscription-Key': subscription_key,
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }
        for i in tweets:
          if("text_hi" in i and i['text_hi']!=None):
            body=[{"text":i['text_hi']}]
            request = requests.post(constructed_url, headers=headers, json=body)
            response = request.json()
            i['text_en']=response[0]['translations'][0]['text']
          if("text_pt" in i and i['text_pt']!=None):
            body=[{"text":i['text_pt']}]
            request = requests.post(constructed_url, headers=headers, json=body)
            response = request.json()
            i['text_en']=response[0]['translations'][0]['text']
        return tweets
    
    def get_name_entity(self):
        for doc in self.data:
            p_name=doc['poi_name']
            txt=doc['text_en']
            txt=p.clean(txt)
            lst=self.dct.get(p_name,"")
            lst=lst+txt+' '
            self.dct[p_name]=lst
        for key in self.dct.keys():
            txt=self.dct[key]
            ners=nlp(txt)
            ner_lst=[(x.text,x.label_) for x in ners.ents]
            self.ner_dct[key]=ner_lst
        #print(self.ner_dct)
        
    def filter_ner(self):
        entities=['PERSON','GPE','ORG','LOC','PRODUCT','EVENT']
        for key in self.ner_dct.keys():
            lst=self.ner_dct[key]
            clnd_lst=[]
            for i in lst:
                if(i[1] in entities):
                    clnd_lst.append(i)
            self.ner_dct[key]=clnd_lst
        
        
    def get_top_entities(self):
        for key in self.ner_dct:
            lst=self.ner_dct[key]
            c= Counter(lst)
            c_sort_map=sorted(c.items(), key = lambda x: x[1], reverse = True)
            c_sort_top_map=c_sort_map[4:20]
            c_sort_list=list(map(lambda x: x[0],c_sort_top_map))
            self.ner_dct[key]=c_sort_list
    
    def make_graph(self):
        graph_data=[]
        for key in self.ner_dct.keys():
            lst=self.ner_dct[key]
            for x in lst:
                graph_data.append((key,x[0]))
        poi_net = Network(height="750px", width="100%", bgcolor="#ffffff", font_color="blue")
        poi_net.barnes_hut()
        for i in graph_data:
            src=i[0]
            dst=i[1]
            poi_net.add_node(src, label=src, title="src" ,color="black")
            poi_net.add_node(dst, label=dst, title="dst" ,color="#dd4b39")
            poi_net.add_edge(src, dst)
        #change this location
        poi_net.save_graph("/Users/ankitanand/Box/UB/Fall 2019/IR/Proj1/poi.html")
        #tmp=poi_net.show("demo.html")
        #print(tmp)
        
     #call me you motherfucker, call me if you wanna see my titties
    def call_me(self):
         self.get_name_entity()
         self.fiter_ner()
         self.get_top_entities()
         self.make_graph()
        
"""data_path="/Users/ankitanand/Box/UB/Fall 2019/IR/Proj1/test_lda/"
data=[]
for filename in os.listdir(data_path):
    with open(data_path + filename,'r') as f:
        #print(filename)
        tmp=json.load(f)
        data.extend(tmp)
#print(data)
senti=NamedEntityRecog(data)
senti_plt=senti.get_name_entity()
senti_plt=senti.filter_ner()
senti.get_top_entities()
senti.make_graph()"""