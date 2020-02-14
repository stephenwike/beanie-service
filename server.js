const express = require("express");
const body_parser = require("body-parser");
const app = express();

var path = __dirname + '/views/';
var port = 8080;

var cors = function (req, res, next) {
    var whitelist = [
        'http://localhost:4200',
        'http://localhost:35791',
        'http://fireshellstudio.com:4200',
        'http://fireshellstudio.com:35791',
        'http://fireshellstudio.com:57913',
        'http://fireshellstudio.com:4200',
        'http://fireshellstudio.com',
        'http://fireshellstudio.com:80',
        "http://fireshellstudio.com:2648"
    ];
    var origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
};

app.use(express.static(path));
app.use(body_parser.json()); // support json encoded bodies
app.use(cors);

app.get('/api/gameservice', function (req, res) {
    var passcode = req.body.passcode;
    // TODO: Fetch the game information by passcode
    // FOR DEBUGGING ONLY-------------------------------
    console.log(passcode);
    switch (passcode) {
        case "1234": {
            return { game: "beanie" };
        }
        case "4321": {
            return { game: "catan" };
        }
        default: {
            return { game: "catan" };
        }
    }
    ;
    // FOR DEBUGGING ONLY-------------------------------
});

// --------------------------------------------------------------------------------------
// GLOOMHAVEN STUFF --- TODO: Move to a gloomhaven service...............................
// --------------------------------------------------------------------------------------

const gloomhaveServiceLib = require('./game-central-library/board-games/');
const gloomhaveService = new gloomhaveServiceLib.gloomhaveService();

app.get('/gloomhaven/gamedata', function(req, res) {
    res.send()
});

app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});
