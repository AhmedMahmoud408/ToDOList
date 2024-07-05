const apiKey ="6688392a60a208ee1fdc348c" ; 
const addTask = document.querySelector("#addTask");
const inPut = document.querySelector("input");
let todos=[];


async function addToDo() {
   let res= await fetch("https://todos.routemisr.com/api/v1/todos" , {
        method:"POST" ,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: inPut.value,
            apiKey
        })
    })
    let finalRes = await res.json();
    inPut.value="";
    getAllToDos();
    console.log(finalRes);
}
async function getAllToDos(){
    let response = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`);
    let data = await response.json();
    todos=data.todos;
    display();
}


function display(){
    let cartona = ``;
    for (let i = 0; i < todos.length; i++) {
        let index = i;
        cartona+=`  <tr>
            <th scope="row"class=" ${todos[i].completed ? 'bg-success text-white': ''} ">${index+1}</th>
            <td class=" ${todos[i].completed ? 'bg-success text-white': ''} ">${todos[i].title}</td>
            <td class=" ${todos[i].completed ? 'bg-success text-white': ''} "><button onclick="MarkAsCompleted('${todos[i]._id}')" class="${todos[i].completed ? 'd-none': ''} btn"><input  type="checkbox" name="completed" id="completed" ></button></td>
            <td class=" ${todos[i].completed ? 'bg-success text-white': ''} "><button onclick="deleteToDos('${todos[i]._id}')" class="btn btn-danger"><i class="fa-regular fa-trash-can "></i></button></td>
          </tr>`
          
    }
    
    document.querySelector("#todos").innerHTML= cartona;
}
async function MarkAsCompleted(id) {
   
    let mark = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            todoId: id
        })
    }
)
getAllToDos();
}
async function deleteToDos(id) {
   
    let mark = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            todoId: id
        })
    }
)
getAllToDos();
}
getAllToDos();
addTask.addEventListener("click",addToDo)
