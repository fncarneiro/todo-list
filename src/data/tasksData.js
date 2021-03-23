

const objNote = { title: 'title', text: 'text' }
const objTask = {
    category: 'Work',
    notes: [objNote]
};

export const taskData = [objTask];

export function insertTask(category, title, text) {
    if (category !== undefined) {
        const objNote = { title: title, text: text }
        const objTask = {
            category: category,
            notes: [objNote]
        };

        const indexCategory = taskData.findIndex(task => task.category === category)

        if (indexCategory >= 0) {
            taskData[indexCategory].notes.push(objNote);
        } else {
            taskData.push(objTask);
        }
    }
    return taskData;
}

export function updateTask(index, category, title, text) {
    const indexCategory = taskData.findIndex(task => task.category === category)
    if (indexCategory >= 0) {
        taskData[indexCategory].notes[index].title = title;
        taskData[indexCategory].notes[index].text = text;
    }

}

export function deleteTask(category, index) {
    const indexCategory = taskData.findIndex(task => task.category === category)
    if (indexCategory >= 0) { taskData[indexCategory].splice(index, 1) }

}


