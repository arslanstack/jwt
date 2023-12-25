import React, {useEffect} from 'react'
import AuthUser from '../utils/AuthUser';
import Login from './Login';

const Dashboard = () => {
  const user = AuthUser().getUser();
  const me = AuthUser().me();

  useEffect(() => {
    me.then(res => {
      console.log(res);
    })
  }
  ,[])
  return (
    <div>Welcome {user.name} !</div>
  )
}

export default Dashboard