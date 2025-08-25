//need to destructure it becuase  if we write (currentFilters,onFilterChange) it is accessed like prop so prop.onFiltersChnage
const Sidebar = ({ currentFilters, onFiltersChange }) => {
  const handleRadioButtons = (e) => {
    const { value, name } = e.target;
    onFiltersChange((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  let newAmenities;
  const handleCheckboxChange = (e) => {
    try {
      const { value, checked } = e.target;

      const currentAmenities = currentFilters.amenities || [];

      if (checked) {
        newAmenities = [...currentAmenities, value];
      } else {
        newAmenities = currentAmenities.filter((item) => item !== value);
      }
      onFiltersChange((prevFilters) => ({
        ...prevFilters,
        amenities: newAmenities,
      }));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h3 className="m-6 text-2xl font-bold">Filters : </h3>
      <div className="m-4 p-4 border rounded shadow">
        <h4 className="text-lg font-semibold mb-2">State</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="state" value="Odisha" /> Odissa
          </label>
        </div>

        <h4 className="text-lg font-semibold mb-2 mt-4">City</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="city" value="Bhubaneswar" /> Bhubaneswar
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="city" value="Cuttack" /> Cuttack
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="city" value="Mumbai" /> Mumbai
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="city" value="Delhi" /> Delhi
          </label>
        </div>

        <h4 className="text-lg font-semibold mb-2 mt-4">BHK</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="BHK" value="1BHK" /> 1BHK
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="BHK" value="2BHK" /> 2BHK
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="BHK" value="3BHK" /> 3BHK
          </label>
        </div>

        <h4 className="text-lg font-semibold mb-2 mt-4">Furnishing Status</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="furnishingStatus" value="furnished" />{" "}
            Furnished
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="furnishingStatus" value="unfurnished" />{" "}
            Unfurnished
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="furnishingStatus" value="semifurnished" />{" "}
            Semi-Furnished
          </label>
        </div>

        <h4 className="text-lg font-semibold mb-2 mt-4">Purchase Type</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="purchaseType" value="resale" /> Resale
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="purchaseType" value="new booking" /> New
            Booking
          </label>
        </div>

        <h4 className="text-lg font-semibold mb-2 mt-4">Price Range</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="price" value="0-1000000" /> 0 - 10 Lakhs
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="price" value="1000000-5000000" /> 10 Lakhs
            - 50 Lakhs
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="price" value="5000000-10000000" /> 50
            Lakhs - 1 Crore
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="price" value="10000000+" /> Above 1 Crore
          </label>
        </div>
        <h4 className="text-lg font-semibold mb-2 mt-4">Size (in sqft)</h4>
        <div className="space-y-1" onChange={handleRadioButtons}>
          <label className="flex items-center gap-2">
            <input type="radio" name="size" value="0-500" /> 0 - 500 sqft
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="size" value="500-1000" /> 500 - 1000 sqft
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="size" value="1000-2000" /> 1000 - 2000
            sqft
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="size" value="2000+" /> Above 2000 sqft
          </label>
        </div>

        <h4 className="text-lg font-semibold mb-2 mt-4">Amenities</h4>
        <div className="space-y-1" onChange={handleCheckboxChange}>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="parking" /> parking
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="lift" /> lift
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="Amenities" value="park" /> park
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="club-house" /> club
            house
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="swimming-pool" />{" "}
            swimming pool
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="gas-pipeline" /> gas
            pipeline
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="generator" />{" "}
            generator
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="amenities" value="security" /> security
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
