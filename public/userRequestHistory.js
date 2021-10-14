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
    let reqId = event.relatedTarget.getAttribute('data-req-id');
    console.log(reqId);
    document.getElementById('req-id').innerHTML = reqId

    axios.get(`/phi-request/${reqId}`).then(response => {
        console.log(response)
    })
});

function requestHistory(id) {
    location.href = `/phiHome/${id}`;
}