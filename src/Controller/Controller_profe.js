import {
    checkIfUserIsProfeWithCompleteDetails, getAllProfeDetails,
    IntroDataProfe,
    uploadImageToBlob
} from "../Services/Services_profe.js"
import { v4 as uuidv4 } from 'uuid';

export const New_profe = async (req, res) => {
    try {
        // Generar UUID
        const ID_profe = uuidv4();
        const {ID_Azure, Pais, Contacto, Biografia} = req.body;

        if (!req.files || !req.files.image) {
            return res.status(201).json("Imagen requerida");
        }
        const imagenFile = req.files.image ? req.files.image[0] : null;

        const Url_foto = await uploadImageToBlob(imagenFile);

        if(!ID_Azure || !Pais || !Contacto || !Biografia || !Url_foto){
            console.log('No se están enviando todos los datos')
            return res.status(201).json({
                message: 'No se están enviando todos los datos'})
        }

        //Save the Data
        await IntroDataProfe(ID_profe, ID_Azure, Pais, Contacto, Biografia, Url_foto)

        const userDetails = await checkIfUserIsProfeWithCompleteDetails(ID_Azure);

        if (userDetails) {
            res.status(200).json(userDetails);
        } else {
            res.status(500).json('Error al recuperar detalles de usuario');
        }

    } catch (err) {
        console.error(err);
        if(err.message === "El ID_Azure proporcionado no existe en usuario estudiante.") {
            return res.status(201).json(err.message);
        }
        res.status(500).json('Error al almacenar datos de usuario');
    }
}

export const
    verifyProfe = async (req, res) => {
    const {ID_Azure} = req.body;
    if (!ID_Azure) {
        return res.status(201).json("ID_Azure no proporcionado");
    }

    try {
        const userData = await checkIfUserIsProfeWithCompleteDetails(ID_Azure);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(201).json({message: "El usuario no es profesor o no tiene detalles asociados"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Error al verificar detalles del profesor');
    }
};

export const getAllProfes = async (req, res) => {
    try {
        const profes = await getAllProfeDetails();

        if (profes.length) {
            res.status(200).json(profes);
        } else {
            res.status(201).json({ message: 'No se encontraron profesores.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los profesores.' });
    }
};