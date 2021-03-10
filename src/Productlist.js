import { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import { API, IMAGE_URl } from "./backend";
import { Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Productlist = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        fetchMyAPI()
    }, [])

    async function fetchMyAPI() {
        let result = await fetch(`${API}list`);
        result = await result.json();
        setData(result);
    }


    let deleteOpration = async (productid) => {
        let result = await fetch(`${API}delete/` + productid, {method:'DELETE'})
        result = await result.json();
        if (result) {
            fetchMyAPI();
        }
    }


    return (
        <>
            <Header />

            <div className="col-sm-8 offset-sm-2">
                <h3>Product list</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Oprations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                { item.gallery != null
                                    ? <td><img style={{ width: 70 }} src={item.gallery} alt="" /></td>
                                    :
                                    <td> {item.file_path!=null?<img style={{ width: 70 }} src={`${IMAGE_URl}` + item.file_path} alt="" />:''} </td>
                                }
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td> 
                                    <button type="button" className="btn btn-danger" onClick={() => deleteOpration(item.id)}>Delete</button>
                                    <Link to={`/update/${item.id}`} activeClassName="active">Update</Link>
                                
                                </td>
                            </tr>
                        )
                        )}

                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Productlist;