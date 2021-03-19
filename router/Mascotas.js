const express = require('express'); 
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {
    
    try {
        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)
        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
    
            // arrayMascotas:[
            //     {id: '1', nombre:'rex', descripcion: 'rex descripcion'},
            //     {id: '2', nombre:'chanchan', descripcion: 'chanchan descripcion'},
            // ]
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/crear', (req, res) => {
    res.render('crear');
});

router.post('/', async(req, res) => {
    const body = req.body
    try {
        const MascotaDB = new Mascota(body);
        await MascotaDB.save();

        // await Mascota.create(body);
        res.redirect('/mascotas');
    } catch (error) {
        
    }
})

router.get('/:id', async(req, res) => {
    
    const id = req.params.id
    try {
        const mascotaDB  = await Mascota.findOne({_id: id});
        console.log("esta es la id del documento", mascotaDB);

        res.render('detalle',{
            mascota: mascotaDB,
            error: false
        })

    } catch (error) {
        res.render('detalle',{
            error: true,
            mensaje: ' No se encuentra la id seleccionada'
        })
    }
})


router.delete('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const mascotaDB  = await Mascota.findByIdAndDelete({_id: id})
        if(mascotaDB) {
            res.json({
                estado: true,
                mensaje: 'Eliminado'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'Fallo eliminar :C'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req, res) => {
    
    const id = req.params.id
    const body = req.body
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )

        console.log(mascotaDB)

        res.json({
            estado: true, 
            mensaje: 'Editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false, 
            mensaje: 'Editado fallo'
        })
    }
})

module.exports = router;