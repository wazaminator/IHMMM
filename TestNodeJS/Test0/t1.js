console.log('Bienvenue dans Node.js !');

var instructionsNouveauVisiteur = function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end('Salut tout le monde !');
}

var http = require('http');
var server = http.createServer(instructionsNouveauVisiteur);
server.listen(8085);