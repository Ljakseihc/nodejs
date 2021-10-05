import path from 'path'
import fs from 'fs'
import csvtojson from 'csvtojson'

const pathToFile = path.resolve('task_1/csv', 'nodejs-hw1-ex1')
const rStream = fs.createReadStream(`${pathToFile}.csv`)
const wStream = fs.createWriteStream(`${pathToFile}.txt`)

const handleError = () => {
    rStream.destroy()
    wStream.end()
    console.log('Creating txt file is failed');
}

rStream
    .on('rStream error', handleError)
    .pipe(csvtojson())
    .on('csvtojson error', handleError)
    .pipe(wStream)
    .on('wStream error', handleError)
