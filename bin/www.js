// Set up server here for application entry
const http = require('http');
const app = require('../app');

const port = parseInt(process.env.PORT, 10) || 5432;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);