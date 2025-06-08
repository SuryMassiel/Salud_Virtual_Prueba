
// // ===========LOGIN============

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
  window.location.href = "../paginas/home.html";
}
//=================AQUI TERMINA=========================



function setupTutorForm() {
    const form = document.getElementById("form-tutor");
    if (form) {
        // Verificar si estamos en modo edición
        const urlParams = new URLSearchParams(window.location.search);
        const isEditMode = urlParams.has('editar');
        const tutorId = urlParams.get('id');

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const tutor = {
                identificacion: document.getElementById("identificacion").value,
                nombre1: document.getElementById("1nombre-tutor").value,
                nombre2: document.getElementById("2nombre-tutor").value || '-',
                apellidos: document.getElementById("apellidos-tutor").value,
                sexo: document.getElementById("sexo").value,
                edad: document.getElementById("edad").value,
                telefono: document.getElementById("telefono").value,
                correo: document.getElementById("correo").value,
                direccion: document.getElementById("direccion").value,
                ocupacion: document.getElementById("ocupacion").value
            };

            // Validación de campos requeridos (excepto cédula si es edición)
            if ((!isEditMode && !tutor.identificacion) || !tutor.nombre1 || !tutor.apellidos) {
                alert("Complete los campos requeridos");
                return;
            }

            // Guardar en localStorage
            let tutores = JSON.parse(localStorage.getItem("tutores")) || [];
            
                      // Si es edición, excluimos al tutor actual de la verificación
            if (isEditMode && tutorId) {
                tutores = tutores.filter(t => t.identificacion !== tutorId);
            }

            // Verificar duplicados solo si cambió la cédula
            const existe = tutores.some(t => t.identificacion === tutor.identificacion);
            if (existe) {
                alert("¡Ya existe un tutor con esta cédula!");
                return;
            }

            // Si es edición, eliminamos el registro antiguo
            if (isEditMode && tutorId) {
                tutores = JSON.parse(localStorage.getItem("tutores")) || [];
                tutores = tutores.filter(t => t.identificacion !== tutorId);
            }

            // Agregamos el tutor (nuevo o editado)
            tutores.push(tutor);
            localStorage.setItem("tutores", JSON.stringify(tutores));

            alert(isEditMode ? "Tutor actualizado correctamente" : "Tutor registrado correctamente");
            window.location.href = "tutores.html";
        });

        // Cargar datos si estamos editando
        if (isEditMode && tutorId) {
            cargarDatosParaEditar(tutorId);
        }
    }
}


