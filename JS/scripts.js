// ===========LOGIN============

function registrar() {
  const user = document.getElementById("userLogin").value.trim();
  const email = document.getElementById("emailRegistro").value.trim();
  const pass = document.getElementById("passwordLogin").value.trim();
  const confirmRegistro = document.getElementById("confirmRegistro").value.trim();

  if (!user || !email || !pass || !confirmRegistro) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (pass !== confirmRegistro) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Todo correcto
  alert("¡Registro exitoso!");
  window.location.href = "../paginas/Dasboard.html";

}

// Mover esta función fuera de registrar()
function iniciarSesion() {
  const name = document.getElementById("userLogin").value.trim();
  const password = document.getElementById("passwordLogin").value.trim();

  if (!name || !password) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Aquí podrías agregar validación con datos guardados si deseas
  alert("¡Inicio de Sesión Exitoso!");
  window.location.href = "../paginas/Dasboard.html";
}
//=================AQUI TERMINA=========================


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pacienteForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Generar código automáticamente
            const codigoGenerado = 'P-' + Date.now();

            const paciente = {
                codigo: codigoGenerado,
                primerNombre: document.getElementById('1nombre-paciente').value,
                segundoNombre: document.getElementById('2nombre-paciente').value,
                apellidos: document.getElementById('apellidos-paciente').value,
                fechaNacimiento: document.getElementById('fecha').value,
                edad: document.getElementById('edad').value,
                sexo: document.getElementById('sexo').value,
                alergias: document.getElementById('alergias').value
            };

            let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
            pacientes.push(paciente);
            localStorage.setItem('pacientes', JSON.stringify(pacientes));

            form.reset();
        });
    }
});

//Tabla Tutores

  
// Funciones para manejar el formulario de citas
const citaForm = document.getElementById('citaForm');
if (citaForm) {
    generarCodigoCita(); // Generar código de cita automáticamente (para mientras no tenemos Base de datos conectada)

    citaForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        if (citaForm.checkValidity()) {
            agregarCitaATabla();
            alert('Cita agendada correctamente.');
            citaForm.reset(); // Reiniciar el formulario
            generarCodigoCita(); // Generar un nuevo código de cita
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    });
}

// Función para generar un código de cita
function generarCodigoCita() {
    const codigo = Math.random().toString(36).substring(2, 15).toUpperCase();
    document.getElementById('codigoCita').value = codigo;
}

// Funciones para manejar el formulario de pacientes
const pacienteForm = document.getElementById('pacienteForm');
if (pacienteForm) {
    generarCodigoPaciente(); // Generar código de paciente automáticamente

    pacienteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (pacienteForm.checkValidity()) {
            agregarPacienteATabla();
            alert('Paciente registrado correctamente.');
            pacienteForm.reset(); 
            generarCodigoPaciente(); 
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    });
}

// Función para generar un código de paciente
function generarCodigoPaciente() {
    const codigo = Math.random().toString(36).substring(2, 15).toUpperCase();
    document.getElementById('codigoPaciente').value = codigo;
}


// Aumento de tamaño en los contenedores de misión y visión
const infoMContainer = document.querySelector('.infoM-container');
const infoVContainer = document.querySelector('.infoV-container');
const infoVVContainer = document.querySelector('.infoVV-container');

function scaleUp(container) {
    container.style.transform = 'scale(1.05)';
    container.style.transition = 'transform 0.3s';
}

function scaleDown(container) {
    container.style.transform = 'scale(1)';
}

// Agregar eventos de hover para los contenedores de misión y visión
if (infoMContainer) {
    infoMContainer.addEventListener('mouseover', function() {
        scaleUp(infoMContainer);
    });
    infoMContainer.addEventListener('mouseout', function() {
        scaleDown(infoMContainer);
    });
}

if (infoVContainer) {
    infoVContainer.addEventListener('mouseover', function() {
        scaleUp(infoVContainer);
    });
    infoVContainer.addEventListener('mouseout', function() {
        scaleDown(infoVContainer);
    });
}

if (infoVVContainer) {
    infoVVContainer.addEventListener('mouseover', function() {
        scaleUp(infoVVContainer);
    });
    infoVVContainer.addEventListener('mouseout', function() {
        scaleDown(infoVVContainer);
    });
}

