function changeStatus(reqID, userID, currentCovidStatus) {
    var checkBox = document.getElementById("flexSwitchCheckChecked" + reqID);
    checkBox.disabled = true;
    if (checkBox.value == 1) {
        checkBox.value = 0;
    } else {
        checkBox.value = 1;
    }
    console.log(checkBox.value, reqID, currentCovidStatus)
    axios({
        url: '/auth/confirm-covidStatus',
        method: 'post',
        data: {
            status: checkBox.value,
            reqID: reqID,
            userID: userID,
            currentCovidStatus: currentCovidStatus,
        }
    }).then(response => {
        if (response.data.working) {
            console.log(response.data)
        }
    })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            checkBox.disabled = false;
        })
}


document.getElementById('myModal').addEventListener("show.bs.modal", function (event) {
    let userID = event.relatedTarget.getAttribute('data-user-id');
    console.log(userID);
    document.getElementById('req-id').innerHTML = userID

    axios.get(`/user-edit/${userID}`).then(response => {
        console.log(response.data)
    })
});


document.getElementById('deleteModal').addEventListener("show.bs.modal", function (event) {
    let userID = event.relatedTarget.getAttribute('data-user-id');
    console.log(userID);
    document.getElementById('req-id').innerHTML = userID
    document.getElementById('confirmDelete').addEventListener("click", () => {
        axios.get(`/user-delete/${userID}`).then(response => {
            console.log(response)
            location.href = ("/admin-home")
        })

    })
});