import { conectar } from '../Config/configDB.js';

export const insertUserMetadata = (data) => {

    const sql = 'INSERT INTO usuarioprofesor (ID_profe, ID_Azure, Pais, Contacto, Biografia, Url_foto) VALUES (?, ?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        conectar.query(sql, [data.ID_profe, data.ID_Azure, data.Pais, data.Contacto, data.Biografia, data.Url_foto], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


export const getUserByAzureId = async (ID_Azure) => {
    const sql = 'SELECT ID_Azure FROM usuarioprofesor WHERE ID_Azure = ?';

    return new Promise((resolve, reject) => {
        conectar.query(sql, [ID_Azure], (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

export const insertWalletdata = (data) => {

    const sql = 'INSERT INTO wallet (ID_Wallet, ID_profe, Saldo) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
        conectar.query(sql, [data.ID_Wallet, data.ID_profe, data.Saldo], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export const getUserProfeCompleteDetailsByAzureId = async (ID_Azure) => {
    const sql = `
        SELECT 
            usuarioestudiante.Nombre, 
            usuarioestudiante.Apellido,
            usuarioestudiante.Correo,
            usuarioprofesor.Pais, 
            usuarioprofesor.Contacto, 
            usuarioprofesor.Biografia, 
            usuarioprofesor.Url_foto,
            wallet.Saldo
        FROM usuarioestudiante
        JOIN usuarioprofesor ON usuarioestudiante.ID_Azure = usuarioprofesor.ID_Azure
        JOIN wallet ON usuarioprofesor.ID_profe = wallet.ID_profe
        WHERE usuarioestudiante.ID_Azure = ?
    `;

    return new Promise((resolve, reject) => {
        conectar.query(sql, [ID_Azure], (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

export const checkIfAzureIdExists = async (ID_Azure) => {
    const sql = 'SELECT ID_Azure FROM usuarioestudiante WHERE ID_Azure = ?';

    return new Promise((resolve, reject) => {
        conectar.query(sql, [ID_Azure], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results.length > 0);
        });
    });
};


export const getAllProfeFromDB = async () => {
    const sql = `
        SELECT 
            usuarioestudiante.Nombre, 
            usuarioestudiante.Apellido,
            usuarioestudiante.Correo,
            usuarioprofesor.Pais, 
            usuarioprofesor.Contacto, 
            usuarioprofesor.Biografia, 
            usuarioprofesor.Url_foto
        FROM usuarioestudiante
        JOIN usuarioprofesor ON usuarioestudiante.ID_Azure = usuarioprofesor.ID_Azure
    `;

    return new Promise((resolve, reject) => {
        conectar.query(sql, [], (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            if (results.length > 0) {
                resolve(results);
            } else {
                resolve([]);
            }
        });
    });
};

