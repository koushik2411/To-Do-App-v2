let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
}

function handleClick() {
    playClickSound();
    vibrateClick();
    addTask();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text !=="") {
        tasks.push({ text, done:false });
        saveTasks();
        renderTasks();
        input.value = "";
    }
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task,index) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        const span = document.createElement("span");
        span.textContent = task.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "✅";
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tsks", JSON.stringify(tasks));
}

function playClickSound () {
    const click = document.getElementById("clickSound");
    click.currentTime = 0;
    click.play();
}

function vibrateClick() {
    if (navigator.vibrate) navigator.vibrate(100);
}

document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter")handleClick();
});