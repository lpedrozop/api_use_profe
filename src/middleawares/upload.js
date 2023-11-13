import multer from 'multer';

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({
    storage: inMemoryStorage
}).fields([
    { name: 'image', maxCount: 1 },
]);

export default uploadStrategy;