// Función para mostrar tutores en la tabla
function displayTutores() {
    const tabla = document.getElementById("tablaTutores");
    
    if (tabla) {
        const tbody = tabla.querySelector("tbody");
        const tutores = JSON.parse(localStorage.getItem("tutores")) || [];

        // Limpiar tabla
        tbody.innerHTML = "";

        if (tutores.length === 0) {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="10" class="tabla__dato">No hay tutores registrados</td>`;
            tbody.appendChild(fila);
            return;
        }
        
        // Mostrar cada tutor
        tutores.forEach((tutor) => {
            const fila = document.createElement("tr");
            fila.classList.add("tabla__fila-tutor");
            fila.dataset.id = paciente.codigo;

            fila.innerHTML = `
                <td class="tabla__dato">${tutor.identificacion}</td>
                <td class="tabla__dato">${tutor.nombre1}</td>
                <td class="tabla__dato">${tutor.nombre2 || '-'}</td>
                <td class="tabla__dato">${tutor.apellidos}</td>
                <td class="tabla__dato">${tutor.sexo || '-'}</td>
                <td class="tabla__dato">${tutor.edad || '-'}</td>
                <td class="tabla__dato">${tutor.telefono || '-'}</td>
                <td class="tabla__dato">${tutor.correo || '-'}</td>
                <td class="tabla__dato">${tutor.direccion || '-'}</td>
                <td class="tabla__dato">${tutor.ocupacion || '-'}</td>
            `;
               // Evento para selección de fila
      fila.addEventListener("click", function() {
        document.querySelectorAll(".tabla__fila-tutor").forEach(f => {
          f.classList.remove("tabla__fila--seleccionada");
        });
        this.classList.add("tabla__fila--seleccionada");
      });
      

            tbody.appendChild(fila);
        });
    }
}
// Función para buscar tutores
function setupBuscarTutor() {
  const buscador = document.getElementById("buscador-tutor");
  const btnBuscar = document.querySelector(".tabla__boton--buscar-tutor");

  if (buscador && btnBuscar) {
    // Buscar al escribir o al hacer clic en el botón
    const buscarTutores = () => {
      const texto = buscador.value.toLowerCase();
      const filas = document.querySelectorAll("#tablaTutores tbody tr");
      
      filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(texto) ? "" : "none";
      });
    };

    buscador.addEventListener("input", buscarTutores);
    btnBuscar.addEventListener("click", buscarTutores);
  }
}

// Función para editar tutores
function setupEditarTutor() {
  const btnEditar = document.querySelector(".tabla__boton--editar-tutor");

  if (btnEditar) {
    btnEditar.addEventListener("click", function() {
      const filaSeleccionada = document.querySelector(".tabla__fila--seleccionada");
      
      if (!filaSeleccionada) {
        alert("Por favor, seleccione un tutor haciendo clic en su fila");
        return;
      }

      const id = filaSeleccionada.dataset.id;
            window.location.href = `registrotutor.html?editar=true&id=${id}`;
        });
    }
}

// Función para cargar datos en el formulario de edición
function cargarDatosParaEditar(tutorId) {
    const tutores = JSON.parse(localStorage.getItem("tutores")) || [];
    const tutor = tutores.find(t => t.identificacion === tutorId);
    
    if (tutor) {
        document.getElementById("identificacion").value = tutor.identificacion;
    document.getElementById("1nombre-tutor").value = tutor.nombre1 || "";
    document.getElementById("2nombre-tutor").value = tutor.nombre2 || "";
    document.getElementById("apellidos-tutor").value = tutor.apellidos || "";
    document.getElementById("sexo").value = tutor.sexo || "";
    document.getElementById("edad").value = tutor.edad || "";
    document.getElementById("telefono").value = tutor.telefono || "";
    document.getElementById("correo").value = tutor.correo || "";
    document.getElementById("direccion").value = tutor.direccion || "";
    document.getElementById("ocupacion").value = tutor.ocupacion || "";
    
   
        // Cambiar texto del botón
        const btnSubmit = document.querySelector(".formulario__boton--guardar");
        if (btnSubmit) {
            btnSubmit.textContent = "Actualizar Tutor";
        }
    }
}

// Función para eliminar tutores
function setupEliminarTutor() {
  const btnEliminar = document.querySelector(".tabla__boton--eliminar-tutor");

  if (btnEliminar) {
    btnEliminar.addEventListener("click", function() {
      const filaSeleccionada = document.querySelector(".tabla__fila--seleccionada");
      
      if (!filaSeleccionada) {
        alert("Por favor, seleccione un tutor haciendo clic en su fila");
        return;
      }

      if (confirm("¿Está seguro que desea eliminar este tutor?")) {
        const id = filaSeleccionada.dataset.id;
        let tutores = JSON.parse(localStorage.getItem("tutores")) || [];
        
        // Filtrar para eliminar el tutor seleccionado
        tutores = tutores.filter(t => t.identificacion !== id);
        localStorage.setItem("tutores", JSON.stringify(tutores));
        
        // Recargar la tabla
        displayTutores();
        alert("Tutor eliminado correctamente");
      }
    });
  }
}

// Modificar la función displayTutores para agregar selección de filas
function displayTutores() {
    const tabla = document.getElementById("tablaTutores");
    
    if (tabla) {
        const tbody = tabla.querySelector("tbody");
        const tutores = JSON.parse(localStorage.getItem("tutores")) || [];

        // Limpiar tabla antes de agregar nuevos datos
        tbody.innerHTML = "";

        if (tutores.length === 0) {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="10" class="tabla__dato">No hay tutores registrados</td>`;
            tbody.appendChild(fila);
            return;
        }

        tutores.forEach((tutor) => {
            const fila = document.createElement("tr");
            fila.classList.add("tabla__fila");
            fila.dataset.id = tutor.identificacion; // Agregamos ID para referencia
            
            fila.innerHTML = `
                <td class="tabla__dato">${tutor.identificacion || '-'}</td>
                <td class="tabla__dato">${tutor.nombre1 || '-'}</td>
                <td class="tabla__dato">${tutor.nombre2 || '-'}</td>
                <td class="tabla__dato">${tutor.apellidos || '-'}</td>
                <td class="tabla__dato">${tutor.sexo || '-'}</td>
                <td class="tabla__dato">${tutor.edad || '-'}</td>
                <td class="tabla__dato">${tutor.telefono || '-'}</td>
                <td class="tabla__dato">${tutor.correo || '-'}</td>
                <td class="tabla__dato">${tutor.direccion || '-'}</td>
                <td class="tabla__dato">${tutor.ocupacion || '-'}</td>
            `;
            
            // este  evento permite  seleccionar fila que deseamos 
            fila.addEventListener("click", function() {
                document.querySelectorAll(".tabla__fila").forEach(f => {
                    f.classList.remove("tabla__fila--seleccionada");
                });
                this.classList.add("tabla__fila--seleccionada");
            });
            
            tbody.appendChild(fila);
        });
    }
}

