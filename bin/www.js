// Set up server here for application entry
const http = require('http');
const app = require('../app'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 3000; //5432
app.set('port', port);

const server = http.createServer(app);
server.listen(port);