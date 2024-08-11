const titulo = document.querySelector("#title");
const task = document.querySelector("#task");  
const btn = document.querySelector("button"); 
const taskList = document.querySelector("ul"); 


async function add(){
    const response = await fetch("http://localhost:8080/list"); 
    const responseJson = await response.json(); 
    console.log(responseJson);

    responseJson.forEach(item => {
        const h3 = document.createElement("h3"); 
        h3.textContent = item.title; 

        const p = document.createElement("p"); 
        p.textContent = item.task; 

        const li = document.createElement("li"); 
        li.appendChild(h3);
        li.appendChild(p);

        const delet = document.createElement("span"); 
        delet.classList.add("delete-btn"); 
        delet.textContent = "excluir";

        taskList.appendChild(li); 
        taskList.appendChild(delet); // Adiciona o botão de exclusão fora do li
    });
}

if (task) {
    add();
}

btn.addEventListener("click", async(e) => {
    e.preventDefault(); 
    
    const response = await fetch("http://localhost:8080/list", {
        method:"POST", 
        headers: {"Content-type":" application/json"}, 
        body: JSON.stringify({
            title: titulo.value, 
            task: task.value
        }) 
    }); 
    const responseJson = await response.json(); 
    console.log(responseJson);

    const h3 = document.createElement("h3"); 
    h3.textContent = titulo.value; 

    const p = document.createElement("p"); 
    p.textContent = task.value; 
    
    const li = document.createElement("li"); 
    li.appendChild(h3);
    li.appendChild(p);
    
    const delet = document.createElement("span"); 
    delet.classList.add("delete-btn"); 
    delet.textContent = "excluir";

    taskList.appendChild(li); 
    taskList.appendChild(delet); // Adiciona o botão de exclusão fora do li
});

taskList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const index = Array.from(taskList.childNodes).indexOf(event.target);
        const li = taskList.childNodes[index - 1]; // Acessa o item da lista correspondente

        if (!li) {
            console.error('Item da lista não encontrado');
            return;
        }

        // Extraia os dados necessários para a solicitação
        const titleElement = li.querySelector('h3');
        const taskElement = li.querySelector('p');

        if (!titleElement || !taskElement) {
            console.error('Título ou detalhes da tarefa não encontrados');
            return;
        }

        const title = titleElement.textContent; 
        const task = taskElement.textContent; 

        try {
            // Envie a solicitação para deletar a tarefa
            const response = await fetch("http://localhost:8080/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    task: task
                })
            });

            if (response.ok) {
                li.remove(); 
                event.target.remove();
            } else {
                console.error('Erro ao deletar tarefa:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação de exclusão:', error);
        }
    }
});
