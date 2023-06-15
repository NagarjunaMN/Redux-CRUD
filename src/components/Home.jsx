import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readUser } from '../Action/UserAction'
import { NavLink } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()

  const initData = useCallback(() => {
      dispatch(readUser())
  },[])

  useEffect(() => {
      initData()
  },[])

  const users = useSelector((item) => item.myData.users)

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Users Data</h3>
          </div>
        </div>

        <div className="row">
            {
                users && users.map((item,index) => {
                  return (
                    <div className="col-md-3 col-sm-6 mt-2 mb-2" key={index}>
                      <div className="card">
                        <img src={item.image? item.image: '#'} alt="no image" className="card-img-top" />
                        <div className="card-body">
                          <h4 className="text-center"> {item.firstName} {item.lastName} </h4>
                        </div>
                        <div className="card-footer">
                            <NavLink className="btn btn-sm btn-info">
                                <i className="bi bi-pencil"></i>
                            </NavLink>
                            <button className="btn btn-sm btn-danger float-end">
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                  )
                })
            }
        </div>
    </div>
  )
}

export default Home