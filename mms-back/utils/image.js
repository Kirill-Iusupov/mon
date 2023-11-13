const sharp = require('sharp');

const minimized = async (input, output, format = 'jpeg') => {
    try {
        const destination = `${output}${format}`;
        console.log('MINIMIZED IMAGE destination', destination);

        await sharp(input)
            .resize(100, 100, {
                fit: sharp.fit.outside,
                withoutEnlargement: true,
            })
            .toFormat(format)
            .toFile(destination);
        return true;
        // Write code to store image to the database
    } catch (e) {
        console.log('MINIMIZED IMAGE ERROR');
        console.log(e);
        return false;

        // handles error if any
    }
};
const normal = async (input, output, format = 'jpeg') => {
    try {
        const destination = `${output}${format}`;
        console.log('Normal IMAGE destination', destination);

        await sharp(input)
            .resize(500, 500, {
                fit: sharp.fit.outside,
                withoutEnlargement: true,
            })
            .toFormat(format)
            .toFile(destination);
        return true;

        // Write code to store image to the database
    } catch (e) {
        console.log('Normal IMAGE ERROR');
        console.log(e);
        return false;
        // handles error if any
    }
};
const withoutConfig = async (input, output, format = 'jpeg') => {
    try {
        const destination = `${output}${format}`;
        console.log('withoutConfig IMAGE destination', destination);

        await sharp(input)
            .toFormat(format)
            .toFile(destination);

        return true;
        // Write code to store image to the database
    } catch (e) {
        console.log('withoutConfig IMAGE ERROR');
        console.log(e);
        return false;
        // handles error if any
    }
};
module.exports = { minimized, normal, withoutConfig };
