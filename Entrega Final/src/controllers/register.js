

function getSignup(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
}
function getFailsignup(req, res) {
    res.render('signup-error', {});
}
function postSignup(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

module.exports={
    getSignup,
    getFailsignup,
    postSignup
}