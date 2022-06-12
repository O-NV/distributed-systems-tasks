CREATE KEYSPACE medic_2
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 3
};

CREATE TABLE medic_2.recetas(
    id int PRIMARY KEY, 
    id_paciente UUID,
    comentario text,
    farmacos text,
    doctor text
);
