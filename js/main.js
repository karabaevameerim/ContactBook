let form = document.querySelector("form");
let inpImg = document.querySelector(".img");
let inpName = document.querySelector(".name");
let inpMail = document.querySelector(".mail");
let inpNumber = document.querySelector(".number");
let list = document.querySelector("ul")

// ? create
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    if(inpImg.value.trim() === "" || inpName.value.trim() === "" || inpMail.value.trim() === "" || inpNumber.value.trim() === ""){
        alert("Не все поля заполнены!");
        return;
    }

    let obj = {
        img: inpImg.value,
        name: inpName.value,
        mail: inpMail.value,
        number: inpNumber.value,
    };

    let data = JSON.parse(localStorage.getItem("tasks-data"));
    data.push(obj)
    localStorage.setItem("tasks-data", JSON.stringify(data));
    inpImg.value = "";
    inpName.value = "";
    inpMail.value = "";
    inpNumber.value = "";
    createTask();
});


// ? read
createTask()
function createTask(){
if(!localStorage.getItem("tasks-data")){
    localStorage.setItem("tasks-data", "[]");
}
let data = JSON.parse(localStorage.getItem("tasks-data"));
list.innerHTML = "";
data.forEach((elem, index)=>{
    list.innerHTML += `
    <li style='display:flex ; justify-content:space-around'>
    <img src = "${elem.img}" width = "50" height="50" alt = "${elem.name}" />
    <p>${elem.name}</p>
    <p>${elem.mail}</p>
    <p>${elem.number}</p>
    <button style = 'border-radius: 5px; background-color: lightgreen; width: 50px; height:30px; margin-top:9px; border: none; opacity: 0.8' id="btnDel" onclick="deleteTask(${index})">delete</button>
      <button style = 'border-radius: 5px; background-color: lightgreen; width: 50px; height:30px; margin-top:8px; border: none; opacity: 0.8' onclick="editTask(${index})">Edit</button>
    </li>
    `
});
}

// ?delete

function deleteTask(index){
let data = JSON.parse(localStorage.getItem("tasks-data"));
data.splice(index,1);
localStorage.setItem("tasks-data", JSON.stringify(data))
createTask();
}
// ? edit
let modal = document.querySelector(".modal");
let inpEditImg = document.querySelector("#img");
let inpEditName = document.querySelector("#name");
let inpEditMail = document.querySelector("#mail");
let inpEditNumber = document.querySelector("#number");
let btnSave = document.querySelector("#btn1");
let closeModal = document.querySelector("#btn2");
let x = document.querySelector(".close")

function editTask(index){
    modal.style.display = "block";
    let data = JSON.parse(localStorage.getItem("tasks-data"))
    inpEditImg.value = data[index].img;
    inpEditName.value = data[index].name;
    inpEditMail.value = data[index].mail;
    inpEditNumber.value = data[index].number;

    inpEditImg.setAttribute("id", index);
    inpEditName.setAttribute("id", index);
    inpEditMail.setAttribute("id", index);
    inpEditNumber.setAttribute("id", index);

}

closeModal.addEventListener("click", ()=>{
    modal.style.display = "none";
})
x.addEventListener("click", ()=>{
    modal.style.display = "none";
})

btnSave.addEventListener("click", ()=>{
    let id1 = inpEditImg.id;
    let id2 = inpEditName.id;
    let id3 = inpEditMail.id;
    let id4 = inpEditNumber.id;

    let data = JSON.parse(localStorage.getItem("tasks-data"));
    let newObj = {
        img: inpEditImg.value,
        name: inpEditName.value,
        mail: inpEditMail.value,
        number: inpEditNumber.value,
    };
    data.splice(id1, 1, newObj)
    data.splice(id2, 1, newObj)
    data.splice(id3, 1, newObj)
    data.splice(id4, 1, newObj)
    localStorage.setItem("tasks-data", JSON.stringify(data));
    modal.style.display = "none";
    createTask();
});