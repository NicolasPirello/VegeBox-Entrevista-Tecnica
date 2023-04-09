const btn = document.getElementById("hamburger")

// Seleccionar el elemento de la navbar con id y agregar un evento de clic
let inicioElement = document.getElementById("inicio-scrolling");
let informacionElement = document.getElementById("informacion-scrolling");
let serviciosElement = document.getElementById("servicios-scrolling");

// Seleccionar el elemento con id "hamburger" y hacer clic automáticamente en él
let hamburgerElement = document.getElementById("hamburger");

// Esconder menu responsive cuando se hace click en el apartado donde se navega en la misma pagina.
function eventoEsconderMobile(elemento, evento) {
  if (elemento) {
    elemento.addEventListener(evento, function() {
      hamburgerElement.click();
    });
  }
}

eventoEsconderMobile(informacionElement, "click");
eventoEsconderMobile(serviciosElement, "click");
eventoEsconderMobile(inicioElement, "click");

