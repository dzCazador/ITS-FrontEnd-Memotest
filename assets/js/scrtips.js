const tablero = document.getElementById('tablero');
let tarjetas = []; //arreglo de todas las tarjetas 
let tarjetasSeleccionadas = []; //arreglo con las tarjetas que va seleccionado el usuario
let paresEncontrados = 0; //pares que se van encontrando, al llegar a 8 se finaliza

//funcion desordenar arreglo generada por IA
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
    }
    return array;
}

//genera las tarjetas de manera aleatoria
function generarMemotest () {
    const numeros = [];
    //inicializo arreglo de 16 items con 2 items iguales del 1 al 8
    for (i=1;i<=8;i++){
        numeros.push(i);
        numeros.push(i);
    }
    //mezclo el arreglo
    shuffleArray(numeros);
    //recorriendo el arreglo genero las tarjetas en pantalla
    numeros.forEach(numero => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        tarjeta.dataset.numero = numero;
        tarjeta.textContent = numero;
        tarjeta.addEventListener('click', seleccionarTarjeta);
        tablero.appendChild(tarjeta);
        tarjetas.push(tarjeta);
    });
};

//funcion que se ejecuta al seleccionar una tarjeta
function seleccionarTarjeta(e){
    const tarjeta = e.target;
    // si la cantidad de tarjetas seleccionadas es menor a dos y la actual no esta descubierta
    // lo primero impide que se elecciones mas de 2 y que no se ejecute sobre tarjetas ya descubiertas
    if (tarjetasSeleccionadas.length<2 && !tarjeta.classList.contains('descubierta')) {
        //marco la tarjeta descubierta
        tarjeta.classList.add('descubierta');
        //agrego la tarjeta a la lista de tarjetas seleccionadas
        tarjetasSeleccionadas.push(tarjeta);
        //si tengo dos seleccionadas controlo por igualdad
        if (tarjetasSeleccionadas.length === 2) {
            controlarIgualdad();
        }
    }   
}

//funcion para validar si las tarjetas son iguales
function controlarIgualdad(){
    const [primerTarjeta,segundaTarjeta] = tarjetasSeleccionadas;
    //si las tarjetas son iguales
    if (primerTarjeta.dataset.numero === segundaTarjeta.dataset.numero) {
        //incremento los paresEncontrados
        paresEncontrados++;
        //elimino las tarjetas seleccionadas
        tarjetasSeleccionadas = [];
        //si todos los pares fueron encontrados
        if (paresEncontrados === 8) {
            //aviso de Todos los Pares Encontrados y reinicio el juego
            //se agrega timeout de 500 ms porque sino no se llega a ver el tablero finalizado.
            setTimeout(() => { 
                alert('¡Felicidades! Has encontrado todos los pares.');
                tablero.innerHTML = '';
                tarjetas = [];
                paresEncontrados = 0;
                generarMemotest();
            },500)
            }
    } else {
        //sino luego de 1 segundo vuelvo a tapar las tarjetas
        setTimeout(() => {
            primerTarjeta.classList.remove('descubierta');
            segundaTarjeta.classList.remove('descubierta');
            tarjetasSeleccionadas = [];
        }, 1000);
    }
}

//IniciarTablero
generarMemotest ()