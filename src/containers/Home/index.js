import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import GET_AUTHORS from './graphql'
import { useHistory } from 'react-router-dom'
const Home = () => {
    const history = useHistory()
    const token = localStorage.getItem('token')
    if (!token) {
        history.push('/')
    }
    const decodeToken = () => {
        if (!token) {
            throw new Error("Invalid token, please log in")
        }
        try {
            return jwt.verify(token, 'reughdjsasdkpmasipkmsdfadf')
        }
        catch (error) {
            throw new Error("Invalid token, please log in")
        }
    }
    try {
        const decoded = decodeToken(localStorage.getItem('token'))
        if (!decoded) {
            history.push('/')
        }
    }
    catch (err) {
        history.push('/')
    }
    const { loading, error, data } = useQuery(GET_AUTHORS)
    if (loading) return "loading..."
    if (error) return `Error! What happened was ${error}`
    console.log(Object.keys(data.allAuthors))
    console.log(data.allAuthors)
    return (
        <div>{data.allAuthors.map((d) => (
            <p>{d.firstName}</p>
        ))}</div>)
}

//all authors + add author and update hte cache thta holds all authors w cache manip
export default Home
