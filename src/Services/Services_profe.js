import {
    checkIfAzureIdExists, getAllProfeFromDB,
    getUserByAzureId,
    getUserProfeCompleteDetailsByAzureId,
    insertUserMetadata,
    insertWalletdata
} from "../Model/Model_profe.js"
import {createBlockBlobFromStream, generateBlobURL, getBlobName, getStreamAsync} from "./blobServices.js";
import {v4 as uuidv4} from "uuid";



export const IntroDataProfe = async (ID_profe, ID_Azure, Pais, Contacto, Biografia, Url_foto) => {

    // Verificar si el ID_Azure existe en usuarioestudiante
    const azureIdExists = await checkIfAzureIdExists(ID_Azure);

    if (!azureIdExists) {
        throw new Error("El ID_Azure proporcionado no existe en usuarioestudiante.");
    }
    // Verificar si el Usuario ya existe como profesor
    const existingProfe = await getUserByAzureId(ID_Azure);

    // Si el profesor no existe, lo insertamos
    if (existingProfe === null) {
        console.log("Profesor nuevo, insertando datos");
        const dataToInsert = {
            ID_profe: ID_profe,
            ID_Azure: ID_Azure,
            Pais: Pais,
            Contacto: Contacto,
            Biografia: Biografia,
            Url_foto: Url_foto
        };
        await insertUserMetadata(dataToInsert);

    //Creamos la Wallet
        const dataToWallet = {
            ID_profe: ID_profe,
            ID_Wallet: uuidv4(),
            Saldo: 0
        };
        await insertWalletdata(dataToWallet);
    }
    else {
        console.log("Usuario antiguo:", existingProfe);
    }
}

export const uploadImageToBlob = async (file) => {
    const blobName = getBlobName(file.originalname);
    const containerName = 'imagenes';
    const stream = await getStreamAsync(file.buffer);
    const streamLength = file.buffer.length;

    await new Promise((resolve, reject) => {
        createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });

    return generateBlobURL(containerName, blobName);
}

export const checkIfUserIsProfeWithCompleteDetails = async (ID_Azure) => {
    return await getUserProfeCompleteDetailsByAzureId(ID_Azure);
};

export const getAllProfeDetails = async () => {
    return await getAllProfeFromDB();
};
