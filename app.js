app.post('/guardar-datos', async (req, res) => {
    const { nombre, fechaNacimiento, grupoEdad, genero, vacunas } = req.body;

    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Insertar datos del paciente
        const result = await pool.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('FechaNacimiento', sql.Date, fechaNacimiento)
            .input('GrupoEdad', sql.NVarChar, grupoEdad)
            .input('Genero', sql.NVarChar, genero)
            .query(`INSERT INTO Pacientes (Nombre, FechaNacimiento, GrupoEdad, Genero)
                    OUTPUT INSERTED.PacienteID
                    VALUES (@Nombre, @FechaNacimiento, @GrupoEdad, @Genero)`);

        const pacienteID = result.recordset[0].PacienteID;

        // Insertar datos de vacunas administradas
        const insertVacunaPromises = Object.entries(vacunas).map(([nombreVacuna, fecha]) => {
            return pool.request()
                .input('PacienteID', sql.Int, pacienteID)
                .input('NombreVacuna', sql.NVarChar, nombreVacuna)
                .input('FechaAdministracion', sql.Date, fecha)
                .query(`INSERT INTO AdministracionVacunas (PacienteID, NombreVacuna, FechaAdministracion)
                        VALUES (@PacienteID, @NombreVacuna, @FechaAdministracion)`);
        });

        await Promise.all(insertVacunaPromises);

        res.status(200).send('Datos guardados correctamente.');
    } catch (err) {
        console.error('Error al guardar los datos:', err);
        res.status(500).send('Error al guardar los datos.');
    }
});
