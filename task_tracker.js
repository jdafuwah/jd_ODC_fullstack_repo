let tasks = [
  {tasks: "Teach", completed: false},
  {tasks: "Do my assignment", completed: false},
]

console.log("before")
console.log("TASKS: ",tasks)

function addTask(newTask){
    tasks.push(newTask)

}

console.log("after")
addTask({tasks: "Go to the gym", completed: false});

console.log("TASKS: ",tasks)


