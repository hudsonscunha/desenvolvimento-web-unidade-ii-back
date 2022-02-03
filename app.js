import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import history from 'connect-history-api-fallback'
import path from 'path'

const app = express()

// Middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({ useTempFiles: true }))

// Rotas
app.use('/', require('./routes/auth.routes'))
app.use('/professor', require('./routes/professor.routes'))
app.use('/student', require('./routes/student.routes'))

// Middlewares para Vue
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

// Configurações
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`Servidor ligado na porta ${app.get('port')}`)
})