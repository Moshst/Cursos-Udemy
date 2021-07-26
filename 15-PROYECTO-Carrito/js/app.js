const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
var articulosCarrito = []; +

    cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando agregar carrito

    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
        
        articulosCarrito=[];
        limpiarHTML();
        
    });
}
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }

}

//Lee el contenido del HTML al que le dimos click y extrae informacion del curso

function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el conteido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            } else {
                return curso;//retorna los objetos que no son duplicado
            }
        });
        articulosCarrito = [...cursos]

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //agrega elementos al carrito



    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el html

function carritoHTML() {
    //limpiar el HTML
    limpiarHTML();

    //Recorre el arreglo del carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
         <img src="${imagen}" width="100">
        </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a href="#" class="borrar-curso" data-id=${id}> X </a>
        </td>
        `;
        //agrega al HTML del carrito en el tbody

        contenedorCarrito.appendChild(row);

    })
}
function limpiarHTML() {
    //forma lente
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }


}