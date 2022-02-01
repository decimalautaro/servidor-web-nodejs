const express = require('express');

const morgan = require('morgan')
const _ = require('underscore')

const Service = require ('./src/service')

const app= express();
const PORT = 3000;



app.use (morgan('dev')) //permite ver por consola lo que recibe el sv
app.use(express.json()) // esta propiedad permite recibir datos desde el cliente




//Rutas 
app.get('/', (req, res)=>{
    res.json({
        mensaje: 'Lista de usuarios',
        body: Service.getUsers()
    })
})

app.get('/:id', (req, res)=>{
    let {params: {id}} = req // desestructuracion de objetos
    let user = Service.getUser(id)

    res.json({
        mensaje: `Usuario ${id}`,
        body: user
    })
})

app.post('/', (req,res)=>{
    // let newUser = req.body
    let {body: newUser}= req 
    let user = Service.createUser(newUser)

    res.status(201).json({
        mensaje: 'El usuario fue creado con exito',
        body: user
    })
})

app.put('/:id', (req, res) => {

    let { params : {id} } = req;
    let { body: newUpdate } = req;
    
    res.json(Service.updateUser(id, newUpdate));
});



app.delete ('/:id',(req, res)=>{  // ELIMINAR

    let {params: {id}} = req  
    res.json({
        body : Service.deleteUser(id)
    })

})

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})










