const http = require('http');

// const fs = require('fs');

const unzipper = require('unzipper');

http.createServer((request, response) => {
  console.log(request.headers);

  // const outFile = fs.createWriteStream('../server/public/index.html');
  // request.pipe(outFile);

  request.pipe(unzipper.Extract({
    path: '../server/public/'
  }));

  request.on('end', () => {
    // outFile.end();
    response.end('Success');
  });

  // request.on('data', chunk => {
  //   outFile.write(chunk);
  // });
  // request.on('end', () => {
  //   outFile.end();
  //   response.end('Success');
  // });
}).listen(8082);
