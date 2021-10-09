
function changeStatus(id) {
    var checkBox = document.getElementById("flexSwitchCheckChecked" + id);
    checkBox.disabled = true;
    if (checkBox.value == 1) {
        checkBox.value = 0;
    } else {
        checkBox.value = 1;
    }
    console.log(checkBox.value, id)
    axios({
        url: '/auth/confirm-covidStatus',
        method: 'post',
        data: {
            status: checkBox.value,
            id: id,
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

function requestHistory(id) {
    location.href = `/phiHome/${id}`;   
}