import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { API } from "./backend";
import Header from "./Header";
const Register = () => {
    const [loginerror, setloginerror]= useState(false);
    
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('./add');
        }
    }, [history])

    const onSubmit = async (data) => {
      let result =  await fetch(`${API}register`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(data)
        }).then(response => { return response.json() })
            .catch(err => console.log(err))
        
            if(result.error!=null){
                setloginerror(result.error)
         }else{
                history.push('/');
         }
    }

    const showerror = ()=>(
        <div className="alert alert-danger" role="alert">
        <p>  {loginerror.email?loginerror.email[0]:''} </p>
        <p>  {loginerror.name?loginerror.name[0]:''} </p>
        <p> {loginerror.password?loginerror.password[0]:''} </p>
        </div>
    )


    return (
        <>
        <Header />
        <div className="App">
            <div className="container py-5">
                <div className="card border-0 shadow  p-4 w-50 mx-auto">
                {loginerror!==false?showerror():''}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className="col-12">
                                <label >Name</label>
                                <input type="text" className="form-control" placeholder="Enter Your Name" ref={register} name="name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-12">
                                <label >Email</label>
                                <input type="text" className="form-control" placeholder="Enter Your E-mail Address" ref={register} name="email" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-12">
                                <label >Passowrd</label>
                                <input type="text" className="form-control" placeholder="Enter Your Password" ref={register} name="password" />
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  </>
    )
}

export default Register;