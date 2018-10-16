import React from 'react';

const Login = () => {
  return (
    <div>
      <form>
        <input type="text" name="login-username" placeholder="username" />
        <br />
        <input type="password" name="login-password" placeholder="password" />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Login;
