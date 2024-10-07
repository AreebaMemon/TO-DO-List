let add = document.querySelector("#add");
let addbtn = document.querySelector("#add_btn");
let parentList = document.querySelector("#parentList");

addbtn.addEventListener("click", addSomething);
function addSomething() {
  const textValue = add.value.trim();

  if (textValue === "") {
    alert("Task cannot be empty");
    return;
  }

  if (parentList.children[0]?.classList.contains("emptyMsg")) {
    parentList.children[0].remove();
  }

  let newLi = document.createElement("li");
  newLi.className = "list-group-item d-flex justify-content-between";
  newLi.innerHTML = `
                <h4 class="flex-grow-1">${textValue}</h4>
                <button class="btn bg-info mx-3" onclick="edit(this)">Edit</button>
                <button class="btn bg-danger" onclick="remove(this)">Remove</button>`;
  parentList.append(newLi);
  add.value = "";
}

function remove(element) {
  element.parentElement.remove();
  if (parentList.children.length <= 0) {
    let newMsg = document.createElement("h3");
    newMsg.classList.add("emptyMsg");
    newMsg.textContent = "Nothing in your List";
    parentList.appendChild(newMsg);
  }
}

function edit(currElement) {
  let currText = currElement.previousElementSibling.textContent;
  let currInput = document.createElement("input");
  currInput.type = "text";
  currInput.className = "form-control";
  currInput.value = currText;
  currElement.textContent = "Done";
  currElement.parentElement.replaceChild(
    currInput,
    currElement.previousElementSibling
  );

  currElement.onclick = function () {
    let updatedText = currInput.value.trim();
    if (updatedText === "") {
      alert("Please enter a valid value.");
      return;
    }
    let newH4 = document.createElement("h4");
    newH4.className = "flex-grow-1";
    newH4.textContent = updatedText;
    currElement.parentElement.replaceChild(newH4, currInput);
    currElement.textContent = "Edit";
    currElement.onclick = function () {
      edit(currElement);
    };
  };
}
