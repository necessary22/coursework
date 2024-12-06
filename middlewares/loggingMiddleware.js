const fs = require('fs')
const path = require('path')

const logFile = path.join(__dirname, '../logs/access.log')

if (!fs.existsSync(path.dirname(logFile))) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true })
}

const loggingMiddleware = (req, res, next) => {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip} - User-Agent: ${req.headers['user-agent']}\n`
    
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Ошибка записи в лог:', err)
    })

    next()
}

module.exports = loggingMiddleware
