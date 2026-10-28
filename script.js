/**
 * LÓGICA DE NEGOCIO: SMART CLASSROOM (DISEÑO EDITORIAL)
 */

// --- 1. VARIABLES Y ARREGLOS ---
const capacidadMaxima = 8;
let alumnosRegistrados = 0; 

let baseDeDatosAlumnos = [
    { id: 1, nombre: "Ana Soberanes", presente: false },
    { id: 2, nombre: "Carlos Mendez", presente: false }
];

// Arrays para el generador aleatorio
const nombresAleatorios = ["Diego", "Evelyn", "Sofia", "Javier", "Valeria", "Miguel", "Lucia", "Raul", "Andres", "Camila"];
const apellidosAleatorios = ["Puebla", "Lozano", "Soberanes", "Gomez", "Mendez", "Hernandez", "Martinez", "Lopez", "Garcia"];

// Referencias al DOM
const listaHTML = document.getElementById("lista-alumnos");
const estadisticasHTML = document.getElementById("estadisticas");


// --- 2. FUNCIONES (El Generador) ---
function agregarAlumnoAleatorio() {
    // 3. CONDICIONAL: Verifica aforo
    if (baseDeDatosAlumnos.length < capacidadMaxima) {
        
        const nombreAzar = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
        const apellidoAzar = apellidosAleatorios[Math.floor(Math.random() * apellidosAleatorios.length)];
        
        const nuevoAlumno = {
            id: baseDeDatosAlumnos.length + 1,
            nombre: `${nombreAzar} ${apellidoAzar}`,
            presente: false
        };

        baseDeDatosAlumnos.push(nuevoAlumno);
        inicializarDashboard();

    } else {
        alert("⚠️ Aforo de lista máximo alcanzado. El aula virtual está llena.");
    }
}


// --- 4. CICLOS Y MANIPULACIÓN DEL DOM ---
function inicializarDashboard() {
    listaHTML.innerHTML = ""; 
    
    baseDeDatosAlumnos.forEach(function(alumno, index) {
        
        let li = document.createElement("li");
        li.className = "student-item";
        
        let infoDiv = document.createElement("div");
        infoDiv.className = "student-info";
        infoDiv.innerHTML = `<i class="fa-solid fa-user"></i> ${alumno.nombre}`;
        
        let boton = document.createElement("button");
        boton.className = "btn-asistencia";
        
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

// Función de asistencia
function registrarIngreso(indice) {
    if (alumnosRegistrados < capacidadMaxima) {
        baseDeDatosAlumnos[indice].presente = true;
        alumnosRegistrados++;
        inicializarDashboard(); 
    } else {
        alert("⚠️ AULA LLENA: Ya no hay lugares disponibles en esta sesión.");
    }
}

// Actualizar estadísticas con colores del nuevo diseño
function actualizarEstadisticas() {
    estadisticasHTML.innerHTML = `<i class="fa-solid fa-users"></i> Ocupación: ${alumnosRegistrados} / ${capacidadMaxima}`;
    
    if(alumnosRegistrados === capacidadMaxima) {
        estadisticasHTML.style.color = "#c0392b"; // Rojo más apagado, estilo editorial
    } else {
        estadisticasHTML.style.color = "#111111"; // Negro de la fuente principal
    }
}

// Inicializar app
inicializarDashboard();