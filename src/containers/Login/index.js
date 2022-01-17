import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import useHistory from 'react-router-dom'
import LOGIN from './graphql'
const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [login, { error, loading }] = useMutation(LOGIN, {
        variables: {
            email,
            password: pw
        },
        onCompleted: ({ login: token }) => {
            localStorage.setItem('token', token)
            history.push("/home")
        },
    })
    return (
        <div>
            <form>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="first name"></input>
                <input value={pw} onChange={e => setPw(e.target.value)} placeholder="last name"></input>
                {loading ? "loading" : <button onClick={() => login}> Add Author </button>}
            </form>
        </div >)
}

//all authors + add author and update hte cache thta holds all authors w cache manip
export default Login
