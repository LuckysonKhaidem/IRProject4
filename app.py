#THIS IS THE ENTRY POINT FOR THE APP
from flask import Flask, render_template,jsonify,request
import requests
import config

app = Flask(__name__)

@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host=config.HOST_NAME, port= config.PORT, debug=config.PORT)