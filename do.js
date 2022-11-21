let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let closeModal = document.getElementById("modal-close");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";

    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    }
    (() => {
        add.setAttribute("data-bs-dismiss", "");
    })();
};

let data = [];
let editing = "";
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks()
};

let replaceData = () => {
    data.push({
        text: editing.text,
        date: editing.date,
        description: editing.description,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks()
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((item, index) => {
        return (tasks.innerHTML += `
      <div id=${index}>
            <span class="fw-bold">${item.text}</span>
            <span class="small text-secondary">${item.date}</span>
            <p>${item.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });

    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    editing = {
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    }
    console.log(editing)
    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();

closeModal.addEventListener('click', function(){
    if(editing != ""){
        replaceData()
        editing = ""
        resetForm()
    }
})