// Ajustar el margen del footer al cargar la página
function ajustarMargenFooter() {
}




 // Cargar datos de localStorage y mostrarlos en la tabla
 window.onload = function() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const tabla = document.getElementById('tablaPacientes').getElementsByTagName('tbody')[0];

    pacientes.forEach((paciente, index) => {
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td>${paciente.codigo}</td>
            <td>${paciente.primerNombre}</td>
            <td>${paciente.segundoNombre}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.fechaNacimiento}</td>
            <td>${paciente.edad}</td>
            <td>${paciente.sexo}</td>
            <td>${paciente.alergias}</td>
            <td>
                <button class="editar-btn" onclick="editarFila(${index})">Editar</button>
            </td>
            <td>
                <button class="btn-delete" onclick="eliminarFila(${index})">Eliminar</button>
            </td>
        `;
    });
};


function eliminarFila(index) {
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    pacientes.splice(index, 1); // Eliminar el paciente
    localStorage.setItem('pacientes', JSON.stringify(pacientes)); // Guardar cambios
    location.reload(); // Recargar la página para actualizar la tabla
}

function editarFila(index) {
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes[index]; // Obtener el paciente a editar

    // la lógica para editar el paciente(incompleto!!!!)
    const nuevoNombre = prompt("Editar Primer Nombre:", paciente.primerNombre);
    if (nuevoNombre !== null && nuevoNombre !== "") {
        paciente.primerNombre = nuevoNombre; // Actualizar el nombre
        localStorage.setItem('pacientes', JSON.stringify(pacientes)); // Guardar cambios
        location.reload(); // Recargar la página para actualizar la tabla
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pacienteForm');
  
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario
  
        // Obtener pacientes existentes
        let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  
        // Generar código automático
        const nuevoCodigo = 'P' + String(pacientes.length + 1).padStart(4, '0');
  
        // Capturar datos del formulario
        const paciente = {
          codigo: nuevoCodigo,
          primerNombre: document.getElementById('1nombre-paciente').value,
          segundoNombre: document.getElementById('2nombre-paciente').value,
          apellidos: document.getElementById('apellidos-paciente').value,
          fechaNacimiento: document.getElementById('fecha').value,
          sexo: document.getElementById('sexo').value,
          alergias: document.getElementById('alergias').value
        };
  
        // Guardar paciente
        pacientes.push(paciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
  
        // Limpiar el formulario
        form.reset();
  
        alert("Paciente registrado correctamente");
      });
    }
  });
  
//====================INICIO DEL DASHBOARD======================
// Citas completadas 
new Chart(document.getElementById('completedTrend'), {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Promedio de Niños Menores de 10 Años',
        data: [138, 1290, 357, 768, 1534],
        borderColor: '#4f46e5',
        fill: false
      },
      {
        label: 'Promedio de Niños Mayores de 10 Años',
        data: [435, 565, 1500, 700, 376 ],
        borderColor: '#10b981',
        fill: false
      }
    ]
  }
});

// CITAS ATENDIDAS
new Chart(document.getElementById('avgDuration'), {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Atendidas',
      data: [990, 422, 894,248,1603],
      backgroundColor: '#C2410C',
      borderColor: '#F97316',
      fill: false
    }]
  }
});

// barra de los resultados de los pacientes con alergias 
new Chart(document.getElementById('Alergias'), {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',],
    datasets: [{
      label: 'Resultados de los pacientes alergicos',
      data: [70, 240, 180, 200, 40],
      backgroundColor: '#60a5fa',
      borderWidth: 1,
      data: [40,230,180,200,50]
    }]
  }
});

// Graficos de los pacientes del campo o de la ciudad 
const ctx = document.getElementById('patientChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Urbano', 'Rural'],
    datasets: [{
      label: 'Pacientes',
      data: [5964, 1699], 
      backgroundColor: ['#fde68a', '#93c5fd'],
      borderColor: ['#f9d36f', '#4ba4e2'],
      borderWidth: 1
      
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      }
    }
  }
});

const tipoCtx = document.getElementById('tipoAtencionChart').getContext('2d');
new Chart(tipoCtx, {
  type: 'doughnut',
  data: {
    labels: ['Niños', 'Niñas'],
    datasets: [{
      data: [65, 35],
      backgroundColor: ['#06b6d4', '#8b5cf6'],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '70%',
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          },
          color: '#555'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  }
});
