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