// =============PACIENTE (FUNCIONES)=================================

// Función para generar código de paciente automático
function generarCodigoPaciente() {
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  return `PAC${String(pacientes.length + 1).padStart(3, '0')}`;
}

// Función principal para el formulario de pacientes
function setupPacienteForm() {
  const form = document.getElementById("form-paciente"); // Cambiado a ID específico
  if (form) {
    // Generar código automático al cargar
    const codigoInput = document.getElementById("codigoPaciente");
    if (codigoInput) codigoInput.value = generarCodigoPaciente();

    // Verificar si estamos en modo edición
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.has('editar');
    const pacienteId = urlParams.get('id');

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const paciente = {
        codigo: document.getElementById("codigoPaciente").value,
        nombre1: document.getElementById("1nombre-paciente").value,
        nombre2: document.getElementById("2nombre-paciente").value || '-',
        apellidos: document.getElementById("apellidos-paciente").value,
        alergias: document.getElementById("alergias").value || 'Ninguna',
        fechaNacimiento: document.getElementById("fecha").value,
        sexo: document.getElementById("sexo").value,
        edad: document.getElementById("edad").value,
        unidadEdad: document.getElementById("mesesanios").value
      };

      // Validación de campos requeridos
      if (!paciente.nombre1 || !paciente.apellidos || !paciente.fechaNacimiento || 
          !paciente.sexo || !paciente.edad || !paciente.unidadEdad) {
        alert("Complete los campos requeridos");
        return;
      }

      let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
      
      // Si es edición, excluimos al paciente actual
      if (isEditMode && pacienteId) {
        pacientes = pacientes.filter(p => p.codigo !== pacienteId);
      }

      // Agregamos el paciente
      pacientes.push(paciente);
      localStorage.setItem("pacientes", JSON.stringify(pacientes));

      alert(isEditMode ? "Paciente actualizado correctamente" : "Paciente registrado correctamente");
      window.location.href = "pacientes.html";
    });

    // Cargar datos si estamos editando
    if (isEditMode && pacienteId) {
      cargarDatosPacienteParaEditar(pacienteId);
    }
  }
}

