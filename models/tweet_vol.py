#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 30 23:18:31 2019

@author: ankitanand
"""

import os
import json

class VolumeCalc:
    def __init__(self,data):
        self.data=data
    
    def poi_vol(self):
        poi_vols={}
        tweets = list(filter(lambda x: "reply_text" not in x, self.data))
        for doc in tweets:
            name=doc['poi_name']
            tmp=poi_vols.get(name,0)
            tmp+=1
            poi_vols[name]=tmp
        return poi_vols
        
    def reply_vol(self):
        reply_vols={}
        tweets = list(filter(lambda x: "reply_text" in x, self.data))
        for doc in tweets:
            name=doc['poi_name']
            tmp=reply_vols.get(name,0)
            tmp+=1
            reply_vols[name]=tmp
        return reply_vols
    
"""data_path="/Users/ankitanand/Box/UB/Fall 2019/IR/Proj1/Cooked Replies USA/"
data=[]
for filename in os.listdir(data_path):
    with open(data_path + filename,'r') as f:
        #print(filename)
        tmp=json.load(f)
        data.extend(tmp)
#print(data)
senti=VolumeCalc(data)
p_val=senti.poi_vol()
print(p_val)
r_val=senti.reply_vol()
print(r_val)"""