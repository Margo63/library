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

function onCloseChangeDialogButtonClick(cardId){
    const changeDialog = document.getElementById("changeDialog")
    changeDialog.close()

    const body = {
        "whatChange": "book",
        "name": document.getElementById("changeName").value,
        "author": document.getElementById("changeAuthor").value,
        "dateCreate": document.getElementById("changeDate").value,
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
            "whenBack": now
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