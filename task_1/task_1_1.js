process.stdin.setEncoding('utf8')
process.stdin.resume()

process.stdin.on('readable', () => {
    let str = process.stdin.read()
        .split('')
        .reverse()
        .join('')
    process.stdout.write(`${str}\n\n`)
});
