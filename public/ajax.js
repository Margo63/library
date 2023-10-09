
function isValidDate(dateString) {
    const regex = /^\d{2}.\d{2}.\d{4}$/;
    return regex.test(dateString);
}
function isValidAuthor(dateString) {
    const regex = (/^[A-Za-z]+$/);
    return regex.test(dateString);
}

function load(button) {
    let id = button.id;

    // title.style.visibility = "visible";
    callAjax(id, (response)=>{
        try {

            let group = JSON.parse(response);

            // if(group.error) {
            //     title.style.visibility = "collapse";
            //     amount.innerHTML = group.error;
            // } else
            //     amount.innerHTML = group.amount;
        } catch (e) {
            // title.style.visibility = "collapse";
            // amount.innerHTML = "Ошибка: " + e;
        }

    });
}

function callAjax(id, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            callback(this.responseText);
            window.location = `/books/${id}`

        }

    };

    xhttp.open("GET", `/books/${id}`, true);
    xhttp.send();
}

function sendRequest(method, url, body = null) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
}

function onAddButtonClick(){

    const addDialog = document.getElementById("addDialog")
    addDialog.show()

}

function onCloseButtonClick(){
    const addDialog = document.getElementById("addDialog")
    addDialog.close()
    let myDate = "15.11.2022"
    if(isValidDate(document.getElementById("addDate").value)){
        myDate = document.getElementById("addDate").value
    }

    let author = "Lermontov"
    if(isValidAuthor(document.getElementById("addAuthor").value)){
        author = document.getElementById("addAuthor").value
    }
    const body = {
        "id":  0,
        "name": document.getElementById("addName").value,
        "author": author,
        "dateCreate": myDate,
        "description": document.getElementById("addDescription").value,
        "isInLib": {
            "messageIsInLib": "inLib"
        }
    }

    sendRequest("POST","/books",body)
    window.location = "/books"
}

function onClickDelBookButton(book_id){

    let isBookDel = confirm("Вы уверены?")

    //sendRequest("DELETE",`/books/${book_id}`)
    if(isBookDel){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200){
                callback(this.responseText);

            }

        };

        xhttp.open("DELETE", `/books/${book_id}`, true);
        xhttp.send();
        window.location = "/books"
        console.log(book_id)
    }

}



