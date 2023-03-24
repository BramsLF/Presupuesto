const ingresos = [
    //El array se cargan con los objetos bajo los metodos de la clase Ingreso del JS Ingreso
];

const egresos = [
    //El array se cargan con los objetos bajo los metodos de la clase Egreso del JS Egreso
];

//Carga todas las funciones de la app en el HTML desde el metodo onload
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgreso();
}

//Calculo del total de los Ingresos
let totalIngresos = () => {
    let totalIngreso = 0;
    for( let ingreso of ingresos ){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

//Calculo del total de los Egresos
let totalEgresos = () => {
    let totlaEgreso = 0;
    for( let egreso of egresos ){
        totlaEgreso += egreso.valor;
    }
    return totlaEgreso;
}

//Establecemos la relacion de los calculos y funciones con los ID del HTML
let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById( "presupuesto" ).innerHTML = formatoMoneda(presupuesto);
    document.getElementById( "porcentaje" ).innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById( "ingresos" ).innerHTML = formatoMoneda(totalIngresos());
    document.getElementById( "egresos" ).innerHTML = formatoMoneda(totalEgresos());
}

//Brinda formato a los valores
const formatoMoneda = (valor) =>{
   return valor.toLocaleString('es-CO', {style:'currency', currency:'COP', minimumFractionDigits:2});
}
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-CO', {style:'percent', minimumFractionDigits:2});
}

//La funcion genera una especie de push hace el array de ingresos, en la seccion de la misma
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for( let ingreso of ingresos ){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById( "lista-ingresos" ).innerHTML = ingresosHTML;
}
//Aqui se crean los ingresos y la forma de la salida de la misma, el codigo HTML, hace referencia 
//a el encajoamiento de los datos, por ello lleva los estilos incluidos 
const crearIngresosHTML = (ingreso)=>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                        <ion-icon name="trash-outline"
                        onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return ingresosHTML;
}
//Eliminar un elemento del array ingresos, permitiendo remover un elemento desde la vista
const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id );
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

//La funcion genera una especie de push hace el array de egresos, en la seccion de la misma
const cargarEgreso = ()=>{
    let egresosHTML = '';
    for( let egreso of egresos ){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById( "lista-egresos" ).innerHTML = egresosHTML
}
//Aqui se crean los Egresos y la forma de la salida de la misma, el codigo HTML, hace referencia 
//a el encajoamiento de los datos, por ello lleva los estilos incluidos 
const crearEgresosHTML = (egreso)=>{
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="trash-outline"
                        onclick='eliminarEngreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return egresosHTML;
}

//Eliminar un elemento del array Egresos, permitiendo remover un elemento desde la vista
let eliminarEngreso = (id)=>{
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    egresos.splice( indiceEliminar, 1);
    cargarCabecero();
    cargarEgreso();
}

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if( descripcion.value !== '' && valor.value !== ''){
        if( tipo.value === 'ingreso'){
            //el signo + remplaza la palabra number para convertir el value de valor en un numero
            ingresos.push(new Ingreso( descripcion.value, +valor.value ));
            cargarCabecero();
            cargarIngresos();
        }
        else if( tipo.value === 'egreso'){
            egresos.push( new Egreso( descripcion.value, +valor.value ));
            cargarCabecero();
            cargarEgreso();

        }
    }
}