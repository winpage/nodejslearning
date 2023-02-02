const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const net = require('net');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.connect(8728, '10.0.11.1', () => {
      client.write(`/login\n`);
      console.log('authentication');
    });
    client.on('data', (data) => {
      const challenge = data.toString().trim();
      const hash = new Buffer(challenge + password, 'binary').toString('base64');
      client.write(`/login\n=name=${username}\n=response=00${hash}\n`);
      console.log('doan này');
    });
    client.on('data', (data) => {
      const result = data.toString().trim();
      if (result === '!done') {
        resolve(client);
      } else {
        reject('Login failed');
      }
    });
  });
};

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form action="/" method="post">
          <label>Username:</label>
          <input type="text" name="username"><br><br>
          <label>Password:</label>
          <input type="password" name="password"><br><br>
          <label>VLAN ID:</label>
          <input type="text" name="vlan_id"><br><br>
          <label>VLAN Name:</label>
          <input type="text" name="vlan_name"><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  authenticate(req.body.username, req.body.password)
    .then((client) => {
      console.log('Connection ok');  
      client.write(`/interface vlan add name=${req.body.vlan_name} vlan-id=${req.body.vlan_id}\n`);
      client.on('data', (data) => {
        res.send(`VLAN created:<br>ID: ${req.body.vlan_id}<br>Name: ${req.body.vlan_name}`);
        client.destroy();
      });
      client.on('close', () => {
        console.log('Connection closed');
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
