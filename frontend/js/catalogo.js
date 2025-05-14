// frontend/js/catalogo.js
document.addEventListener('DOMContentLoaded', () => {
    const alojamientosContainer = document.getElementById('alojamientos-container');
    const alojamientoIndividualContainer = document.getElementById('alojamiento-individual-container');
    const filtroCiudadInput = document.getElementById('filtro-ciudad');
    const filtroPaisInput = document.getElementById('filtro-pais');
    const filtroTipoInput = document.getElementById('filtro-tipo');
    const aplicarFiltrosButton = document.getElementById('aplicar-filtros');

    const API_BASE_URL = 'http://localhost:3001/api'; // Asegúrate que el puerto coincida con tu backend

    // Función para obtener todos los alojamientos o filtrados
    async function fetchAlojamientos(filtros = {}) {
        try {
            const queryParams = new URLSearchParams(filtros).toString();
            const response = await fetch(`${API_BASE_URL}/alojamientos?${queryParams}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const alojamientos = await response.json();
            return alojamientos;
        } catch (error) {
            console.error('Error al obtener alojamientos:', error);
            if (alojamientosContainer) {
                alojamientosContainer.innerHTML = '<p class="error">No se pudieron cargar los alojamientos. Intente más tarde.</p>';
            }
            return []; // Retornar array vacío en caso de error
        }
    }

    // Función para renderizar los alojamientos en el HTML
    function renderAlojamientos(alojamientos) {
        if (!alojamientosContainer) return; // Salir si el contenedor no existe en la página actual

        alojamientosContainer.innerHTML = ''; // Limpiar contenedor antes de renderizar

        if (alojamientos.length === 0) {
            alojamientosContainer.innerHTML = '<p>No se encontraron alojamientos con los criterios seleccionados.</p>';
            return;
        }

        alojamientos.forEach(alojamiento => {
            const card = document.createElement('div');
            card.classList.add('alojamiento-card'); // Clase para estilos CSS
            card.innerHTML = `
                <h3>${alojamiento.nombre}</h3>
                <p><strong>Tipo:</strong> ${alojamiento.tipo_alojamiento}</p>
                <p><strong>Ubicación:</strong> ${alojamiento.ciudad}, ${alojamiento.pais}</p>
                <p><strong>Capacidad:</strong> ${alojamiento.capacidad} personas</p>
                <p><strong>Precio por noche:</strong> $${parseFloat(alojamiento.precio_por_noche).toFixed(2)}</p>
                <p class="${alojamiento.disponible ? 'disponible' : 'no-disponible'}">
                    ${alojamiento.disponible ? 'Disponible' : 'No Disponible'}
                </p>
                <div class="acciones-card">
                    <a href="alojamiento.html?id=${alojamiento.id}" class="btn-ver-detalles">Ver Detalles</a>
                    ${alojamiento.disponible ? `<button class="btn-reservar" data-id="${alojamiento.id}">Reservar</button>` : ''}
                </div>
            `;
            // Event listener para el botón "Reservar" (se implementará la lógica en Etapa 7)
            const btnReservar = card.querySelector('.btn-reservar');
            if (btnReservar) {
                btnReservar.addEventListener('click', () => {
                    // Redirigir a una página de reserva o abrir un modal
                    // Se necesitará verificar si el usuario está logueado antes de permitir la reserva.
                    console.log(`Intentando reservar alojamiento ID: ${alojamiento.id}`);
                    // Por ahora, podríamos redirigir o simplemente mostrar un mensaje.
                    // Ejemplo: window.location.href = `reserva.html?alojamientoId=${alojamiento.id}`; // Corregido: si reserva.html está en /pages/
                    alert(`Funcionalidad de reserva para el alojamiento ID: ${alojamiento.id} se implementará en la Etapa 7. \nSe requerirá inicio de sesión.`);
                });
            }
            alojamientosContainer.appendChild(card);
        });
    }

    // Función para obtener y mostrar un alojamiento individual
    async function fetchAndRenderAlojamientoIndividual() {
        if (!alojamientoIndividualContainer) return; // Salir si el contenedor no está en esta página

        const urlParams = new URLSearchParams(window.location.search);
        const alojamientoId = urlParams.get('id');

        if (!alojamientoId) {
            alojamientoIndividualContainer.innerHTML = '<p class="error">No se especificó un ID de alojamiento.</p>';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/alojamientos/${alojamientoId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    alojamientoIndividualContainer.innerHTML = '<p class="error">Alojamiento no encontrado.</p>';
                } else {
                    alojamientoIndividualContainer.innerHTML = `<p class="error">Error al cargar el alojamiento: ${response.statusText}</p>`;
                }
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const alojamiento = await response.json();
            renderAlojamientoIndividual(alojamiento);
        } catch (error) {
            console.error('Error al obtener el alojamiento individual:', error);
            if (!alojamientoIndividualContainer.innerHTML.includes('Error') && !alojamientoIndividualContainer.innerHTML.includes('No encontrado')) {
                 alojamientoIndividualContainer.innerHTML = '<p class="error">No se pudo cargar el detalle del alojamiento. Intente más tarde.</p>';
            }
        }
    }

    // Función para renderizar el detalle de un alojamiento
    function renderAlojamientoIndividual(alojamiento) {
        alojamientoIndividualContainer.innerHTML = `
            <h2>${alojamiento.nombre}</h2>
            <p><strong>Descripción:</strong> ${alojamiento.descripcion || 'No disponible.'}</p>
            <p><strong>Dirección:</strong> ${alojamiento.direccion || 'No disponible.'}</p>
            <p><strong>Ubicación:</strong> ${alojamiento.ciudad}, ${alojamiento.pais}</p>
            <p><strong>Tipo:</strong> ${alojamiento.tipo_alojamiento}</p>
            <p><strong>Capacidad:</strong> ${alojamiento.capacidad} personas</p>
            <p><strong>Precio por noche:</strong> $${parseFloat(alojamiento.precio_por_noche).toFixed(2)}</p>
            <p><strong>Latitud:</strong> ${alojamiento.latitud || 'No disponible'}</p>
            <p><strong>Longitud:</strong> ${alojamiento.longitud || 'No disponible'}</p>
            <p class="${alojamiento.disponible ? 'disponible' : 'no-disponible'}">
                <strong>${alojamiento.disponible ? 'Disponible para reservar' : 'Actualmente No Disponible'}</strong>
            </p>
            ${alojamiento.disponible ? `<button class="btn-reservar-grande" data-id="${alojamiento.id}">¡Reservar Ahora!</button>` : ''}
            <br/>
            <a href="index.html" class="btn-volver">Volver al catálogo</a>
        `;

        const btnReservarGrande = alojamientoIndividualContainer.querySelector('.btn-reservar-grande');
        if (btnReservarGrande) {
            btnReservarGrande.addEventListener('click', () => {
                console.log(`Intentando reservar alojamiento ID: ${alojamiento.id} desde página de detalle.`);
                alert(`Funcionalidad de reserva para el alojamiento ID: ${alojamiento.id} se implementará en la Etapa 7. \nSe requerirá inicio de sesión.`);
                // Ejemplo: window.location.href = `reserva.html?alojamientoId=${alojamiento.id}`; // Asumiendo que reserva.html también estará en /pages/
            });
        }
    }

    // --- Lógica para la página principal del catálogo (index.html o similar) ---
    if (alojamientosContainer) {
        fetchAlojamientos().then(renderAlojamientos);

        // Event listener para el botón de aplicar filtros
        if (aplicarFiltrosButton) {
            aplicarFiltrosButton.addEventListener('click', () => {
                const filtros = {};
                if (filtroCiudadInput.value) filtros.ciudad = filtroCiudadInput.value;
                if (filtroPaisInput.value) filtros.pais = filtroPaisInput.value;
                if (filtroTipoInput.value) filtros.tipo_alojamiento = filtroTipoInput.value;
                // Aquí podrías añadir más filtros como precio_max, capacidad_min, etc.
                // Por ejemplo:
                // const filtroPrecioMax = document.getElementById('filtro-precio-max');
                // if (filtroPrecioMax.value) filtros.precio_max = filtroPrecioMax.value;

                fetchAlojamientos(filtros).then(renderAlojamientos);
            });
        }
    }

    // --- Lógica para la página de detalle de un alojamiento (alojamiento.html) ---
    if (alojamientoIndividualContainer) {
        fetchAndRenderAlojamientoIndividual();
    }
});