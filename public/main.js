function configureDropDownLists(inputProvince, inputDistrict) {
    var Northern = ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'];
    var NorthWestern = ['Puttalam', 'Kurunegala'];
    var Western = ['Gampaha', 'Colombo', 'Kalutara'];
    var NorthCentral = ['Anuradhapura', 'Polonnaruwa'];
    var Central = ['Matale', 'Kandy', 'Nuwara Eliya	'];
    var Sabaragamuwa = ['Kegalle', 'Ratnapura'];
    var Eastern = ['Trincomalee', 'Batticaloa', 'Ampara'];
    var Uva = ['Badulla', 'Monaragala'];
    var Southern = ['Hambantota', 'Matara', 'Galle'];

  
    switch (inputProvince.value) {
      case 'Northern':
        inputDistrict.options.length = 0;
        for (i = 0; i < Northern.length; i++) {
          createOption(inputDistrict, Northern[i], Northern[i]);
        }
        break;
      case 'North Western':
        inputDistrict.options.length = 0;
        for (i = 0; i < NorthWestern.length; i++) {
          createOption(inputDistrict, NorthWestern[i], NorthWestern[i]);
        }
        break;
      case 'Western':
        inputDistrict.options.length = 0;
        for (i = 0; i < Western.length; i++) {
          createOption(inputDistrict, Western[i], Western[i]);
        }
        break;
        case 'NorthCentral':
        inputDistrict.options.length = 0;
        for (i = 0; i < NorthCentral.length; i++) {
          createOption(inputDistrict, NorthCentral[i], NorthCentral[i]);
        }
        break;
        case 'Central':
        inputDistrict.options.length = 0;
        for (i = 0; i < Central.length; i++) {
          createOption(inputDistrict, Central[i], Central[i]);
        }
        break;
        case 'Sabaragamuwa':
        inputDistrict.options.length = 0;
        for (i = 0; i < Sabaragamuwa.length; i++) {
          createOption(inputDistrict, Sabaragamuwa[i], Sabaragamuwa[i]);
        }
        break;
        case 'Eastern':
        inputDistrict.options.length = 0;
        for (i = 0; i < Eastern.length; i++) {
          createOption(inputDistrict, Eastern[i], Eastern[i]);
        }
        break;
        case 'Uva':
        inputDistrict.options.length = 0;
        for (i = 0; i < Uva.length; i++) {
          createOption(inputDistrict, Uva[i], Uva[i]);
        }
        break;
        case 'Southern':
        inputDistrict.options.length = 0;
        for (i = 0; i < Southern.length; i++) {
          createOption(inputDistrict, Southern[i], Southern[i]);
        }
        break;
      default:
        inputDistrict.options.length = 0;
        break;
    }
  
  }
  
function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

function initMap() {
    var location = {lat: 6.9262680158433385, lng:79.86015314129502};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10, 
        center: location
    });
}


// Side Navbar





function changeUserName(){
  let a = document.getElementById("username")
  a.innerText = a.innerText +"ass"        
}