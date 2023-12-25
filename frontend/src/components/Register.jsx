import React, {useState} from 'react'
import AuthUser from '../utils/AuthUser';

const Register = () => {
  const {register,saveToken} = AuthUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    register(name, email, password)
      .then(res => {
        saveToken(res.data.user,res.data.access_token);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <form>
            <div className="form-group row mb-3">
              <label htmlFor="name">Name
                <input type="text" className="form-control mt-1" value={name} name="name" onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="email">Email
                <input type="email" className="form-control mt-1" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="password">Password
                <input type="password" className="form-control mt-1" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
              </label>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={() => handleSubmit()}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register