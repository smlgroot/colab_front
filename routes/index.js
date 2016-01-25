
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('req');
  res.render('index', { title: 'Express' });
};
exports.modals = function(req, res){
  console.log('req');
  res.render('modals', { title: 'Express' });
};
