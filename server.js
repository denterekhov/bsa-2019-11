const express = require('express');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/indexRoutes');
const userRouter = require('./routes/userRoutes');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  res.status(404).send('Sorry, we can\'t find that!');
  next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

