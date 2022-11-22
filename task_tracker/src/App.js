import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer"
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import About from './components/About';

const App = () => {
    const [showAddTask, setShowAddTask] = useState(true);
    const [tasks, setTasks] = useState([])

    // used to deal with side effects when the page loads
    useEffect(() => {
        const getTasks = async () => {
            const taskFromServer = await fetchTasks();
            setTasks(taskFromServer)
        }
        getTasks();
    }, [])

    // fetchTasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')

        const data = await res.json()
        console.log(data)
        return data;
    }


    // fetchTask 
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id} `)

        const data = await res.json()
        console.log(data)
        return data;
    }


    // Add Task
    const addTask = async (task) => {
        // console.log(task)
        // const id = Math.floor(Math.random() * 10000) + 1
        // console.log(id);
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])
    }
    // delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }
    // Toggle remainder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const upTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(upTask)
        })
        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                {showAddTask && <AddTask onAdd={addTask} />}
                <Route path='/' exact render={(props) => {
                    <>
                        {
                            tasks.length > 0 ?
                                <Tasks tasks={tasks}
                                    onToggle={toggleReminder}
                                    onDelete={deleteTask} /> : 'No Tasks To Show'
                        }


                    </>

                }}></Route>
                <Route path="/about" component={About}></Route>
                <Footer />
            </div>
        </Router>
    )
}
export default App;