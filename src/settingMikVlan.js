const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const net = require('net');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form action="/" method="post">
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
  const client = new net.Socket();
  client.connect(8728, '10.0.11.1', () => {
    client.write(`/interface vlan add name=${req.body.vlan_name} vlan-id=${req.body.vlan_id}\n`);
  });
  client.on('data', (data) => {
    res.send(`VLAN created:<br>ID: ${req.body.vlan_id}<br>Name: ${req.body.vlan_name}`);
    client.destroy();
  });
  client.on('close', () => {
    console.log('Connection closed');
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
