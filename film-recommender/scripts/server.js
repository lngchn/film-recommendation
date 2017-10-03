const express = require('express');
const app = express();
const path = require('path');

//port
app.set( 'port', process.env.PORT || 3001 );

app.get('/', function (req, res) {
  res.send('Hello World!')
}) 

app.listen( app.get('port'), function () {
    console.log('Server running at http://localhost:%s', app.get('port'));
});

/*
app.use( express.static(
    path.join(__dirname, '../', 'public'),
    {
        //index
        extensions:['html']
    })
);

app.get( '/*', (req, res) => {
    res.sendFile( path.join(__dirname, '../', 'public', '200.html') );
});
*/