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
    const headers = {
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }

        return response.json().then(error => {
            const e = new Error('Что-то пошло не так')
            e.data = error
            throw e
        })
    })
}

function onAddButtonClick(){
    const addDialog = document.getElementById("addDialog")
    addDialog.show()
}

function onCloseButtonClick(){
    const addDialog = document.getElementById("addDialog")
    addDialog.close()

    const body = {
        "id": document.getElementById("listData").childNodes.length+
            document.getElementById("fname").value.length + document.getElementById("lname").value.length ,
        "name": document.getElementById("fname").value,
        "author": document.getElementById("lname").value,
        "dateCreate": "",
        "description": "",
        "isInLib": {
            "message": true
        }
    }

    sendRequest("POST","/books",body)
    window.location = "/books"
}

function onClickDelBookButton(book_id){



    //sendRequest("DELETE",`/books/${book_id}`)
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

