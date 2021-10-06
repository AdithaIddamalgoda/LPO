
function changeStatus() {
    var checkBox = document.getElementById("flexSwitchCheckChecked");
    let value = checkBox.value;
    if (checkBox.value == 1){
      checkBox.value = 0;
    } else {
       checkBox.value = 1;
    }
    axios({
        url: '/auth/confirm-covidStatus',
        method: 'post',
        data: {
            status: value,
        }
    }).then(response => {
        if (response) {
            console.log("hut", response.data.status)
    
        }
    })
    .catch(error => {
        console.log(error)
    })
    }





function confirmCovidRequestStatus(id){
    axios({
        url: '/auth/confirm-covidStatus',
        method: 'post',
        data: {
            status: marker.getPosition().lat(),
        }
    }).then(response => {
        if (response) {
            console.log("hut", response.data)
    
        }
    })
    .catch(error => {
        console.log(error)
    })
    }