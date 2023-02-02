const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Client = require('ssh2').Client;
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn = new Client();
conn.on('ready', () => {
  console.log('Client connected');
});
conn.on('error', (error) => {
  console.log(error);
});
conn.connect({
  host: '10.0.11.1',
  port: 22,
  username: 'admin',
  password: 'tanvientin012020'
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form action="/" method="post">
          <label>VLAN ID:</label>
          <input type="text" name="vlan_id"><br><br>
          <label>VLAN Name:</label>
          <input type="text" name="vlan_name"><br><br>
          <label>Bridge Interface:</label>
          <input type="text" name="bridge_interface"><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  conn.exec(`/interface vlan add name=${req.body.vlan_name} vlan-id=${req.body.vlan_id} interface=${req.body.bridge_interface}`, (error, stream) => {
    if (error) {
      res.send(error);
    } else {
      res.send(`VLAN created:<br>ID: ${req.body.vlan_id}<br>Name: ${req.body.vlan_name}<br>Bridge Interface: ${req.body.bridge_interface}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
