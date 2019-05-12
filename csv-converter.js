const csv = require('fast-csv')
const fs = require('fs')
const stream = require('stream')
const args = require('yargs').argv
const utils = require('util')
const mkdir = utils.promisify(fs.mkdir)

const converCsv = () => {

    if(!args.file && !args.out)
        throw new Error('Please provide all argument --file and --out')


    let fileNameColumn = null
    let remainingColumns = null
    const fileMap = {}
    let filesConverted = 0

    const readStream = fs.createReadStream(args.file);

    csv
        .fromStream(readStream)
        .on("data", function (row) {
            if (!fileNameColumn && !remainingColumns) {
                fileNameColumn = row.shift()
                remainingColumns = row
            }
            else {
                const key = row.shift()
                if (!fileMap[key]) {
                    fileMap[key] = [remainingColumns]
                }
                fileMap[key].push(row)
            }
        })
        .on("end", async function () {

            await mkdir(`${args.out}`, { recursive: true })

            const files = Object.keys(fileMap)

            files.forEach((key) => {
                const newWriteStream = fs.createWriteStream(`${args.out}/${key}.csv`)

                csv
                    .write(fileMap[key], {headers: true})
                    .pipe(newWriteStream)
                    .on('finish', async () => {
                        filesConverted++
                        if (filesConverted === files.length) {
                            console.log("files created")
                        }
                    })
                    .on('error', console.log)
            })
        })
}

converCsv()
