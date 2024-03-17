const Task = require("../models/Task");

const asyncWrapper = require("../middleware/async");

const {createCustomError} = require("../errors/custom-error")
// console.log(createCustomError("msg",201))
const getAllTasks = asyncWrapper( async (req, res) => {

    // res.send("get all tasks")
   
        const tasks = await Task.find({})
        res.status(201).json({ tasks })
   
})

const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    


})
const getTask = asyncWrapper( async (req, res,next) => {
    // res.json({ id: req.params.id })
    // console.log(req.params.id) 
        const { id: TaskId } = req.params

        const task = await Task.findOne({ _id: TaskId });
        if (!task) {
            
            return next(createCustomError(`NO TASK WITH ID : ${TaskId}`,404))
            // return res.status(404).json({ msg: "NO TASK FOUND" })
        }
        res.status(201).json({ task })
   
})
const deleteTask = asyncWrapper( async (req, res) => {
  
        const { id: TaskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: TaskId });
        if (!task) {
            // return res.status(404).json({ msg: "NO TASK FOUND " + TaskId })
            return next(createCustomError(`NO TASK WITH ID : ${TaskId}`,404))
        }
        return res.status(200).json({ task })
    
})
const updateTask = asyncWrapper(async(req, res) => {
    
    const { id:taskId } = req.params;

    const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
        new:true,
        runValidators:true
    })
    if (!task) {
        // return res.status(404).json({ msg: "NO TASK FOUND " + taskId })
        return next(createCustomError(`NO TASK WITH ID : ${taskId}`,404))
    }
    return res.status(200).json({task})

   
    // res.json(req.body)
})


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };