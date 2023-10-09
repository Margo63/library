function sendRequest(method, url, body = null) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => { if (response.ok) {
            return response.json()
        }
    })
}
function isValidDate(dateString) {
    const regex = /^\d{2}.\d{2}.\d{4}$/;
    return regex.test(dateString);
}

function isValidAuthor(dateString) {
    const regex = (/^[A-Za-z]+$/);
    return regex.test(dateString);
}

function onCloseChangeDialogButtonClick(cardId){
    const changeDialog = document.getElementById("changeDialog")
    changeDialog.close()
    let myDate = "15.11.2022"
    if(isValidDate(document.getElementById("changeDate").value)){
        myDate = document.getElementById("changeDate").value
    }
    let author = "Lermontov"
    if(isValidDate(document.getElementById("changeAuthor").value)){
        author = document.getElementById("changeAuthor").value
    }
    const body = {
        "whatChange": "book",
        "name": document.getElementById("changeName").value,
        "author": author,
        "dateCreate": myDate,
        "description": document.getElementById("changeDesc").value
    }

    sendRequest("PUT",`/books/${cardId}`,body)
    window.location = `/books/${cardId}`
}

function onChangeDialogButtonClick(){
    const changeDialog = document.getElementById("changeDialog")
    changeDialog.show()
}

function onTakeBookClicked(cardId){
    const changeDialog = document.getElementById("addReaderDialog")
    changeDialog.close()
    var now = new Date()
    now.setDate(now.getDate()+14)
    console.log(now)
    const body = {
        "whatChange":"user",
        "isInLib": {
            "messageIsInLib": "notInLib",
            "messageIsOverdue": "ok",
            "nameReader": document.getElementById("fffname").value,
            "whenBack": now.getDay()+"."+now.getMonth()+"."+now.getUTCFullYear()
        }
    }

    sendRequest("PUT",`/books/${cardId}`,body)
    window.location = `/books/${cardId}`
}

function onPutBookClicked(cardId){
    const body = {
        "whatChange":"user",
        "isInLib": {
            "messageIsInLib": "inLib"
        }
    }

    sendRequest("PUT",`/books/${cardId}`,body)
    window.location = `/books/${cardId}`
}

function f() {
    document.getElementById('addReaderDialog').show()
}

function backClick(){
    window.location = `/books`
}