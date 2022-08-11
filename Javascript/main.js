
let informacion = document.querySelector("#informacion");
let buscador = document.querySelector("#buscador");
let enviar = document.querySelector("#enviar");

if(localStorage.getItem('ciudad') == null){
  localStorage.setItem('ciudad', 'Argentina');
}

  enviar.onclick = () => {
    localStorage.setItem('ciudad', buscador.value)
    if(localStorage.getItem('ciudad') == ""){
      localStorage.setItem('ciudad', 'Argentina');
    }
  }


const weather = async () => {
  try {
    const respuesta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('ciudad')}&units=metric&lang=sp&appid=be5235333d3813f99d5ad786ba5223ca`
    );

    if (respuesta.status === 200) {
      let information = "";
      const datos = await respuesta.json();
        information += `<div id="informacion">
            <h2 id="ciudad">${datos.name}</h2>
            <div class="clima">
                <h2 id="temperatura">${datos.main.temp}°C</h2>
                <img class=logo src="https://openweathermap.org/img/wn/${datos.weather[0].icon}.png">
            </div>
            
            <div class="secundario">
                <p id="sensacionTermica">Sensacion Termica: ${datos.main.feels_like}°C </p> 
                <p id="cielo">Cielo: ${datos.weather[0].description}</p>
                <p id="humedad">Humedad: ${datos.main.humidity}%</p>
                <p id="viento">Velocidad del Viento: ${datos.wind.speed} km/h</p>
            </div>
        </div>`;
        informacion.innerHTML = information;
      document.body.style.backgroundImage =`url('https://source.unsplash.com/1600x900/?${datos.name}')`;
    } else if (respuesta.status === 401) {
      console.log("Error 401");
    } else if (respuesta.status === 404) {
      console.log("Error 404");
      Swal.fire({
        title: "¡Ciudad no encontrada!",
        text: "Intente nuevamente",
        icon: "error",
        confirmButtonText: "Continuar",
        timer: "3000",
      });
    } else {
      console.log("Error inesperado")
    }
  } catch (error) {
    console.log(error);
  }
};
weather()
