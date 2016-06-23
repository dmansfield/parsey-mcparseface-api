var grpc = require('grpc');

var protoDescriptor = grpc.load({root: __dirname+'/api', file:'cali/nlp/parsey_api.proto'});

var service = new protoDescriptor.cali.nlp.ParseyService("172.17.0.2:9000", grpc.credentials.createInsecure());

var s = 0;

function ask() {
    service.parse(["This is the first sentence", "I love this sentence"], function(err, response) {
	console.log(JSON.stringify(response,null,'  '));
	console.log(s);
	if (++s < 1) {
	    ask();
	}
    });
}

ask();
//ask();