// Función para mostrar pacientes en la tabla
function displayPacientes() {
  const tabla = document.getElementById("tablaPacientes");
  
  if (tabla) {
    const tbody = tabla.querySelector("tbody");
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    // Limpiar tabla
    tbody.innerHTML = "";

    if (pacientes.length === 0) {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td colspan="9" class="tabla__dato">No hay pacientes registrados</td>`;
      tbody.appendChild(fila);
      return;
    }

    // Mostrar cada paciente
    pacientes.forEach((paciente) => {
      const fila = document.createElement("tr");
      fila.classList.add("tabla__fila-paciente");
      fila.dataset.id = paciente.codigo;
      
      fila.innerHTML = `
        <td class="tabla__dato">${paciente.codigo}</td>
        <td class="tabla__dato">${paciente.nombre1}</td>
        <td class="tabla__dato">${paciente.nombre2 || '-'}</td>
        <td class="tabla__dato">${paciente.apellidos}</td>
        <td class="tabla__dato">${paciente.alergias}</td>
        <td class="tabla__dato">${paciente.fechaNacimiento}</td>
        <td class="tabla__dato">${paciente.sexo}</td>
        <td class="tabla__dato">${paciente.edad}</td>
        <td class="tabla__dato">${paciente.unidadEdad}</td>
      `;
      
      // Evento para selección de fila
      fila.addEventListener("click", function() {
        document.querySelectorAll(".tabla__fila-paciente").forEach(f => {
          f.classList.remove("tabla__fila--seleccionada");
        });
        this.classList.add("tabla__fila--seleccionada");
      });
      
      tbody.appendChild(fila);
    });
  }
}

// Función para buscar pacientes
function setupBuscarPaciente() {
  const buscador = document.getElementById("buscador-paciente");
  const btnBuscar = document.querySelector(".tabla__boton--buscar-paciente"); // Clase específica

  if (buscador && btnBuscar) {
    const buscarPacientes = () => {
      const texto = buscador.value.toLowerCase();
      const filas = document.querySelectorAll("#tablaPacientes tbody tr");
      
      filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(texto) ? "" : "none";
      });
    };

    buscador.addEventListener("input", buscarPacientes);
    btnBuscar.addEventListener("click", buscarPacientes);
  }
}

// Función para editar pacientes
function setupEditarPaciente() {
  const btnEditar = document.querySelector(".tabla__boton--editar-paciente"); // Clase específica

  if (btnEditar) {
    btnEditar.addEventListener("click", function() {
      const filaSeleccionada = document.querySelector("#tablaPacientes .tabla__fila--seleccionada");
      
      if (!filaSeleccionada) {
        alert("Seleccione un paciente primero");
        return;
      }

      const id = filaSeleccionada.dataset.id;
      window.location.href = `registrarpacientes.html?editar=true&id=${id}`;
    });
  }
}

// Función para eliminar pacientes
function setupEliminarPaciente() {
  const btnEliminar = document.querySelector(".tabla__boton--eliminar-paciente"); // Clase específica

  if (btnEliminar) {
    btnEliminar.addEventListener("click", function() {
      const filaSeleccionada = document.querySelector("#tablaPacientes .tabla__fila--seleccionada");
      
      if (!filaSeleccionada) {
        alert("Seleccione un paciente primero");
        return;
      }

      if (confirm("¿Eliminar este paciente permanentemente?")) {
        const id = filaSeleccionada.dataset.id;
        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        
        pacientes = pacientes.filter(p => p.codigo !== id);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        
        displayPacientes();
        alert("Paciente eliminado correctamente");
      }
    });
  }
}

// Función para cargar datos en el formulario de edición
function cargarDatosPacienteParaEditar(pacienteId) {
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  const paciente = pacientes.find(p => p.codigo === pacienteId);
  
  if (paciente) {
    document.getElementById("codigoPaciente").value = paciente.codigo;
    document.getElementById("1nombre-paciente").value = paciente.nombre1;
    document.getElementById("2nombre-paciente").value = paciente.nombre2 || "";
    document.getElementById("apellidos-paciente").value = paciente.apellidos;
    document.getElementById("alergias").value = paciente.alergias;
    document.getElementById("fecha").value = paciente.fechaNacimiento;
    document.getElementById("sexo").value = paciente.sexo;
    document.getElementById("edad").value = paciente.edad;
    document.getElementById("mesesanios").value = paciente.unidadEdad;
    
    // Cambiar texto del botón
    const btnSubmit = document.querySelector(".formulario__boton--guardar");
    if (btnSubmit) {
      btnSubmit.textContent = "Actualizar Paciente";
    }
  }
}

// =============DOCTOR (FUNCIONES)=================================

// Función para generar código de doctor automático
function generarCodigoDoctor() {
  const doctores = JSON.parse(localStorage.getItem("doctores")) || [];
  return `DOC${String(doctores.length + 1).padStart(3, '0')}`;
}

// Función principal para el formulario de doctor
function setupDoctoresForm() {
  const form = document.getElementById("form-doctor");
  if (form) {
    // Generar código automático al cargar
    const codigoInput = document.getElementById("codigo-doctor");
    if (codigoInput) codigoInput.value = generarCodigoDoctor();

    // Verificar si estamos en modo edición
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.has('editar');
    const doctorId = urlParams.get('id');

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const doctor = {
        codigod: document.getElementById("codigo-doctor").value,
        identificaciond: document.getElementById("identificacion").value,
        nombred1: document.getElementById("1nombre-doctor").value,
        nombred2: document.getElementById("2nombre-doctor").value || '',
        apellidosd: document.getElementById("apellidos-doctor").value,
        sexod: document.getElementById("sexo").value,
        edadd: parseInt(document.getElementById("edad").value),
        telefonod: document.getElementById("telefono").value,
        correod: document.getElementById("correo").value,
        direcciond: document.getElementById("direccion").value,
        dependencia: document.getElementById("dependencia").value,
        cargo: document.getElementById("cargo_trabajo").value
      };

      // Validación de campos requeridos
      if (!doctor.identificaciond || !doctor.nombred1 || !doctor.apellidosd || 
          !doctor.sexod || !doctor.edadd || !doctor.telefonod || !doctor.correod || 
          !doctor.direcciond || !doctor.dependencia || !doctor.cargo) {
        alert("Complete todos los campos requeridos");
        return;
      }

      let doctores = JSON.parse(localStorage.getItem("doctores")) || [];
      
      // Si es edición, excluimos al doctor actual
      if (isEditMode && doctorId) {
        doctores = doctores.filter(d => d.codigod !== doctorId);
      }

      // Agregamos el doctor
      doctores.push(doctor);
      localStorage.setItem("doctores", JSON.stringify(doctores));

      alert(isEditMode ? "Doctor actualizado correctamente" : "Doctor registrado correctamente");
      window.location.href = "doctores.html";
    });

    // Cargar datos si estamos editando
    if (isEditMode && doctorId) {
      cargarDatosDoctorParaEditar(doctorId);
    }
  }
}

// Función para mostrar doctores en la tabla
function displayDoctores() {
  const tabla = document.getElementById("tablaDoctores");
  
  if (tabla) {
    const tbody = tabla.querySelector("tbody");
    const doctores = JSON.parse(localStorage.getItem("doctores")) || [];

    // Limpiar tabla
    tbody.innerHTML = "";

    if (doctores.length === 0) {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td colspan="12" class="tabla__dato">No hay doctores registrados</td>`;
      tbody.appendChild(fila);
      return;
    }

    // Mostrar cada doctor
    doctores.forEach((doctor) => {
      const fila = document.createElement("tr");
      fila.classList.add("tabla__fila-doctor");
      fila.dataset.id = doctor.codigod;
      
      fila.innerHTML = `
        <td class="tabla__dato">${doctor.codigod}</td>
        <td class="tabla__dato">${doctor.identificaciond}</td>
        <td class="tabla__dato">${doctor.nombred1}</td>
        <td class="tabla__dato">${doctor.nombred2 || '-'}</td>
        <td class="tabla__dato">${doctor.apellidosd}</td>
        <td class="tabla__dato">${doctor.sexod}</td>
        <td class="tabla__dato">${doctor.edadd}</td>
        <td class="tabla__dato">${doctor.telefonod}</td>
        <td class="tabla__dato">${doctor.correod}</td>
        <td class="tabla__dato">${doctor.direcciond}</td>
        <td class="tabla__dato">${doctor.dependencia}</td>
        <td class="tabla__dato">${doctor.cargo}</td>
      `;
      
      // Evento para selección de fila
      fila.addEventListener("click", function() {
        document.querySelectorAll(".tabla__fila-doctor").forEach(f => {
          f.classList.remove("tabla__fila--seleccionada");
        });
        this.classList.add("tabla__fila--seleccionada");
      });
      
      tbody.appendChild(fila);
    });
  }
}

