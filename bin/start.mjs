import { app } from '../app.mjs';
import { createServer } from 'http';

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
app.set('port', port);

const server = createServer(app);

server.on('error', onError);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
