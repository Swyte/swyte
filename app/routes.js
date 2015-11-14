exports.index = (req, res) => {
    res.render('index', {title: 'Meow', message: 'Meow again'});
};

exports.text = (req, res) => {
    console.log(req.body);
};
