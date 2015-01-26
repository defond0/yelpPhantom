//http://thedigitalself.com/blog/seo-and-javascript-with-phantomjs-server-side-rendering
exports.index = function(req, res, next) {
  var tableContent='';
  var yelp = require('yelp').createClient({
	consumer_key:'mSh1xPYtd9iZU8zumUgLig',
	consumer_secret:'W9-uQLkgP1YryIdb-iobpNe_-40',
	token:'DTieNpl753_Ak1Ovn34AEyrw1ctaZB4I',
	token_secret:'0qI2_cscEfRFufU-8-Wao429Dbk'
  });
  qs={
	location: 'Berkeley'	
  };
  yelp.search(qs, function(error,data){
		res.render('index', { title: 'Yelp Businesses', rows:data.businesses});
  });
};