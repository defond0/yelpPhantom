exports.index = function(req, res, next) {
  var tableContent='';
  var settings = YPSettings;
  var config = settings.config;
  var yelpConfig = config.yelp;
  var yelp = require('yelp').createClient({
	consumer_key: yelpConfig.consumer_key,
	consumer_secret: yelpConfig.consumer_secret,
	token:yelpConfig.token,
	token_secret:yelpConfig.token_secret
  });
  qs={
	 location: 'Berkeley'	
  };
  yelp.search(qs, function(error,data){
		res.render('index', { title: 'Yelp Businesses', rows:data.businesses});
  });
};