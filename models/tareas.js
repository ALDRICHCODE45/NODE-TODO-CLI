const Tarea = require("./tarea");
require('colors');
class Tareas {

    _listado = {};

    get listadoArr() {
        //con este metodo getter pasamos a un array el contenido de _listado, generando un array de objetos   
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    };

    constructor () {
        this._listado = {};
    };

    borrarTarea (id = ''){
        if( this._listado[id] ){
            delete this._listado[id];
       }
    }

    cargarTareasFromArray(tareas = []){

        //con este metodo creamos un nuevo objeto dentro de ._listado en base al array que recivimos 

        tareas.forEach(tarea => {
            //la key sera la tarea.id y el valor sera la terea que en ese momento se encuentre iterando
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log()
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${ i + 1 }`.green;
            const { desc, completadoEn  } = tarea;
            const estado = ( completadoEn )
                ? 'Completada'.green
                : 'Pendiente'.red
            console.log(`${ idx }. ${ desc } :: ${estado}`)
        });
    };


    listarPendientesCompletadas( completadas = true ){
        //filtramos el array de objetos para obtener las tareas que son diferentes de null en su propiedad completadoEn
        const TareasCompletadas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        //filtramos el array de objetos para obtener las tareas que son igual a null en su propiedad completadoEn
        const TareasPendientes = this.listadoArr.filter(tarea => tarea.completadoEn === null);

        if (completadas) {
            //mostrar las completadas en caso de que la opcion completadas este en true
            TareasCompletadas.forEach((tarea, indice) => {
                const idx = `${ indice + 1 }`.green;
                const { desc, completadoEn } = tarea;
                console.log(`${ idx }. ${ desc } :: ${ completadoEn.green }`);
            });

        }else{ //mostrar tareas Pendientes en caso de que la opcion completadas este en false
            TareasPendientes.forEach((tarea, indice) => {
                const idx = `${ indice + 1 }`.green;
                const { desc } = tarea;
                console.log(`${ idx }. ${ desc } :: ${ 'Pendiente'.red}`);
            });
        };
    };

    toggleCompletadas( ids =[] ){

        ids.forEach(id => {
            
            const tarea = this._listado[id];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            };

        });

        this.listadoArr.forEach(tarea => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            };
        });

    };
};

module.exports = Tareas;
