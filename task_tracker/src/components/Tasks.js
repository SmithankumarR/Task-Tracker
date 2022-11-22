import React from 'react';
import Task from './Task';
// const tasks = [
// {
//     id: 1,
//     text: 'Doctors Appointment',
//     day: 'Feb 5th at 2.30pm',
//     reminder: true
// },
// {
//     id: 2,
//     text: 'Meetings at school',
//     day: 'Feb 7th at 10.30pm',
//     reminder: true
// },
// {
//     id: 3,
//     text: 'Food shopping ',
//     day: 'Feb 8th at 4.30pm',
//     reminder: true
// }
// ]

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
            {
                tasks.map((task, index) => (
                    <Task key={index} task={task} onToggle={onToggle} onDelete={() => onDelete(task.id)} />
                ))
            }
        </>
    )
}

export default Tasks