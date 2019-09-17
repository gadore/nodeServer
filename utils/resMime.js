//resMime.js
exports.getMime = (fs, extname) => {
    var data = fs.readFileSync('./utils/mime.json');
    var Mimes = JSON.parse(data.toString());
    return Mimes[extname] || 'text/html'
}