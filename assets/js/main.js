// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidad del Carrusel Automático ---
    const carouselSlides = document.querySelector('.carousel__slides');
    const carouselImages = document.querySelectorAll('.carousel__image');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nextButton = document.querySelector('.carousel__button--next');
    const dotsContainer = document.querySelector('.carousel__dots');

    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000; // Cambia de imagen cada 5 segundos (5000 ms)

    // Asegurarse de que los elementos del carrusel existen antes de inicializarlo
    if (!carouselSlides || carouselImages.length === 0 || !dotsContainer) {
        console.warn('Elementos del carrusel no encontrados. La funcionalidad del carrusel no se inicializará.');
        return; // Salir si no se pueden encontrar los elementos esenciales del carrusel
    }

    // Función para mostrar el slide actual
    const showSlide = (index) => {
        // Lógica para el loop infinito del carrusel
        if (index >= carouselImages.length) {
            currentIndex = 0; // Vuelve al primer slide si se pasa del último
        } else if (index < 0) {
            currentIndex = carouselImages.length - 1; // Va al último slide si se retrocede del primero
        } else {
            currentIndex = index; // Muestra el slide solicitado
        }

        // Aplica la transformación para deslizar los slides
        carouselSlides.style.transform = `translateX(${-currentIndex * 100}%)`;
        updateDots(); // Actualiza los puntos de navegación para reflejar el slide actual
    };

    // Función para avanzar al siguiente slide
    const nextSlide = () => {
        showSlide(currentIndex + 1);
    };

    // Función para retroceder al slide anterior
    const prevSlide = () => {
        showSlide(currentIndex - 1);
    };

    // Iniciar el carrusel automático
    const startAutoSlide = () => {
        clearInterval(slideInterval); // Limpia cualquier intervalo existente para evitar duplicados
        slideInterval = setInterval(nextSlide, intervalTime); // Configura un nuevo intervalo
    };

    // Detener el carrusel automático al pasar el ratón por encima
    carouselSlides.addEventListener('mouseenter', () => clearInterval(slideInterval));
    // Reanudar el carrusel automático cuando el ratón sale
    carouselSlides.addEventListener('mouseleave', startAutoSlide);

    // Event listeners para los botones de navegación (si existen)
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reinicia el temporizador de auto-avance al navegar manualmente
        });
    }
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reinicia el temporizador de auto-avance al navegar manualmente
        });
    }

    // Crear puntos de navegación dinámicamente
    const createDots = () => {
        dotsContainer.innerHTML = ''; // Limpiar cualquier punto existente para evitar duplicados
        carouselImages.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel__dot'); // Añade la clase CSS para el estilo del punto
            if (index === 0) {
                dot.classList.add('carousel__dot--active'); // El primer punto está activo por defecto
            }
            dot.addEventListener('click', () => {
                showSlide(index); // Navega al slide correspondiente al hacer clic en el punto
                startAutoSlide(); // Reinicia el temporizador de auto-avance
            });
            dotsContainer.appendChild(dot); // Añade el punto al contenedor de puntos
        });
    };

    // Actualizar el estado visual de los puntos de navegación
    const updateDots = () => {
        document.querySelectorAll('.carousel__dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('carousel__dot--active'); // Marca el punto del slide actual como activo
            } else {
                dot.classList.remove('carousel__dot--active'); // Desactiva los demás puntos
            }
        });
    };

    // Inicializar carrusel si hay imágenes
    if (carouselImages.length > 0) {
        createDots(); // Crea los puntos de navegación
        showSlide(0); // Muestra la primera imagen al cargar la página
        startAutoSlide(); // Inicia la rotación automática
    }


    // --- Funcionalidad del Modal de Imagen ---
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModalBtn = document.querySelector('.modal__close');
    const allGalleryImages = document.querySelectorAll('.carousel__image'); // Selecciona todas las imágenes del carrusel

    // Abrir el modal al hacer clic en una imagen de la galería
    allGalleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src; // Establece la fuente de la imagen en el modal

            // Intenta obtener el texto de la leyenda (caption) de la imagen
            // Busca el elemento <p> con la clase 'carousel__caption' dentro del mismo .carousel__slide div
            const parentSlide = img.closest('.carousel__slide');
            let captionText = img.alt; // Usa el texto del 'alt' como fallback por defecto

            if (parentSlide) {
                const captionElement = parentSlide.querySelector('.carousel__caption');
                if (captionElement && captionElement.textContent) {
                    captionText = captionElement.textContent;
                }
            }
            modalCaption.textContent = captionText; // Establece la leyenda del modal
            imageModal.style.display = 'block'; // Muestra el modal
        });
    });

    // Cerrar el modal al hacer clic en la 'x'
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });
    }

    // Cerrar el modal al hacer clic fuera del contenido (en el fondo oscuro del modal)
    if (imageModal) {
        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) { // Solo si el clic es directamente sobre el contenedor del modal
                imageModal.style.display = 'none';
            }
        });
    }

    // Cerrar el modal al presionar la tecla 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
        }
    });

});