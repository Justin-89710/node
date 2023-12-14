import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import PasswordGenerator from 'passwordgeneratorvanjustin';

const app = express();
const port = 3000;

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the public folder to serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.get('/', (req, res) => {
  //if there is a problem with the root give an error
  res.sendFile('index.html', { root: __dirname + '/public' }, (err) => {
    if (err !== undefined) {
      console.log(err);
      res.status(404).send('404 - Not Found');
    } else {
      console.log('succesfully send to page');
    }
  });
});

app.get('/password', (req, res) => {
  const password = new PasswordGenerator();
  const generatedpassword = password.generatePassword();
  res.send(`<h1>Your password is: ${generatedpassword}</h1>
  <button onclick="window.location.reload();">Generate new password</button>`);
});

app.route('/about')
  .get((req, res) => {
    res.sendFile('about.html', { root: __dirname + '/public' }, (err) => {
      if (err !== undefined) {
        console.log(err);
        res.status(404).send('404 - Not Found');
      } else {
        console.log('succesfully send to page');
      }
    });
  })
  .post((req, res) => {
    const { formData } = req.body;
    res.send(`is your name ${formData}?
    <a href="/yes"><button>Yes</button></a>
    <a href="/no"><button>No</button></a>`);
  });

app.get('/yes', (req, res) => {
  res.send('Thank you for your answer');
});

app.get('/no', (req, res) => {
  res.send('sorry that we got it wrong please forgive us and try again! <a href="/about"><button>Try again</button></a>');
});

// Start de server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
