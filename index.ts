const btnSubmit = document.getElementById("btnSubmit") as HTMLButtonElement


let tasks:Task[] = []

interface Task{
    name: string
    description: string
    completed: boolean
}

// Função executada quando a página carrega para restaurar as tasks salvas
document.addEventListener("DOMContentLoaded", function() {
    const storedTasks = localStorage.getItem("tasks");
  
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);  // Converte o JSON armazenado de volta para um array de objetos
      buildTask();  // Renderiza as tasks na tela
    }
  });


function capturaTask(ev:Event){  // PRIMEIRO A TAREFA IRÁ SER TRATADA E ANALISADA
    ev.preventDefault()
    const taskInput = document.getElementById("taskInput") as HTMLInputElement
    const taskDescription = document.getElementById("descriptionInput") as HTMLInputElement

    const task: Task = {
        name: taskInput.value,
        description: taskDescription.value,
        completed: false
    }
    
    tasks.push(task)

    taskInput.value = ''
    taskDescription.value = ''
    
    localStorage.setItem("tasks", JSON.stringify(tasks))
    console.log(localStorage)
    
    buildTask()




}


function buildTask(){
    const containerTasks = document.getElementById("containerTasks") as HTMLDivElement
    
    // Limpa o container antes de reconstruir as tarefas
    containerTasks.innerHTML = ''; 

    if(localStorage.length === 0){
        console.log("Nenhuma atividade inserida")
        return
    }

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
    taskElement.innerHTML = `
      <div class="flex flex-col items-start border rounded-md mb-2">
        <div class=" px-4 py-4 w-full">
          <h2 class="text-xl font-bold">${task.name}</h2>
          <p class="text-sm max-w-80">${task.description}</p>
           <input type="checkbox" id="task-${index}" class="mr-2"> <!-- Checkbox -->
        </div>
      </div>
    `
 // Adiciona o evento de exclusão ao checkbox
 const checkbox = taskElement.querySelector(`#task-${index}`) as HTMLInputElement;
 checkbox.addEventListener("change", () => removeTask(index));

    containerTasks.appendChild(taskElement)

    })
}


// Função para remover a task
function removeTask(index: number) {
  tasks.splice(index, 1); // Remove a tarefa do array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Atualiza o localStorage
  buildTask(); // Reconstrói a lista de tasks
}


btnSubmit.addEventListener("click", capturaTask)


