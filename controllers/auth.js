import pool from '../database/keys'

const authentication = {}

authentication.signUp = async (req, res) => {
    const { name, email, password, role } = req.body

    if (role == 'professor') {
        try {
            await pool.query(
                'INSERT INTO professor (p_name, p_email, p_password) VALUES ($1, $2, $3);',
                [name, email, password]
            )
            res.status(200).json({
                message: "Professor registrado com sucesso",
                professor: { name, email, password }
            })
        } catch (error) {
            if (error.constraint == 'professor_p_email_key') {
                res.status(500).json({
                    message: "Alguém está usando este e-mail",
                    error
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro",
                    error
                })
            }
        }
    } else {
        try {
            await pool.query(
                'INSERT INTO student (s_name, s_email, s_password) VALUES ($1, $2, $3);',
                [name, email, password]
            )
            res.status(200).json({
                message: "Estudante registrado com sucesso",
                professor: { name, email, password }
            })
        } catch (error) {
            if (error.constraint == 'student_s_email_key') {
                res.status(500).json({
                    message: "Alguém está usando este e-mail",
                    error
                })
            } else {
                res.status(500).json({
                    message: "Ocorreu um erro",
                    error
                })
            }
        }
    }
}

authentication.signIn = async (req, res) => {
    const { email, password, role } = req.body

    if (role == 'professor') {
        try {
            const professor = await (await pool.query(
                'SELECT * FROM professor WHERE p_email=$1 AND p_password=$2',
                [email, password]
            )).rows
            if (professor.length > 0) {
                res.status(200).json({
                    id: professor[0].id_p,
                    name: professor[0].p_name,
                    email: professor[0].p_email,
                    role: "professor"
                })
            } else {
                res.status(200).json({
                    message: "O professor não existe",
                    NotFound: true
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Ocorreu um erro",
                error
            })
        }
    } else {
        try {
            const student = await (await pool.query(
                'SELECT * FROM student WHERE s_email=$1 AND s_password=$2',
                [email, password]
            )).rows
            if (student.length > 0) {
                res.status(200).json({
                    id: student[0].id_s,
                    name: student[0].s_name,
                    email: student[0].s_email,
                    role: "student"
                })
            } else {
                res.status(200).json({
                    message: "O estudante não existe",
                    NotFound: true
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Ocorreu um erro",
                error
            })
        }
    }
}

module.exports = authentication