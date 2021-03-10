import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Protected = (props) => {
    let Cmp = props.Cmp;
    let history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push('./register');
        }
    }, [history])
    return (
        <>
            <Cmp />
        </>
    )
}

export default Protected;