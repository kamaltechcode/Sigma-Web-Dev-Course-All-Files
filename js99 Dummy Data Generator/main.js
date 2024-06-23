const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');//connected with mongo DB Database 
mongoose.connect('mongodb://127.0.0.1:27017/companey');//compnaey stands for DataBase Name 
const Employee = require("./models/Employee");

app.set('view engine', 'ejs');



//function is made to return a random value 

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * (arr.length - 1))
  return arr[rno]
}

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });

})
app.get('/generate', async (req, res) => {
  // clearing all the data beore seeting next 
  await Employee.deleteMany({})

  // generate random data 
  let randomName = ["Kamal", "Naval", "Hasal", "Fasal"]
  let randomLang = ["Python", "Javascript", "C++", ""]
  let randomCities = ["Bilaspur", "Moradabad", "Delhi"]




  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getRandom(randomName),
      salary: Math.floor(Math.random() * 22000),
      language: getRandom(randomLang),
      city: getRandom(randomCities),
      isManager: Math.random() > 0.5 ? true : false
    })
    console.log(e)
  }
  res.render('index', { foo: 'FOO' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})