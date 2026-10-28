/**
 * LÓGICA DE NEGOCIO: SMART CLASSROOM
 */

// --- 1. VARIABLES, TIPOS DE DATOS Y ARREGLOS ---
const capacidadMaxima = 8; // Aumenté el límite para que puedas probar el botón
let alumnosRegistrados = 0; 

// Base de datos inicial
let baseDeDatosAlumnos = [
    { id: 1, nombre: "Ana Soberanes", presente: false },
    { id: 2, nombre: "Carlos Mendez", presente: false }
];

// Arreglos para el generador aleatorio (El Plus)
const nombresAleatorios = ["Diego", "Evelyn", "Sofia", "Javier", "Valeria", "Miguel", "Lucia", "Raul", "Andres", "Camila"];
const apellidosAleatorios = ["Puebla", "Lozano", "Soberanes", "Gomez", "Mendez", "Hernandez", "Martinez", "Lopez", "Garcia"];

// Referencias al DOM
const listaHTML = document.getElementById("lista-alumnos");
const estadisticasHTML = document.getElementById("estadisticas");


// --- 2. FUNCIONES (El Plus Generador) ---
function agregarAlumnoAleatorio() {
    // 3. CONDICIONAL: Verifica si cabe otro alumno antes de generarlo
    if (baseDeDatosAlumnos.length < capacidadMaxima) {
        
        // Uso del objeto Math para escoger un string aleatorio de los arreglos
        const nombreAzar = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
        const apellidoAzar = apellidosAleatorios[Math.floor(Math.random() * apellidosAleatorios.length)];
        
        // Crea el nuevo objeto alumno
        const nuevoAlumno = {
            id: baseDeDatosAlumnos.length + 1,
            nombre: `${nombreAzar} ${apellidoAzar}`,
            presente: false
        };

        // Lo inyecta a la base de datos y actualiza la pantalla
        baseDeDatosAlumnos.push(nuevoAlumno);
        inicializarDashboard();

    } else {
        alert("⚠️ Aforo de lista máximo alcanzado. No puedes registrar más alumnos al curso.");
    }
}


// --- 4. CICLOS Y MANIPULACIÓN DEL DOM ---
function inicializarDashboard() {
    listaHTML.innerHTML = ""; 
    
    // Recorre todos los estudiantes e incluye íconos de FontAwesome
    baseDeDatosAlumnos.forEach(function(alumno, index) {
        
        let li = document.createElement("li");
        li.className = "student-item";
        
        // Contenedor del nombre con ícono de usuario
        let infoDiv = document.createElement("div");
        infoDiv.className = "student-info";
        infoDiv.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${alumno.nombre}`;
        
        // Botón de asistencia
        let boton = document.createElement("button");
        boton.className = "btn-asistencia";
        
        // Si está presente, cambia el texto y pone un ícono de "Check"
        if(alumno.presente) {
            boton.innerHTML = `<i class="fa-solid fa-check"></i> Presente`;
            boton.disabled = true;
        } else {
            boton.innerHTML = `Marcar Asistencia`;
        }
        
        boton.onclick = function() {
            registrarIngreso(index);
        };

        li.appendChild(infoDiv);
        li.appendChild(boton);
        listaHTML.appendChild(li);
    });

    actualizarEstadisticas();
}

// Función que maneja la lógica de asistencia
function registrarIngreso(indice) {
    if (alumnosRegistrados < capacidadMaxima) {
        baseDeDatosAlumnos[indice].presente = true;
        alumnosRegistrados++;
        inicializarDashboard(); 
    } else {
        alert("⚠️ AULA LLENA: Ya no hay lugares disponibles en esta sesión de Smart Classroom.");
    }
}

// Función para actualizar la ocupación
function actualizarEstadisticas() {
    estadisticasHTML.innerHTML = `<i class="fa-solid fa-users"></i> Ocupación: ${alumnosRegistrados} / ${capacidadMaxima}`;
    
    if(alumnosRegistrados === capacidadMaxima) {
        estadisticasHTML.style.color = "#ff453a"; 
    } else {
        estadisticasHTML.style.color = "#ffffff"; 
    }
}

// Inicializamos
inicializarDashboard();