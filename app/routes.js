exports.index = (req, res) => {
    res.send("Hello");
};

exports.text = (req, res) => {
    console.log(req.body);
};
