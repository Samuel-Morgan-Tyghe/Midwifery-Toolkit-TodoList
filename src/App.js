import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";
import React from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [name, setName] = useLocalStorage("tasks", () => "");

  const stickyValue = window.localStorage.getItem("tasks");

  const [tasks, setTasks] = useState(
    stickyValue
      ? name
      : [
          {
            id: 1,
            text: "Have A Bath",
            day: "Tommorow Evening",
            reminder: true,
          },
          {
            id: 2,
            text: "Go for a Walk",
            day: "Weekend",
            reminder: true,
          },
        ]
  );

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  //Add Task

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    setName([...tasks, newTask]);
    console.log(
      "🚀 ~ file: App.js ~ line 76 ~ addTask ~ (tasks.push(newTask))",
      [...tasks, newTask]
    );
  };

  //delete task

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setName(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
    setName(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        title="Midwife ToolKit"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {showAddTask && <AddTask onAdd={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
}

export default App;
