#THIS IS THE ENTRY POINT FOR THE APP
from flask import Flask, render_template,jsonify,request
import requests
import config
from modules import IRConnector
from models.sentiment import SentimentAnalyzer
from flask_cors import CORS
from topicmodelling import TopicModeller
from collections import defaultdict

app = Flask(__name__)
CORS(app)
ir_connector = IRConnector.IRConnector(config.IR_HOST,config.IR_PORT,config.TWEETS_CORE)


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


@app.route("/api/fetch", methods = ["POST"])
def fetch_documents():

    query = request.form["q"]
    response = ir_connector.fetch_documents(query)

    tweets = list(filter(lambda x: "text_en" in x, response["response"]["docs"]))

    #Perform topic modelling on poi_tweets
    lda_graphs = perform_topic_analysis_by_country(tweets)

    #Perform sentiment analysis on replies
    reply_tweets = list(filter(lambda x: "reply_text" in x, tweets))
    sentiment_analyzer = SentimentAnalyzer(reply_tweets)

    sentiment_plot = sentiment_analyzer.get_sentiment_plot()
    top10_plot = sentiment_analyzer.get_top10_word_plot()

    return jsonify(result = response, sentiment_plot = sentiment_plot, top10_plot = top10_plot, lda_graphs = lda_graphs)

@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host=config.HOST_NAME, port= config.PORT, debug=config.PORT)