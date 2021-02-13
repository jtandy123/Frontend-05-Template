const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

/*
fs.stat('./sample.html', (err, stats) => {
  const request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stats.size
    }
  }, response => {
    console.log(response);
  });
  
  const file = fs.createReadStream('./sample.html');
  file.pipe(request);
  
  file.on('end', () => request.end());

// file.on('data', chunk => {
//   console.log(chunk);
//   console.log(chunk.toString());
//   request.write(chunk);
// });

// file.on('end', chunk => {
//   console.log('read finished');
//   request.end(chunk);
// });
});
*/

const request = http.request({
  hostname: '127.0.0.1',
  port: 8082,
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  }
}, response => {
  console.log(response);
});

// let file = fs.createReadStream('./sample.html');

const archive = archiver('zip', {
  zlib: {
    level: 9
  }
});

archive.directory('./sample/', false);

archive.finalize();

archive.pipe(request);
