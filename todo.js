const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); //toDoList가 부모고 그 아이를 죽이는 것.
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id); //선택된 것을 제외한 다른 것들의 아이디를 반환해라
  }); //filter도 forEach와 같이 함수의 각각의 요소를 실행시킴
  toDos = cleanToDos;
  saveToDos(); //기존에는 지워지지 않고 입력된 toDos 배열을 deleteToDo함수를 통해 변경된 사항들을 다시 저장해놓는다.
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify는 js object string로 저장되게 만든다.
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span); // father element안에 넣어주기.
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj); //push는 배열안에 집어넣는다는 의미.
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //포함 아래의 if문은 맨 위까지 함수가 도달하고 난 후 생성된 것들을 새로고침 후 불러오는 역할을 한다.
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      //호출된 함수내의 각각을 toDo라고 부를거다라는 뜻
      paintToDo(toDo.text); //위의 함수에서 array toDo에 입력된 값이 로컬스토리지에 저장되면서 저장된 모든 것들을 매회마다 불러오는 기능을 한다.
    }); //forEach()는 기본적으로 함수를 실행, array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜준다.
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
