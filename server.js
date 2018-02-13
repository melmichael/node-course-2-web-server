const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// set express view engines
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  //logger
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append log to server.log')
    }
  });
  next();
});

// uncoment for maintenance
// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// setup HTTP handler - root, return
app.get('/', (req, res) => {
  //res.send('<h1>**Hello from Express!**</h1>')
  // res.send({
  //   name: 'Mike',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'About page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  //res.send('About page.');
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});


app.listen(port, () => {
  console.log(`Servere is running on port ${port}`);
});
