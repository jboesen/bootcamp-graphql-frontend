import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import ADD_AUTHOR from './graphql'
import ALL_AUTHORS from '../Home/graphql'

const Change = () => {
    const history = useHistory()
    const token = localStorage.getItem('token')
    if (!token) {
        history.push('/')
    }
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [addAuthor, { error, loading }] = useMutation(ADD_AUTHOR, {
        variables: { fName, lName },
        update: (client, { data: { addAuthor } }) => {
            try {
                const data = client.readQuery({ query: ALL_AUTHORS })
                // check if allAuthors is right
                data.allAuthors = [...data.allAuthors, addAuthor]

                client.writeQuery({ query: ALL_AUTHORS, data })
            } catch (error) {
                alert("Could not add author")
            }
        }
    })
    return (
        <div>
            <form>
                <input value={fName} onChange={e => setFName(e.target.value)} placeholder="first name"></input>
                <input value={lName} onChange={e => setLName(e.target.value)} placeholder="last name"></input>
                {loading ? "loading" : <button onClick={addAuthor}> Add Author </button>}
            </form>
        </div>)
}

//all authors + add author and update hte cache thta holds all authors w cache manip
export default Change
