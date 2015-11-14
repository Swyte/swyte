exports.index = (req, res) => {
    res.render('index', {title: 'Meow', message: 'Meow again'});
};

exports.profile = (req, res) => {
	res.render('portfolio');
};

exports.text = (req, res) => {
    console.log(req.body);
};

