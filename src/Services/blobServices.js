import azureStorage from 'azure-storage';
const blobService = azureStorage.createBlobService();
import * as config from '../Config/config.js';

export const createBlockBlobFromStream = blobService.createBlockBlobFromStream.bind(blobService);

export const generateBlobURL = (containerName, blobName) => {
    return `https://${config.getStorageAccountName()}.blob.core.windows.net/${containerName}/${blobName}`;
};

export const getStreamAsync = async (buffer) => {
    const intoStream = (await import('into-stream')).default;
    return intoStream(buffer);
};
export const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
};

