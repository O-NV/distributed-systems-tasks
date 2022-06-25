const express = require('express');
const bodyParser = require('body-parser')
const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

const PORT = 3000;
const QUERY = {
  showPatientsAccordingToRut:'SELECT * FROM pacientes WHERE rut=? ALLOW FILTERING;',
  insertPatient:'INSERT INTO pacientes (id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?);',
  insertPrescription: 'INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);',
  showPrescriptionsById: 'SELECT * FROM recetas WHERE id=? ALLOW FILTERING',
  updatePrescription: 'UPDATE recetas SET comentario = ?, farmacos = ?, doctor = ?  WHERE id=?;',
  deletePrescriptionById: 'DELETE FROM recetas WHERE id=?;'
}

const client = new cassandra.Client({
  contactPoints: ['cassandra-node1', 'cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXNzYW5kcmEiOiJjdWxpYSJ9.fc6sW-Gx4RmJ6mGDTL-f6WsH6VZIj_s4NyTIFIrdGvY'),
  keyspace: 'patients'
});

const client_2 = new cassandra.Client({
  contactPoints: ['cassandra-node1', 'cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXNzYW5kcmEiOiJjdWxpYSJ9.fc6sW-Gx4RmJ6mGDTL-f6WsH6VZIj_s4NyTIFIrdGvY'),
  keyspace: 'prescriptions'
});

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/create', async (req, res) => {

  const IDs = {
    patient: uuidv4(),
    prescription: uuidv4() 
  }
  const result = await client.execute(QUERY.showPatientsAccordingToRut,[req.body.rut])
  if(result.rows[0]) {
    client_2.execute(QUERY.insertPrescription,
      [
        IDs.prescription, 
        result.rows[0].id, 
        req.body.comentario, 
        req.body.farmacos, 
        req.body.doctor
      ])
    res.json({'recetaId': IDs.prescription})
  } else {
    const exec1 = client.execute(QUERY.insertPatient,
      [
        IDs.patient, 
        req.body.nombre, 
        req.body.apellido, 
        req.body.rut, 
        req.body.email, 
        req.body.fecha_nacimiento
      ])
    if(exec1) {
      const  exec2 = client_2.execute(QUERY.insertPrescription,
        [
          IDs.prescription, 
          IDs.patient, 
          req.body.comentario, 
          req.body.farmacos, 
          req.body.doctor
        ])
        exec2 ? res.json({'recetaId': IDs.prescription, "pacienteId": IDs.patient }) : res.json('No receta');
    } else { 
      res.json('No paciente')
    }
  }
});

app.post('/edit', async (req, res) => {

    client_2.execute(QUERY.showPrescriptionsById, [req.body.id]).then(result => {
      if(result.rows[0]) {
        const exec = client_2.execute(QUERY.updatePrescription, 
          [
            req.body.comentario, 
            req.body.farmacos, 
            req.body.doctor, 
            req.body.id
          ])
        exec ? res.json("Receta actualizada correctamente"): res.json("Receta no actualizada");
      } else {
        res.json("La Receta no Existe");
      }
    })
});

app.post('/delete', async (req, res) => {

    client_2.execute(QUERY.showPrescriptionsById, [req.body.id]).then(result => {
      if(result.rows[0]) {
        const exec = client_2.execute(QUERY.deletePrescriptionById, [req.body.id])
         exec ? res.json("Receta eliminada correctamente") : res.json("Receta no eliminada");
      } else {
        res.json("La Receta no Existe");
      }
    })
});

app.listen(PORT, () => {
  console.log(`CLIENT RUN AT http://localhost:${PORT}`);
});
