import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bgImage from "../assets/LoginBg.jpg";
import "../css/Login.css";
import Header from "../Components/Header";
import axios from "axios";
import { getUserRole } from "../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    userName: "",
    email: "",
    password: "",
  });
  const { role, userName, email, password } = formData;

  useEffect(() => {
    async function fetchPage() {
      if (getUserRole().role === "admin") {
        await axios.get("http://localhost:9000/register").then((response) => {
          console.log(response);
        });
      } else {
        navigate("/");
      }
    }
    fetchPage();
  }, []);

  //Onchange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/register", {
        role,
        userName,
        email,
        password,
      });
      // const { success, redirectUrl } = response.data;
      console.log(response);
      if (response) {
        // Redirect to the specified URL
        window.alert("Register success");

        console.log("Registered");
      }
    } catch (err) {
      // console.log("Invalid username or password");
      return false;
    }
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <div className="form-box login">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              {/* <div className='input-box'>
              <span className='icon'>
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <input type="text" required />
              <label htmlFor=""> FullName</label>
            </div> */}
              <div className="selectCategory">
                <label for="role">Assigned Role:</label>
                <select
                  required
                  name="role"
                  // value={formData.floorNo}
                  value={formData.role}
                  // onChange={handleChange}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="person-outline"></ion-icon>
                </span>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="userName"> Username</label>
              </div>

              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail-outline"></ion-icon>
                </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email"> Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password"> Password</label>
              </div>
              <button type="submit" className="btn2">
                {" "}
                Register
              </button>
              <div className="login-register">
                <p>
                  Already have an account?
                  <NavLink className={"register-link"} to="/login">
                    Login
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
// import React ,{useState}from 'react'
// import { Link ,useNavigate} from 'react-router-dom'
// import axios from 'axios'

// const Login = () => {
//   const history = useNavigate();

//   const [email,setEmail]= useState('')
//   const [password,setPassword]= useState('')

//   const submit = async(e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:5173/register",{
//         email,password
//       })
//       .then(res=>{
//         if(res.data=="exist")
//           {
//             alert("User already exists!")
//           }
//         else if(res.data=="notexist"){

//            history("/admin",{state:{id:email}})
//         }
//       })
//       .catch(e=>{
//         alert("wrong details")
//         console.log(e);
//       })

//     } catch (error) {
//         console.log(error);
//     }
//   }

//   return (
//     <div>
//       <h1>Register</h1>

//       <form action="POST">
//         <input type="email" onChange={(e) => {setEmail(e.target.value)}}  placeholder='email'/>
//         <input type="password" onChange={(e) => {setPassword(e.target.value)}}  placeholder='password'/>
//        <input type="submit" onClick={submit} />
//       </form>
//       <br />
//       <p>OR</p>
//       <br />
//       <Link to ='/login'>Login</Link>

//     </div>
//   )
// }

// export default Login

// import axios from 'axios'
// import React, { useState } from 'react'
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom'

// const Register = () => {
//     const navigate= useNavigate();
//     const [data,setData]= useState({
//         name: '',
//         email:'',
//         password:'',
//     } )

//     const registerUser = async(e) =>{
//       e.preventDefault()
//       const {name,email,password} = data
//       try{
//         const{data} = await axios.post('/register',{
//           name, email,password
//         })
//         if(data.error){
//           toast.error(data.error)
//         }else{
//           setData({})
//           toast.success('Login Successful!')
//           navigate('/login')
//         }
//       }

//       catch(error){
//         console.log(error)
//       }
//   }

//   return (
//     <div>
//         <form onSubmit={registerUser}>
//         <label >Name</label>
//         <input type="text" placeholder='Enter name' value={data.name
//         } onChange={(e) =>
//             setData({...data, name:e.target.value})
//         }/>
//         <label >Email</label>
//         <input type="email" placeholder='Enter Email' value={data.email
//         } onChange={(e) =>
//             setData({...data, email:e.target.value})
//         } />
//         <label >Password</label>
//         <input type="password" placeholder='Enter password' value={data.password
//         } onChange={(e) =>
//             setData({...data, password:e.target.value})
//         }/>
//         <button type='submit'>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Register
