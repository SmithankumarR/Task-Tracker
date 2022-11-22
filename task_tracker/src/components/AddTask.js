import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState('false');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert('please add a task')
            return;
        }
        onAdd({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)
    }
    return (
        <form action="" className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input type="text" onChange={(e) => setText(e.target.value)}
                    value={text} placeholder="Add Task" />
            </div>
            <div className="form-control">
                <label htmlFor="">Day & Time</label>
                <input type="text" onChange={(e) => setDay(e.target.value)}
                    value={day} placeholder="Add Day & Time" />
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="">Set Reminder</label>
                <input type="Checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type="submit" className="btn btn-block" value="Save Task" />
        </form>
    )
}

export default AddTask