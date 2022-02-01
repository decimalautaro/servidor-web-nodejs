//se encarga de manejar los datos (CRUD)


const { response } = require('express')
const data = require ('./MOCK_DATA.json')

// desarrollar modulos dentro de node
module.exports = {
    getUsers: ()=> data,
    getUser: (id)=>{
        let identificador = Number(id)
        let user = data.filter((person)=> person.id === identificador)
        return user
    },
    createUser: (dataUser)=>{
        let newUser = {
            id: data.length + 1, //suponiendo que viene el id ordenado
            ...dataUser,

        }
        data.push(newUser)
        return newUser
    },

  
    updateUser: (id, newData) => {
        let identificador  = Number(id);
        let userActualizado = data.find( (userActualizado) => userActualizado.id === identificador);
        if (userActualizado == undefined) {
            return ("El usuario que intenta actualizar no existe");
        } else {
            userActualizado.first_name = newData.first_name;
            userActualizado.last_name = newData.last_name;
            userActualizado.email = newData.email;
            return (`Datos acutualizados de ${userActualizado.first_name} con ID ${userActualizado.id}`);
        }
    },

    deleteUser: (id)=>{
        let identificador  = Number(id);
        let user = data.filter( (person) => person.id === identificador)[0];
        if (user == undefined) {
            return ("El usuario que intenta eliminar no existe");
        } else {
            let userAEliminar = data.findIndex((userToDelete) => userToDelete.id === identificador);
            data.splice(userAEliminar, 1);
            return data
        }
        
    }

}






