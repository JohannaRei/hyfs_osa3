const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo-API</h1>');
});

app.get('/persons', (req, res) => {
  res.json(persons);
});

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 0;
  return maxId + 1;
}

app.post('/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person);

  res.json(person);
});

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const port = 3001;
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);