import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { API } from "./backend";
import Header from "./Header";

const AddProduct = () => {
    const [alert, setalert] = useState(false);
    const [formerror, setformerror]= useState(false);

    let history = useHistory();
    const { handleSubmit, register } = useForm();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push('./login');
        }
    }, [history])

    const onSubmit = async (data) => {
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("price", data.price);
        formdata.append("descrition", data.prdescriptionice);
        if (data.file.length !== 0) {
            formdata.append("file", data.file[0]);
        }
    let result =  await fetch(`${API}addproduct`, {
            method: "POST",
            //   headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: formdata
        })
            .then(response => {
               return response.json();
            })
            .catch(err => console.log(err))
        
            if(result.error){
                setformerror(result.error)
                setalert(false)
            }else{
                setalert(true)
                setformerror(false)
            }
    }

    const success = () =>(
        <div className="alert alert-success" role="alert">
          Form is Submitted successfully
        </div>
    )

    const showerror = ()=>(
        <div className="alert alert-danger" role="alert">
        <p>  {formerror.name?formerror.name[0]:''} </p>
        <p>  {formerror.price?formerror.price[0]:''} </p>
        <p> {formerror.descrition?formerror.descrition[0]:''} </p>
        </div>
    )

    return (
        <div>
            <Header />
            <div className="App">
                <div className="container py-5">
                    <div className="card border-0 shadow  p-4 w-50 mx-auto">
                        {alert===true?success():''}
                        {formerror!==false?showerror():''}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <div className="col-12">
                                    <label >Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Your Name" ref={register} name="name" />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label >Price</label>
                                    <input type="text" className="form-control" placeholder="Enter Price" ref={register} name="price" />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label >description</label>
                                    <input type="text" className="form-control" placeholder="Enter Description" ref={register} name="prdescriptionice" />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label >Image</label>
                                    <input type="file" name="file" className="form-control" ref={register} />
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddProduct;