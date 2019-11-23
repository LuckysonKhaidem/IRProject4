#THIS IS THE ENTRY POINT FOR THE APP
from flask import Flask, render_template,jsonify,request
import requests
import config
from modules import IRConnector

app = Flask(__name__)

ir_connector = IRConnector.IRConnector(config.IR_HOST,config.IR_PORT,config.TWEETS_CORE)

@app.route("/api/fetch", methods = ["POST"])
def fetch_documents():
    query = request.form["q"]
    response = ir_connector.fetch_documents(query)
    return jsonify(result = response)

@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host=config.HOST_NAME, port= config.PORT, debug=config.PORT)