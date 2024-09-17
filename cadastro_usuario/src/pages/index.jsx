import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../assets/16qg.svg'
import api from '../services/api'

function Home() {
  
  const [users, set_users] = useState([])

  const input_name = useRef()
  const input_age = useRef()
  const input_email = useRef()

  async function get_users(){
    const users_from_api = await api.get('/usuarios')
    
    set_users(users_from_api.data)
  }

  async function create_users(){
    await api.post('/usuarios', {
      name: input_name.current.value,
      age: input_age.current.value,
      email: input_email.current.value
    })    

    get_users()
  }

  async function delete_users(id){
    await api.delete(`/usuarios/${id}`)

    get_users()
    
  }

  useEffect(() =>{
    get_users()
  }, [])

  return (
    
      <div className='container'>
        <form >
          <h1>Cadastro de Usuarios</h1>
          <input placeholder='Nome'   name='name'   type='text'   ref={input_name}/>
          <input placeholder='Idade'  name='age'    type='number' ref={input_age}/>
          <input placeholder='Email'  name='email'  type='email'  ref={input_email}/>
          <button type='button' onClick={create_users}>Cadastrar </button>
        </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome:  <span>{user.name}   </span></p>
            <p>Idade: <span>{user.age}    </span></p>
            <p>Email: <span>{user.email}  </span></p>
          </div>
          <button onClick={() => delete_users(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
      </div>
  )
}

export default Home
//npm run dev