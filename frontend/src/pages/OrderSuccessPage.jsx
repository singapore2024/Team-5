import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        navigate("/"); // navigate("/menu");
    };
    return (
        <div>
        <h1>Thank you for your order!</h1>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
            Back to Home
        </button>
        </div>
    )
}

export default OrderSuccessPage