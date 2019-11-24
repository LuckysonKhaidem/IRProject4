#THIS IS THE ENTRY POINT FOR THE APP
from flask import Flask, render_template,jsonify,request
import requests
import config
from modules import IRConnector
from models.sentiment import SentimentAnalyzer
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
ir_connector = IRConnector.IRConnector(config.IR_HOST,config.IR_PORT,config.TWEETS_CORE)

@app.route("/api/fetch", methods = ["POST"])
def fetch_documents():
    query = request.form["q"]
    print(query)
    response = ir_connector.fetch_documents(query)
    sentiment_analyzer = SentimentAnalyzer(response["response"]["docs"])
    sentiment_plot = sentiment_analyzer.get_sentiment_plot()
    top10_plot = sentiment_analyzer.get_top10_word_plot()
    return jsonify(result = response, sentiment_plot = sentiment_plot, top10_plot = top10_plot)

@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host=config.HOST_NAME, port= config.PORT, debug=config.PORT)