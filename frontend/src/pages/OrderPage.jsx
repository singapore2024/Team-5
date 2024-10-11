import { useNavigate } from "react-router-dom";
import { useFormContext } from "../utils/FormContext";
import axios from "axios";
import "../form.css"

export default function OrderPage() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ formData });
//     navigate("/order-success");
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/orders/create", formData);
      console.log(response.data);
      navigate("/order-success");
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("There was an error submitting your order. Please try again.");
    }
  };

  const DUMMY_FOOD_ITEMS = [
    {
      id: "1",
      name: "Nasi Lemak",
      ingredients: ["Rice", "Coconut Milk", "Anchovies", "Egg", "Peanuts"],
      image: "/images/nasilemak.jpg",
    },
    {
      id: "2",
      name: "Chicken Rice",
      ingredients: ["Chicken", "Rice", "Garlic", "Ginger", "Soy Sauce"],
      image: "/images/chicken_rice.jpg",
    },
    {
      id: "3",
      name: "Pasta",
      ingredients: ["Pasta", "Tomato Sauce", "Parmesan", "Basil"],
      image: "/images/pasta.jpg",
    },
    {
      id: "4",
      name: "Sushi",
      ingredients: ["Rice", "Seaweed", "Salmon", "Avocado"],
      image: "/images/sushi.jpg",
    },
    {
      id: "5",
      name: "Salad",
      ingredients: ["Lettuce", "Tomato", "Cucumber", "Olives", "Feta Cheese"],
      image: "/images/salad.jpg",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-center">
          <form className="bg-white form-content" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-8">Order Form</h2>
            <div className="justify-between">
              <label>Email</label>
              <input
                type="text"
                required="required"
                placeholder="Please enter your email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>

            {/* Dropdown for Food Item */}
            <div className="justify-between">
              <label>Food Item</label>
              <select
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                required="required"
              >
                <option value="" disabled>
                  Select a food item
                </option>
                {DUMMY_FOOD_ITEMS.map((food) => (
                  <option key={food.id} value={food.name}>
                    {food.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="justify-between">
                <label>
                  Quantity
                  <input
                    type="number"
                    required="required"
                    value={formData.quantity}
                    onChange={(e) =>
                      updateFormData("quantity", e.target.value)
                    }
                  />
                </label>
            </div>

            <div className="justify-between">
              <label>Price Per Pax</label>
              <input
                type="number"
                required="required"
                placeholder="Please enter your required price range here"
                value={formData.price}
                onChange={(e) => updateFormData("price", e.target.value)}
              />
            </div>

            <div>
              <div className="justify-between">
                <label>
                  Delivery Date and Time
                  <input
                    type="datetime-local"
                    required="required"
                    value={formData.deliveryDateTime}
                    onChange={(e) =>
                      updateFormData("deliveryDateTime", e.target.value)
                    }
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn btn-accent" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
