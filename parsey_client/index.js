var grpc = require('grpc');

var protoDescriptor = grpc.load({root: __dirname+'/api', file:'cali/nlp/parsey_api.proto'});

var service = new protoDescriptor.cali.nlp.ParseyService("127.0.0.1:9001", grpc.credentials.createInsecure());

service.parse(["This is the first sentence", "I love this sentence"], function(err, response) {
	console.log(JSON.stringify(response,null,'  '));
});

