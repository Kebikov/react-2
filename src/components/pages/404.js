import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link to="/" style={{fontWeight: "bold", fontSize: '24px', margin: '0 auto'}}>ON Main Page</Link>
        </div>
    )
}

export default Page404;