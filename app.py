from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "FART BALLs"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=25565, debug=True)
