const datauriperser = require('datauri/parser')
const path = require('path')

const getFile = async(file) => {
    const parser = new datauriperser()
    const extName = path.extname(file.originalname).toString()
    return parser.format(extName, file.buffer)
}
module.exports = getFile()