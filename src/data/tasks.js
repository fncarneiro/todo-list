
export default class TaskData {
    constructor() {
        this.tasks = [];
        this._subscribers = [];
    }

    register(task) {
        this._subscribers.push(task);
    }

    unregister(task) {
        this._subscribers = this._subscribers.filter(f => f !== task)
    }

    notify() {
        this._subscribers.forEach(task => {
            task(this.tasks);
        })
    }

    insertTask(category, title, text) {
        //console.log(category, title, text)
        const newTask = new task(category, title, text);  
        console.log('newTask:',newTask) 
        console.log('tasks array:',this.tasks)             
        this.tasks.push(newTask);
        this.notify();
    }

    deleteTask(index) {       
        this.tasks.splice(index, 1);
        this.notify();
    }

    updateTask(index, category, title, text) {
        this.tasks[index] = [category, title, text];        
        this.notify();
    }
}

class task {
    constructor(category, title, text) {
        this.category = category;
        this.title = title; 
        this.text = text;       
    }
}