let map, infoWindow;
let locID = "";
let marker;


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 6.9262680158433385, lng: 79.86015314129502 },
    zoom: 13,
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
}''

function confirmLocation(id) {
  let newLoc = marker.getPosition().lat() + " " + marker.getPosition().lng()
  console.log(newLoc)
  console.log(id)
}
