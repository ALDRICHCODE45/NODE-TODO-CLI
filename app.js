
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
require('colors');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();// tenemos lo que encontro la funcion 'leerDB()'

    if (tareasDB) { //si es que la funcion leerDB retorno algo diferente a null u ondefine cargamos las tareas 
        tareas.cargarTareasFromArray( tareasDB );
    };
    
    //este ciclo se ejecuta siempre y cuando la variable opt no sea cero, en ese caso termina el programa
    do {
        //imprime el menu y retorna lo que elegi en las opciones
        opt = await inquirerMenu();



        switch (opt) {
            case '1':
                //en caso de que seleccione '1' creamos una nueva tarea con la descripcion que ponga
                const desc = await leerInput('Descripccion: ');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                //en caso de que seleccione '2' ponemos en consola las tareas que se han creado
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true)
            break;

            case '4':
                tareas.listarPendientesCompletadas( false )
            break;

            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar( 'Estas seguro?' )
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    };
                };
                
            break;
        };
        // guardamos en el archivo './db/data.json' las tareas que hemos creado
        guardarDB( tareas.listadoArr );
        
        //ponemos en espera la aplicacion pidiendole al usuario un enter 
        await pausa();

    } while ( opt !== '0' );
};

main();