// Función para buscar doctores
function setupBuscarDoctores() {
  const buscador = document.getElementById("buscador-doctor");
  const btnBuscar = document.querySelector(".tabla__boton--buscar-doctor");

  if (buscador && btnBuscar) {
    const buscarDoctores = () => {
      const texto = buscador.value.toLowerCase();
      const filas = document.querySelectorAll("#tablaDoctores tbody tr");
      
      filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(texto) ? "" : "none";
      });
    };

    buscador.addEventListener("input", buscarDoctores);
    btnBuscar.addEventListener("click", buscarDoctores);
  }
}

// Función para editar doctores
function setupEditarDoctores() {
  const btnEditar = document.querySelector(".tabla__boton--editar-doctor");

  if (btnEditar) {
    btnEditar.addEventListener("click", function() {
      const filaSeleccionada = document.querySelector("#tablaDoctores .tabla__fila--seleccionada");
      
      if (!filaSeleccionada) {
        alert("Seleccione un doctor primero");
        return;
      }

      const id = filaSeleccionada.dataset.id;
      window.location.href = `registrardoctores.html?editar=true&id=${id}`;
    });
  }
}

// Función para eliminar doctor
function setupEliminarDoctores() {
  const btnEliminar = document.querySelector(".tabla__boton--eliminar-doctor");

  if (btnEliminar) {
    btnEliminar.addEventListener("click", function() {
      const filaSeleccionada = document.querySelector("#tablaDoctores .tabla__fila--seleccionada");
      
      if (!filaSeleccionada) {
        alert("Seleccione un doctor primero");
        return;
      }

      if (confirm("¿Eliminar este doctor permanentemente?")) {
        const id = filaSeleccionada.dataset.id;
        let doctores = JSON.parse(localStorage.getItem("doctores")) || [];
        
        doctores = doctores.filter(d => d.codigod !== id);
        localStorage.setItem("doctores", JSON.stringify(doctores));
        
        displayDoctores();
        alert("Doctor eliminado correctamente");
      }
    });
  }
}

