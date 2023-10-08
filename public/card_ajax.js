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
        "id": cardId,
        "name": document.getElementById("ffname").value,
        "author": document.getElementById("llname").value,
        "dateCreate": "",
        "description": "",
        "isInLib": {
            "message": true
        }
    }

    sendRequest("PUT",`/books/${cardId}`,body)
    window.location = `/books/${cardId}`
}

function onChangeDialogButtonClick(){
    const changeDialog = document.getElementById("changeDialog")
    changeDialog.show()
}