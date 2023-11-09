import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;
//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


//array for tasks
let tasks = [];


const quotesArray=[
    "let's make an impact",
    "This is your private space",
    "Run your day or your day will run you",
    "You can make magic happen",
    "Time to make your own luck",
    "Remove doubts with action",
    "What will accomplish today?",
    "You are what you do",
    "Be so good no one can ignore you",
    "The only way to do great work is to love what you do",
    "Seize the day; you've got this!",
    "Stay positive and keep going",
    "Embrace the journey, cherish each moment",
    "Dream big, work hard, achieve greatness",
    "Smile, shine, and make it yours!"
]


//formatted date
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const date = new Date();  
const currentDate = new Intl.DateTimeFormat('en-US', options).format(date);
const randomQuote = getRandomQuote();

// Function to get a random quote from the array
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
}
  

//routing
app.get("/",(req,res)=>{
    res.render("index.ejs",{cd: currentDate,data: tasks,message: randomQuote});
})

app.post("/", (req, res) => {
    const newTask = req.body.task;
    if(newTask != '' && newTask.trim()!=''){
        tasks.unshift({description: newTask, isChecked: false});
    }
    res.redirect("/");
});


// Add a route to handle task removal
app.delete("/remove-task/:task", (req, res) => {
    const taskToRemove = req.params.task;
    // Find and remove the task from the tasks array on the server
    const newArray = tasks.filter(item => item.description !== taskToRemove);
    tasks = newArray;
    res.sendStatus(204);
});

app.post("/checked",(req,res)=>{
    const task = req.body.task;
    const type = req.body.type;
    const taskIndex = tasks.findIndex(item => item.description == task); 
    if(taskIndex !== -1 && type === 'true'){
        const itemToMove = tasks.splice(taskIndex,1)[0];
        itemToMove.isChecked = true;
        tasks.push(itemToMove);
        res.sendStatus(200);
    }else if(taskIndex !== -1 && type == 'false'){
        const itemToMove = tasks.splice(taskIndex,1)[0];
        itemToMove.isChecked = false;
        tasks.unshift(itemToMove);
        res.sendStatus(200);
    }else{
        console.log("not found");
    }
})
  

// app.post("/", (req, res) => {
//     const selectedCategory = req.body.selectedOption || 'all'; // Get the selected category from the request
//     category = selectedCategory;
//     // Filter tasks based on the selected category
//     let filteredTasks;
//     if (selectedCategory === 'all') {
//         filteredTasks = tasks; // Show all tasks
//     } else if (selectedCategory === 'personal') {
//         // Filter tasks for the "Personal" category
//         filteredTasks = tasks.filter(task => task.category === 'Personal');
//     } else if (selectedCategory === 'work') {
//         // Filter tasks for the "Work" category
//         filteredTasks = tasks.filter(task => task.category === 'Work');
//     }

//     // Render the template with the filtered tasks
//     res.render("index.ejs", {
//         cd: currentDate,
//         data: filteredTasks,
//         message: randomQuote,
//         selectedCategory: selectedCategory,
//     });
// });

  




  

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

