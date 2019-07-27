const express = require('express');
const fs = require('fs');
const router = express.Router();
const { ajv, schema } = require('../src/javascript/helpers/validate');

const validate = ajv.compile(schema);

const userListIds = (users) => JSON.parse(users).map(user => user._id);

router.get('/', (req, res) => {
  fs.readFile('./src/assets/userlist.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    };
    res.json(JSON.parse(data));
  });
});

router.get('/:id', (req, res) => {
  fs.readFile('./src/assets/userlist.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    };
    const [ chosenUser ] = JSON.parse(data).filter(user => user._id === req.params.id);
    console.log('chosenUser: ', chosenUser);
    chosenUser ? res.json(chosenUser) : res.send(`User with _id: ${req.params.id} doesn't exist`);
  });
});

router.post('/', (req, res) => {
  fs.readFile('./src/assets/userlist.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    };
    const ids = userListIds(data);

    if(ids.includes(req.body._id)) {
      res.status(409).send(`User with _id: ${req.body._id} already exists`);
    } else if (validate(req.body)) {
      const newUserList = [...JSON.parse(data), req.body];

      fs.writeFile('./src/assets/userlist.json', JSON.stringify(newUserList, null, 2), (err) => {
        if (err) console.log('File write failed:', err);
      });
      res.status(201).send(`User with _id: ${req.body._id} successfully created`);
    } else {
      res.status(400).send(ajv.errorsText(validate.errors).split(', ').join('\n'));
    }
  });
});

router.put('/:id', (req, res) => {
  fs.readFile('./src/assets/userlist.json', 'utf-8', (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    };
    const ids = userListIds(data);

    if(ids.includes(req.params.id) && req.body._id === req.params.id) {
      if(validate(req.body)) {
        const newUserList = JSON.parse(data).map(user => user._id === req.params.id ? req.body : user);

        fs.writeFile('./src/assets/userlist.json', JSON.stringify(newUserList, null, 2), (err) => {
          if (err) console.log('File write failed:', err);
        });
        res.send(`User with _id: ${req.params.id} successfully updated`);

      } else {
        res.status(400).send(ajv.errorsText(validate.errors).split(', ').join('\n'));
      }

    } else if (!ids.includes(req.params.id)) {
      res.status(400).send(`User with _id: ${req.params.id} doesn't exist`);
    } else {
      res.status(400).send('req.params.id and req.body._id don\'t match');
    }
  });
});

router.delete('/:id', (req, res) => {
  fs.readFile('./src/assets/userlist.json', 'utf-8', (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    };
    const ids = userListIds(data);
  
    if(ids.includes(req.params.id)) {
      const newUserList = JSON.parse(data).filter(user => user._id !== req.params.id);
      fs.writeFile('./src/assets/userlist.json', JSON.stringify(newUserList, null, 2), (err) => {
        if (err) console.log(err);
      });
      res.send(`User with _id: ${req.params.id} successfully removed`);
    } else {
      res.send(`User with _id: ${req.params.id} doesn't exist`);
    }
  })
});

module.exports = router;