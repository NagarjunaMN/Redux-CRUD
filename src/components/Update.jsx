import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../Action/UserAction'
import { useNavigate, useParams } from 'react-router-dom'
import UserApi from '../API/UserApi'

function Update() {
  const [user,setUser] = useState({
    firstName : '',
    lastName : '',
    age : 0,
    email : '',
    phone : ''
  })
  const [gender,setGender] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    const readValue= async () => {
      const res = await UserApi.getSingle(params.id)
      console.log("single user = ",res.data)
      setUser(res.data)
      setGender(res.data.gender)
    }  
    readValue()
  },[])

  const readValue = async (e) => {
    const {name,value} = e.target
    setUser({...user,[name] : value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      let newUser = {
        ...user,
        gender
      }
      console.log("updated user =",newUser) 
      dispatch(updateUser({user: newUser, id: params.id})) 
      .unwrap()
      .then(res => {
        toast.success(" User updated successfully")
        navigate('/')
      }).catch(err => toast.error(err.response.data.msg))
      
    } catch (err) {
        toast.error(err.message)
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Update User</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form autoComplete="off" onSubmit={submitHandler}>
            <div className="form-group mt-2">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name='firstName' value={user.firstName} onChange={readValue} id='firstName' className="form-control" required/>
            </div>
            <div className="form-group mt-2">
            <label htmlFor="lastName">Last Name</label>
              <input type="text" name='lastName' value={user.lastName} onChange={readValue} id='lastName' className="form-control" required/>
            </div>
            <div className="form-group mt-2">
            <label htmlFor="age">Age</label>
              <input type="number" name='age' value={user.age} onChange={readValue} id='age' className="form-control" required/>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="gender">Gender</label>
              <br />
              <div className="form-check form-check-inline">
                <input type="radio" name="gender" id="gender" value={"male"} checked={gender == "male"} onChange={(e) => setGender(e.target.value)} className='form-check-input' required />
                <label htmlFor="gender" className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="radio" name="gender" id="gender" value={"female"} checked={gender == "female"} onChange={(e) => setGender(e.target.value)} className='form-check-input' required />
                <label htmlFor="gender" className="form-check-label">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="radio" name="gender" id="gender" value={"transgender"} checked={gender == "transgender"} onChange={(e) => setGender(e.target.value)} className='form-check-input' required />
                <label htmlFor="gender" className="form-check-label">Transgender</label>
              </div>
            </div>
            <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
              <input type="email" name='email' value={user.email} onChange={readValue} id='email' className="form-control" required/>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="phone">Phone</label>
              <input type="text" name='phone' value={user.phone} onChange={readValue} id='phone' className="form-control" required/>
            </div>
            <div className="form-group mt-2">
              <input type="submit" value="Update User" className='btn btn-success' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
