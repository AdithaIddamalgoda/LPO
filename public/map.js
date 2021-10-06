let map, infoWindow;
let locID = "";
let marker;
let locX = 79.86015314129502;
let locY = 6.9262680158433385;


function logDatabaseLocation(X,Y){
  if (X){
  locX = X;
  locY = Y;
  }
  
  console.log("function",X,Y);
}

function initMap() {
  if((document.getElementById("locationY").innerHTML)==""){
    locX = 79.86015314129502;
    locY = 6.9262680158433385;
  }
  else{
    locX = Number(document.getElementById("locationX").innerHTML);
    locY = Number(document.getElementById("locationY").innerHTML);
  }
  console.log(document.getElementById("locationX").innerHTML, document.getElementById("locationY").innerHTML);
  console.log("deweni",locX,locY)
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: locY, lng: locX },
    zoom: 18,
  });
  infoWindow = new google.maps.InfoWindow();

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
  });

  google.maps.event.addListener(marker, 'dragend', function (evt) {
    document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat() + ' Current Lng: ' + evt.latLng.lng() + '</p>';
  });

  google.maps.event.addListener(marker, 'dragstart', function (evt) {
    document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
  });

  //if (!database eke location thiyenawanan ) add that code here
  if (document.getElementById("locationY").innerHTML=="") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          locID = position.coords.longitude + " " + position.coords.latitude
          console.log(locID)
          marker.setPosition(pos);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  else{
    marker.setPosition({
      lat: locY,
      lng: locX,
    })
  }

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos)
            marker.setPosition(pos);
            // const marker = new google.maps.Marker({
            //   position: pos,
            //   map: map,
            // });

          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function confirmLocation(id) {
  let newLoc = marker.getPosition().lat() + " " + marker.getPosition().lng()
  console.log(newLoc)
  console.log(id)
  axios({
    url: '/auth/confirm-location',
    method: 'post',
    data: {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    }
}).then(response => {
    if (response) {
        console.log("hut", response.data)

    }
    else{
      res.status(200);
      res.json({ working: true });
      res.end();
  }
})
.catch(error => {
    console.log(error)
})
}
