var todos = [];


window.onload = function(){
	todos = RetrieveFromLocalStorage();
	updateView();
}

function AddToList() { 
	var obj = {
		text: document.getElementById("todo").value,
		isDone: false
	};
	todos.push(obj);
	updateView();
	SaveToLocalStorage();
	var empty = document.getElementById("empty");
 document.getElementById("fs").removeChild(empty);
}

function updateView(){
	document.getElementById("list").innerHTML = '';
	var totalDone = 0;
	for (var elem in todos) {
		var curElem = todos[elem];
		var node = document.createElement("LI");
		node.innerHTML = curElem.text;
		var isDone = curElem.isDone;
		if (isDone){
			node.innerHTML = "<s>" + curElem.text + "</s>";
			totalDone++;
		}
		var btnDone = document.createElement("BUTTON");
		if (!isDone){
			btnDone.innerText = "Done";
		} else {

			btnDone.innerText = "Undone";
		}
		btnDone.setAttribute("class", "btn");
		var btnDel = document.createElement("BUTTON");
		btnDel.innerText = "Delete";
		btnDel.setAttribute("class", "btn");
		//classic loop closure problem workaround
		var createDone = function(e){
			return function(){
				todos[e].isDone = !todos[e].isDone;
				updateView();
				SaveToLocalStorage();
			}
		}
		var createDel = function(e){
			return function(){
				todos.splice(e, 1);
				updateView();
				SaveToLocalStorage();
			}
		}
		btnDel.onclick = createDel(elem);
		btnDone.onclick = createDone(elem);
		node.appendChild(btnDone);
		node.appendChild(btnDel);
		document.getElementById("list").appendChild(node);
	}
	document.getElementById("stat").innerHTML = "Total quantity of tasks: " + todos.length + "<br/>" + "Done: " + totalDone;
		var empty = document.getElementById("empty");
	if (totalDone > 0){
	document.getElementById("fs").removeChild(empty);
}
} 

function SaveToLocalStorage(){
	window.localStorage.setItem("todosKey", JSON.stringify(todos));
}

function RetrieveFromLocalStorage() {
	var retrievedValue = window.localStorage.getItem("todosKey");
	if (retrievedValue){
		return JSON.parse(retrievedValue);
	}
	else return [];
}
