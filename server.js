const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/:id', function (req, res) {
    const path = `assets/${req.params.id}.mp4`
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        // Sample range is "bytes=983040-"
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0])
        const end = parts[1]
            ? parseInt(parts[1])
            : fileSize - 1

        const chunksize = (end - start) + 1
        const stream = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }

        // 206: Partial Content
        res.writeHead(206, head)
        stream.pipe(res)
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})
