const express = require('express');
const bp = require('body-parser')
const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');
// const cors = require("cors");

const PORT = 3000;
const HOST = '0.0.0.0';

const client = new cassandra.Client({
  contactPoints: ['cassandra-node1', 'cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'password123'),
  keyspace: 'medic_1'
});

const client_2 = new cassandra.Client({
  contactPoints: ['cassandra-node1', 'cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'password123'),
  keyspace: 'medic_2'
});

const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post('/create', (req, res) => {
  // const query1 = 'SELECT * FROM pacientes WHERE rut=?;';
  // const query2 = 'INSERT INTO pacientes (id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?);'; 
  // const query3 = 'INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);';
  // const idPaciente = 0;
  // const idReceta = 0;
  // const result = await client.execute(query1,[req.body.rut])
  // if(result.rows) {
  //   client_2.execute(query3,
  //     [
  //       idReceta, 
  //       req.body.rows[0].id, 
  //       req.body.comentario, 
  //       req.body.farmacos, 
  //       req.body.doctor
  //     ])
  //   res.json({'ID_Receta': idReceta})
  //   idReceta =+ 1;
  // } else {
  //   const exec1 = client.execute(query2,
  //     [
  //       idPaciente, 
  //       req.body.nombre, 
  //       req.body.apellido, 
  //       req.body.rut, 
  //       req.body.email, 
  //       req.body.fecha_nacimiento
  //     ])
  //   if(exec1) {
  //     const  exec2 = client_2.execute(query3,
  //       [
  //         idReceta, 
  //         idPaciente, 
  //         req.body.comentario, 
  //         req.body.farmacos, 
  //         req.body.doctor
  //       ])
  //       exec2 ? res.json({'ID_Receta': idReceta}) : res.json('No receta');
  //       idReceta =+ 1;
  //       idPaciente =+ 1;
  //   } else { 
  //     res.json('No paciente')
  //   }
  // }

  (async () => {
    const query = 'SELECT * FROM pacientes WHERE rut=? ALLOW FILTERING';
    const query2 = "INSERT INTO pacientes (id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?);";
    const query3 = "INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);";
    const receta = req.body;
    var gen_id_1 = uuidv4();
    var gen_id_2 = uuidv4();
    console.log("Receta: ",receta)
    console.log("ID gen para Paciente: ",gen_id_1)
    console.log("ID gen para Receta: ",gen_id_2)

    await client.execute(query,[receta.rut]).then(result => {
      console.log('Result ' + result.rows[0]);

      if(result.rows[0] != undefined){
        console.log("existe el paciente")
        client_2.execute(query3,[gen_id_2,result.rows[0].id,receta.comentario,receta.farmacos,receta.doctor]).then(result2 => {
          console.log('Result ' + result2);
          res.json({'ID_Receta': gen_id_2})
        }).catch((err) => {console.log('ERROR:', err);});

      }else{
        console.log("No existe el paciente")
        client.execute(query2,[gen_id_1,receta.nombre,receta.apellido,receta.rut,receta.email,receta.fecha_nacimiento]).then(result => {
          console.log('Result ' + result);
          client_2.execute(query3,[gen_id_2,gen_id_1,receta.comentario,receta.farmacos,receta.doctor]).then(result2 => {
            console.log('Result ' + result2);
            res.json({'ID_Receta': gen_id_2})
          }).catch((err) => {console.log('ERROR:', err);});
        }).catch((err) => {console.log('ERROR:', err);});
      }
    }).catch((err) => {console.log('ERROR:', err);});
  })();

});

// app.post('/edit', async (req, res) => {
//     const query1 = 'SELECT * FROM recetas WHERE id=?';
//     const query2 = 'UPDATE recetas SET comentario = ?, farmacos = ?, doctor = ?  WHERE id=?;';

//     client_2.execute(query1, [req.body.id]).then(result2 => {
//       if(result.rows) {
//         const exec = client_2.execute(query2, 
//           [
//             req.body.comentario, 
//             req.body.farmacos, 
//             req.body.doctor, 
//             req.body.id
//           ])
//         exec ? res.json("Receta actualizada"): res.json("Receta no actualizada");
//       } else {
//         res.json("La Receta no Existe");
//       }
//     })
// });


// app.post('/delete', async (req, res) => {
//     const query1 = 'SELECT * FROM recetas WHERE id=?';
//     const query2 = "DELETE FROM recetas WHERE id=?;";
//     client_2.execute(query1, [req.body.id]).then(result2 => {
//       if(result.rows) {
//         const exec = client_2.execute(query2, [req.body.id])
//          exec ? res.json("Receta Eliminada") : res.json("Receta no eliminada");
//       } else {
//         res.json("La Receta no Existe");
//       }
//     })
// });

app.listen(PORT, HOST, () => {
  console.log(`CLIENT RUN AT http://localhost:${PORT}`);
});