// Guardar citas en LocalStorage
function saveAppointments() {
    const appointmentList = document.getElementById('appointmentList');
    const appointments = [];
    appointmentList.querySelectorAll('.llistat').forEach(item => {
        appointments.push({
            text: item.querySelector('span').textContent,
            date: item.getAttribute('data-date'),
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Cargar citas desde LocalStorage
function loadAppointments() {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
        const appointments = JSON.parse(storedAppointments);
        const appointmentList = document.getElementById('appointmentList');
        appointments.forEach(appointment => {
            const div = document.createElement('div');
            div.className = 'llistat';
            div.setAttribute('data-date', appointment.date);
            if (appointment.completed) {
                div.classList.add('completed');
            }
            div.innerHTML = `
                <span>${appointment.text}</span>
                <div class="btnCompletat">
                    <button class="complete-btn" onclick="markAsCompleted(this)">${appointment.completed ? 'Desmarcar' : 'Realitzada'}</button>
                    <button onclick="deleteAppointment(this)">Eliminar</button>
                </div>
            `;
            appointmentList.appendChild(div);
        });
    }
    displayAppointments(); // Ordenar y mostrar las citas al cargar
}

// Función para eliminar citas
function deleteAppointment(button) {
    button.parentElement.parentElement.remove();
    saveAppointments(); // Guardar cambios
}

// Función para marcar/desmarcar citas como realizadas
function markAsCompleted(button) {
    const listItem = button.parentElement.parentElement;
    listItem.classList.toggle('completed');
    button.textContent = listItem.classList.contains('completed') ? 'Desmarcar' : 'Realitzada';
    displayAppointments(); // Ordenar después de cambiar el estado
    saveAppointments(); // Guardar cambios
}

// Ordenar y mostrar citas (pendientes primero, luego completadas, ambas ordenadas por fecha)
function displayAppointments() {
    const appointmentList = document.getElementById('appointmentList');
    const appointments = Array.from(appointmentList.children);

    // Dividir en pendientes y completadas
    const pendingAppointments = appointments.filter(item => !item.classList.contains('completed'));
    const completedAppointments = appointments.filter(item => item.classList.contains('completed'));

    // Ordenar las citas pendientes por fecha
    pendingAppointments.sort((a, b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));
    
    // Las citas completadas no necesitan ordenarse por fecha, sólo se mueven al final
    completedAppointments.sort((a, b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));

    // Limpiar la lista y agregar las citas ordenadas
    appointmentList.innerHTML = '';
    [...pendingAppointments, ...completedAppointments].forEach(appointment => appointmentList.appendChild(appointment));
}

// Manejar la adición de nuevas citas
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;

    if (date && time && description) {
        // Crear un nuevo elemento de cita
        const appointmentList = document.getElementById('appointmentList');
        const div = document.createElement('div');
        div.className = 'llistat';
        div.setAttribute('data-date', `${date}T${time}`);
        div.innerHTML = `
            <span>${date} ${time} - ${description}</span>
            <div class="btnCompletat">
                <button class="complete-btn" onclick="markAsCompleted(this)">Realitzada</button>
                <button onclick="deleteAppointment(this)">Eliminar</button>
            </div>
        `;
        appointmentList.appendChild(div);

        // Ordenar citas y guardar en LocalStorage
        displayAppointments();
        saveAppointments();

        // Limpiar el formulario
        document.getElementById('appointmentForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

// Cargar y ordenar citas al iniciar la app
window.addEventListener('load', function() {
    loadAppointments();
    setTimeSuggestions(); // Llamar a la función para sugerir horas
});

// Función para sugerir horas en intervalos de 5 minutos
function setTimeSuggestions() {
    const timeSelect = document.getElementById('time'); // Obtener el select
    const hours = Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, '0'));  // Asegurar que las horas tienen dos dígitos (00, 01, ..., 23)
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // Minutos en intervalos de 5

    // Vaciar opciones existentes antes de agregar las nuevas
    timeSelect.innerHTML = ''; // Limpiar el contenido del select

    // Generar opciones de tiempo en intervalos de 5 minutos
    for (let hour of hours) {
        for (let minute of minutes) {
            // Asegurarse de que los minutos siempre tengan dos dígitos
            const minuteFormatted = `${minute}`.padStart(2, '0');
            const timeOption = `${hour}:${minuteFormatted}`; // Crear la cadena de hora:minuto
            const option = document.createElement('option'); // Crear un nuevo elemento option
            option.value = timeOption;  // Establecer el valor de la opción
            option.textContent = timeOption; // Mostrar la hora en el texto de la opción
            timeSelect.appendChild(option); // Agregar la opción al select
        }
    }
}


