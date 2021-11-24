console.log(`Hey I'm app.js speaking`);

showNotes();

// if user add a note, add it to the localStorage
let addTitle = document.getElementById("addTitle");
addTitle.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let title = localStorage.getItem("title");

    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }

    titleObj.push(addTxt.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();

});


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();

});

// This function is to show the notes, added by user
function showNotes() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
            <div class="card-body">
            <button type="button" class="btn btn-primary" style="margin-bottom: 10px;" id="addTitle">${title}</button>
                <p class = "card-text">${element}</p>
                <button id ="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`
    }
}


// fucntion to delete a note
function deleteNote(index) {
    // console.log("I am deleting");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}


// Search Fearture
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);


        if (cardTxt.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


/* 
Further Fearures:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/