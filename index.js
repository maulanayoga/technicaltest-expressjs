const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite'
// });

const sequelize = new Sequelize('TestExpress', 'yoga', 'yoga123', {
  dialect: 'mssql',
});

class Data extends Model {}
Data.init({
  userId: {
    type: DataTypes.INTEGER,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
}, {  sequelize, 
      modelName: 'data',
      timestamps: false,
  });

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/data', async (req, res) => {
  const datas = await Data.findAll();
  res.json(datas);
});

app.get('/data/:id', async (req, res) => {
  const data = await Data.findByPk(req.params.id);
  res.json(data);
});

app.post('/data', async (req, res) => {
  const data = await Data.create(req.body);
  res.json(data);
});

app.put('/data/:id', async (req, res) => {
  const data = await Data.findByPk(req.params.id);
  if (data) {
    await data.update(req.body);
    res.json(data);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

app.delete('/data/:id', async (req, res) => {
  const data = await Data.findByPk(req.params.id);
  if (data) {
    await data.destroy();
    res.json({ message: 'data deleted' });
  } else {
    res.status(404).json({ message: 'data not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});