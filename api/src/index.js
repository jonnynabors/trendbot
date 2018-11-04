//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const weasel = require('weasel.js');

// define the Express app
const app = express();
// enhance your app security with Helmet
app.use(helmet());
// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
// enable all CORS requests
app.use(cors());
// log HTTP requests
app.use(morgan('combined'));
weasel.setApiKey('060713a86c4adbe17419655e7dd6026d');

app.get('/:name', (req, res) => {
    weasel.getRankingsCharacter(req.params.name, "zuljin", 'us', {}, (err, data) => {
        if(err) {
            console.log(req.params.name);
            console.log(err)
        }
        console.log(data);
        res.send(data);
    });
  });

// start server
app.listen(8081, () => {
    console.log('we running on port 8081, fam.')
});
