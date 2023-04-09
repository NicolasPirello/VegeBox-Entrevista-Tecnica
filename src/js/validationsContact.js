// Importo las variables que no se suben a github por seguridad. El proyecto en Deploy funciona con normalidad.
import config from './config.js';

// Tomamos el Formulario completo para poder manipularlo.
const formulario = document.getElementById("miFormulario");


// TODO ---------- Expresiones Regulares ----------

const expresiones = {
    
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    mensaje: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9¡!¿?\-,.:;()\s]{5,500}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

// TODO ---------- Objeto Campos para saber si un campo esta o no validado correctamente ----------

let campos = {
    nombre: false,
    correoElectronico: false,
    asunto: false,
    mensaje: false
}

// TODO ---------- Selectores de Inputs basicos y Creacion de ARRAY General ----------

// Vamos a crear un selector para cada input
const nombre = document.getElementById("nombre");
const correoElectronico = document.getElementById("correoElectronico");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");

// Crearemos un array con esos inputs
const inputsArray = [nombre, correoElectronico, asunto, mensaje]


// TODO ---------- Switch para detectar que campos son afectados y Ejecutar la Validacion ----------

const validarFormulario = (e) => {
    
    // Vamos primeramente a comprobar que se ejecute la funcion SOLO en el input donde estamos parados.
    // Eso lo podemos realizar con el target del elemento, y ahi encontrar su name.
    // Luego creamos casos para cada uno de esos nombres.
    // Luego en cada caso creamos un if para comprobar la expresion regular que usemos con .test
    // Dentro de test llamamos a e.target.value quien nos permite acceder al valor que estamos escribiendo.

    switch (e.target.name) {

        case "nombre" :
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;

        case "correoElectronico" :
            validarCampo(expresiones.correo, e.target, "correoElectronico");
        break;

        case "asunto" :
            validarCampo(expresiones.asunto, e.target, "asunto");
        break;

        case "mensaje" :
            validarCampo(expresiones.mensaje, e.target, "mensaje");
        break;

    }

} 

// TODO ---------- Funciones que le dan estilos y añaden los mensajes (Solo de los Inputs Comunes). ----------

const validarCampo = (expresion, input, campo) => {

    if(expresion.test(input.value)) { // Expresion Valida
        document.getElementById(`${campo}`).classList.remove("isInvalid")
        document.getElementById(`${campo}`).classList.add("isValid")
        document.querySelector(`#contact_${campo} .mensajeError`).classList.remove("mensajeErrorActive")
        campos[campo] = true
    } else { // Expresion Invalida
        document.getElementById(`${campo}`).classList.add("isInvalid")
        document.getElementById(`${campo}`).classList.remove("isValid")
        document.querySelector(`#contact_${campo} .mensajeError`).classList.add("mensajeErrorActive")
        campos[campo] = false
    }

}

// TODO -------------------------------- Funciones Varias ---------------------------------------------------------

let monitoreoValidacionesFront = () => {
    inputsArray.forEach( input => {
    // Esto lo que hace es ejecutar una funcion en varios eventos, los monitorea.
        input.addEventListener("keyup", validarFormulario);
        input.addEventListener("blur", validarFormulario);
    })
}

// TODO ---------- Accion al Submit del Formulario ----------

// Vamos a quitar primeramente el envio.

formulario.addEventListener("submit", (e) => {

    e.preventDefault()

    if (campos.nombre && campos.correoElectronico && campos.asunto && campos.mensaje) {

        e.preventDefault()

        let nombre = document.getElementById("nombre").value;
        let correoElectronico = document.getElementById("correoElectronico").value;
        let mensaje = document.getElementById("mensaje").value;
        let fromName = "VegeBox"
        let fromEmail = "seoempresamax@gmail.com"
    
        // Enviar el formulario con EmailJS
        // La confirmacion la envio desde el mismo EmailJS.
    
        emailjs
        .send(
            config.serviceID,
            config.templateID,
            {
            to_name: nombre,
            to_email: correoElectronico,
            from_name: fromName,
            from_email: fromEmail,
            subject: asunto,
            message: mensaje,
            },
            config.publicApi
        )
        .then(
            function (response) {
            document.querySelector("#mensaje-enviado").classList.remove("ocultar-mensaje");
            document.querySelector("#bloque-de-errores").classList.remove("formulario-con-errores")
            
            console.log(
                "Formulario enviado con éxito",
                response.status,
                response.text
            );
            },
            function (error) {
            console.log("Error al enviar el formulario", error);
            }
        );
        

    } else {

        document.querySelector("#bloque-de-errores").classList.add("formulario-con-errores")
        e.preventDefault()

    }

})

// TODO ---------- Ejecucion constante de las validaciones ----------

// Ejecutamos un evento por cada input recorrido constantemente ya que la pagina se encuentra cargada.

monitoreoValidacionesFront();
