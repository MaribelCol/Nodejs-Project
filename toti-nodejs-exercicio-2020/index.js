const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)


// We need to parse JSON coming from requests
app.use(express.json())

// List tasks
//app.get('/tasks', (req, res) => {
//res.json({ action: 'Listing tasks' })
//})

// view all 
app.get('/tasks', async (req, res) => {
const allTasks = await sequelize.query('SELECT * FROM Tasks')
res.json({ allTasks })
})


// Create task feito
app.post('/tasks', async (req, res) => {
const body = req.body 
const task = await tasks.create(body)
res.json(task)
})

// Show task
//app.get('/tasks/:id', (req, res) => {
//const taskId = req.params.id
//res.send({ action: 'Showing task', taskId: taskId })
//})

// Show task by id feito
app.get('/tasks/:id', async (req, res) => {
const taskId = req.params.id
const task = await tasks.findByPk(taskId)
console.log(task)
res.send(task)
})

// Update task
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const {description}= req.body 

  await tasks.update(
    {description},
    {where: { id: taskId }}
  )
  let taskAtualizado = await tasks.findByPk(taskId);
  res.json(taskAtualizado);
})

// Delete task
app.delete('/tasks/:id', async(req, res) => {
  const taskId = req.params.id
  await tasks.destroy ({ where: {id:taskId}})

  res.send({ action: 'Delete', taskId: taskId })
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})