// Función para cargar datos en el formulario de edición
function cargarDatosDoctorParaEditar(doctorId) {
  const doctores = JSON.parse(localStorage.getItem("doctores")) || [];
  const doctor = doctores.find(d => d.codigod === doctorId);
  
  if (doctor) {
    document.getElementById("codigo-doctor").value = doctor.codigod;
    document.getElementById("identificacion").value = doctor.identificaciond;
    document.getElementById("1nombre-doctor").value = doctor.nombred1;
    document.getElementById("2nombre-doctor").value = doctor.nombred2 || "";
    document.getElementById("apellidos-doctor").value = doctor.apellidosd;
    document.getElementById("sexo").value = doctor.sexod;
    document.getElementById("edad").value = doctor.edadd;
    document.getElementById("telefono").value = doctor.telefonod;
    document.getElementById("correo").value = doctor.correod;
    document.getElementById("direccion").value = doctor.direcciond;
    document.getElementById("dependencia").value = doctor.dependencia;
    document.getElementById("cargo_trabajo").value = doctor.cargo;

    // Cambiar texto del botón
    const btnSubmit = document.querySelector(".formulario__boton--guardar-doctor");
    if (btnSubmit) {
      btnSubmit.textContent = "Actualizar doctor";
    }
  }
}

// ==============================================
// INICIALIZACIÓN COMPLETA (Tutores, Pacientes y Doctores)
// ==============================================

document.addEventListener("DOMContentLoaded", function() {

  // Sistema de Tutores
  setupTutorForm();
  displayTutores();
  setupBuscarTutor();
  setupEditarTutor();
  setupEliminarTutor();

  // Sistema de Pacientes
  setupPacienteForm();
  displayPacientes();
  setupBuscarPaciente();
  setupEditarPaciente();
  setupEliminarPaciente();

  // Sistema de Doctores
  setupDoctoresForm();
  displayDoctores();
  setupBuscarDoctores();
  setupEditarDoctores();
  setupEliminarDoctores();

  
 

  // Verificar edición en todos los sistemas
  if (window.location.search.includes("editar=true")) {
    const id = new URLSearchParams(window.location.search).get("id");
    const currentPage = window.location.pathname;
    
    // Determinar qué tipo de formulario estamos editando
    if (currentPage.includes("registrotutor.html")) {
      const tutorEditar = JSON.parse(localStorage.getItem("tutores"))?.find(t => t.identificacion === id);
      if (tutorEditar) cargarDatosParaEditar(tutorEditar);
    } 
    else if (currentPage.includes("registrarpacientes.html")) {
      cargarDatosPacienteParaEditar(id);
    }
    else if (currentPage.includes("registrardoctors.html")) {
      cargarDatosDoctorParaEditar(id);
    }
    else {
      console.warn("Página de edición no reconocida:", currentPage);
    }
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
