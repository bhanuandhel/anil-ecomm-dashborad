import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API, IMAGE_URl } from "./backend";
import Header from "./Header";
const UpdateProduct = () => {
    const { productId } = useParams();
    let history = useHistory();
    const { handleSubmit, register } = useForm();
    const [data, setdata] = useState([]);
    const [alert, setalert] = useState(false);
    const [formerror, setformerror]= useState(false);


    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push('./register');
        }
    }, [history])

    useEffect(() => {
        getproduct();
    }, [productId])

    const getproduct = async () => {
        let returndata = await fetch(`${API}list/${productId}`);
        returndata = await returndata.json();
        setdata(returndata)
    }

    const onSubmit = async (data) => {
        console.log(data);
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
                                    <input type="text" className="form-control" placeholder="Enter Your Name" ref={register} name="name" defaultValue={data.name} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label >Price</label>
                                    <input type="text" className="form-control" placeholder="Enter Price" ref={register} name="price" defaultValue={data.price} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-12">
                                    <label >description</label>
                                    <input type="text" className="form-control" placeholder="Enter Description" ref={register} name="prdescriptionice" defaultValue={data.description} />
                                </div>
                            </div>

                            <div className="form-group">
                            { data.gallery != null
                                    ? <img style={{ width: 70 }} src={data.gallery} alt="" />
                                    :
                                    <> {data.file_path!=null?<img style={{ width: 70 }} src={`${IMAGE_URl}` + data.file_path} alt="" />:''} </>
                                }
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

export default UpdateProduct;