
function getLogout(req, res) {
    req.logout();
    res.sendFile(__dirname + '/views/index.html');
}

module.exports={
    getLogout
}