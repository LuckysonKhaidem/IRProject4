#THIS IS THE ENTRY POINT FOR THE APP
from flask import Flask, render_template,jsonify,request
import requests
import config
from modules import IRConnector
from models.sentiment import SentimentAnalyzer
from flask_cors import CORS
from topicmodelling import TopicModeller
from collections import defaultdict
from models.tweet_vol import VolumeCalc
import warnings
from collections import defaultdict
import nltk
from nltk.corpus import stopwords


app = Flask(__name__)
CORS(app)
ir_connector = IRConnector.IRConnector(config.IR_HOST,config.IR_PORT,config.TWEETS_CORE,config.NEWS_CORE)
stop_words = stopwords.words('english')

def perform_topic_analysis_by_country(tweets):
    tweets_by_country = defaultdict(list)
    lda_graphs = {}
    for tweet in tweets:
        tweets_by_country[tweet["country"]].append(tweet)
    
    for country in tweets_by_country.keys():
        topic_modeller = TopicModeller(tweets_by_country[country])
        lda_graph = topic_modeller.lda_graph()
        if lda_graph != None:
            lda_graphs[country] = lda_graph

    return lda_graphs

def remove_duplicate_news(news):
    fresh_news = []
    scanned = defaultdict(bool)
    for new in news:
        try:
            if scanned[new["title"]] == False:
                fresh_news.append(new)
                scanned[new["title"]] = True
        except Exception as e:
            print(e)
    return fresh_news

def remove_stop_words(query):
    global stop_words
    query_tokens = query.split()
    query_tokens = list(filter(lambda x: x.lower() not in stop_words, query_tokens))
    print(query_tokens)
    return " ".join(query_tokens)

def filter_on_news(query, news):
    filtered_news = []
    for article in news:
        if "title" in article and query.lower() in article["title"].lower():
            filtered_news.append(article)
        elif "text" in article and query.lower() in article["text"].lower():
            filtered_news.append(article)
        elif "summary" in article and query.lower() in article["summary"].lower():
            filtered_news.append(article)
    return filtered_news

@app.route("/api/fetch", methods = ["POST"])
def fetch_documents():
    query = request.form["q"]
    response = ir_connector.fetch_documents(query)

    news_response = ir_connector.fetch_news(remove_stop_words(query))

    news_response["response"]["docs"]  = remove_duplicate_news(news_response["response"]["docs"])

    tweets = list(filter(lambda x: "text_en" in x, response["response"]["docs"]))

    #Perform topic modelling on poi_tweets
    lda_graphs = perform_topic_analysis_by_country(tweets)

    #Perform sentiment analysis on replies
    reply_tweets = list(filter(lambda x: "reply_text" in x, tweets))
    sentiment_analyzer = SentimentAnalyzer(reply_tweets)

    sentiment_plot = sentiment_analyzer.get_sentiment_plot()
    top10_plot = sentiment_analyzer.get_top10_word_plot()

    #Calculate volume
    volume_calculator = VolumeCalc(response["response"]["docs"])
    poi_volume = volume_calculator.poi_vol()
    reply_volume = volume_calculator.reply_vol()

    return jsonify(
                   result = response, 
                   sentiment_plot = sentiment_plot, 
                   top10_plot = top10_plot, 
                   lda_graphs = lda_graphs, 
                   poi_volume = poi_volume, 
                   reply_volume = reply_volume,
                   news_result = news_response
                   )

@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host=config.HOST_NAME, port= config.PORT, debug=config.PORT)