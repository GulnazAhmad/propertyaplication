import React, { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
const AddPropertyForm = () => {
  const navigate = useNavigate(); // ✅ hook

  const locationData = {
    Odisha: ["Bhubaneswar", "Cuttack"],
    Karnataka: ["Bangalore"],
    Maharashtra: ["Pune"],
  };

  const amenitiesList = [
    "parking",
    "lift",
    "park",
    "club house",
    "swimming pool",
    "gas pipeline",
    "generator",
    "security",
  ];

  const [formData, setFormData] = useState({
    propertyname: "",
    propertydescription: "",
    state: "Odisha",
    city: "Bhubaneswar",
    location: "",
    price: "",
    squarefeet: "",
    BHK: "2BHK",
    ownerinfo: "",
    furnishingStatus: "unfurnished",
    purchaseType: "resale",
    photos: "",
    amenities: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Reusable input style classes
  const inputStyles =
    "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, amenities: [...prev.amenities, value] };
      } else {
        return {
          ...prev,
          amenities: prev.amenities.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const submissionData = {
      ...formData,
      price: Number(formData.price), // ✅ Convert to number
      squarefeet: Number(formData.squarefeet), // ✅ Convert to number
    };

    try {
      const response = await axios.post(
        URL + "/api/properties",
        submissionData
      );
      setMessage(
        `Success! Property "${response.data.data.propertyname}" added.`
      );
      setTimeout(() => {
        navigate("/"); // change "/" to your home route
      }, 1000);
    } catch (error) {
      console.log("error is ", error.message);
      console.error(error.response?.data);
      const errorMsg =
        error.response?.data?.message || "Failed to add property.";
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-slate-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Add New Property 🏠
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="propertyname"
          value={formData.propertyname}
          onChange={handleChange}
          placeholder="Property Name"
          className={inputStyles}
          required
        />
        <textarea
          name="propertydescription"
          value={formData.propertydescription}
          onChange={handleChange}
          placeholder="Property Description"
          className={`${inputStyles} min-h-[100px]`}
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={inputStyles}
          >
            {Object.keys(locationData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputStyles}
          >
            {locationData[formData.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location / Area"
          className={inputStyles}
          required
        />
        <input
          name="ownerinfo"
          value={formData.ownerinfo}
          onChange={handleChange}
          placeholder="Owner Info (e.g., John Doe, 9876543210)"
          className={inputStyles}
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (INR)"
            className={inputStyles}
            required
          />
          <input
            name="squarefeet"
            type="number"
            value={formData.squarefeet}
            onChange={handleChange}
            placeholder="Square Feet"
            className={inputStyles}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="BHK"
            value={formData.BHK}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
          </select>
          <select
            name="furnishingStatus"
            value={formData.furnishingStatus}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="unfurnished">Unfurnished</option>
            <option value="semifurnished">Semi-furnished</option>
            <option value="furnished">Furnished</option>
          </select>
          <select
            name="purchaseType"
            value={formData.purchaseType}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="resale">Resale</option>
            <option value="new booking">New Booking</option>
          </select>
        </div>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="px-2 text-gray-600">Amenities</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={amenity}
                  onChange={handleAmenitiesChange}
                  className="cursor-pointer"
                />
                <span className="capitalize">{amenity}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <input
          name="photos"
          value={formData.photos}
          onChange={handleChange}
          placeholder="Image URLs (comma-separated)"
          className={inputStyles}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Add Property"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center p-4 rounded-md ${
            message.startsWith("Error")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddPropertyForm;
