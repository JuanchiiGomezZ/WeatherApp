let informacion = document.querySelector("#informacion");
let buscador = document.querySelector("#buscador");
let enviar = document.querySelector("#enviar");
let currentLocation = document.querySelector("#currentLocation");



if(localStorage.getItem('ciudad') == null){
  localStorage.setItem('ciudad', 'Argentina');

}
enviar.onclick = () => {
  localStorage.setItem("ciudad", buscador.value);
  if (localStorage.getItem("ciudad") == "") {
    localStorage.setItem("ciudad", "Argentina");
  }
};
weatherSearch();


currentLocation.onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  function success(coordenadas) {
    latitud = coordenadas.coords.latitude;
    longitud = coordenadas.coords.longitude;
    localStorage.setItem("latitud", latitud);
    localStorage.setItem("longitud", longitud);
  }
  function error() {
    localStorage.setItem("ciudad", "Argentina");
    weatherSearch();
  }
  weatherCurrentLocation();
};
