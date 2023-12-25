import React, {useState} from 'react'
import AuthUser from '../utils/AuthUser';

const Login = () => {
  const {login,saveToken} = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(email, password)
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
              <label htmlFor="email">Email
                <input type="email" className="form-control mt-1" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="email">Password
                <input type="password" className="form-control mt-1" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
              </label>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={() => handleSubmit()}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login