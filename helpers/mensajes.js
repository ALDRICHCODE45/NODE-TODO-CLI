require('colors');

const mostrarMenu = (  ) => {

    return new Promise( resovle => {
        console.clear();
        console.log('==========================='.green)
        console.log('seleccione una opcion'.green)
        console.log('===========================\n'.green)

        console.log(`${'1'.green}. Crear Tarea`);
        console.log(`${'2'.green}. Listar Tarea`);
        console.log(`${'3'.green}. Listar Tareas Completadas`);
        console.log(`${'4'.green}. Listar Tareas Pendientes`);
        console.log(`${'5'.green}. Completar Tarea(s)`);
        console.log(`${'6'.green}. Borrar Tarea`);
        console.log(`${'0'.green}. salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opccion: ', (opt) => {
            readline.close();
            resovle(opt);
        });
    });
};

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\n Presione ${'ENTER'.green} para continuar`, (opt) => {
            readline.close();
            resolve();
        });
    });
};


module.exports ={
    mostrarMenu,
    pausa
};
