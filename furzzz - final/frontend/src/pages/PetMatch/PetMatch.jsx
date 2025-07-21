import React, { useState } from "react";
import axios from "axios";
import "./PetMatch.css";

const PetMatch = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧹 Clean Breed Names
  const cleanBreedNames = (breeds) => {
    return breeds
      .map((breed) => breed.replace(/[^a-zA-Z ]/g, "").trim())
      .filter((breed) => breed.length > 1);
  };

  // 📂 Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🐶 Upload Image & Detect Breed
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:4000/api/detect/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let detectedBreeds = cleanBreedNames(response.data.breeds || []);
      setBreeds(detectedBreeds);

      if (detectedBreeds.length === 0) {
        setProducts([]);
        alert("No breed detected. Try another image.");
        return;
      }

      // 🛒 Fetch Recommended Products
      const productRequests = detectedBreeds.map((breed) =>
        axios.get(`http://localhost:4000/api/food/by-breed/${breed}`)
      );

      const productResponses = await Promise.all(productRequests);
      let allProducts = productResponses.flatMap((res) => res.data.data);

      // 🏷️ Remove Duplicates
      const uniqueProducts = allProducts.filter(
        (product, index, self) => index === self.findIndex((p) => p._id === product._id)
      );

      setProducts(uniqueProducts);
    } catch (error) {
      console.error("Error detecting breed:", error);
      alert("Failed to detect breed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="petmatch-container">
      <h1 className="petmatch-title">Find the Best Products for Your Pet</h1>

      {/* 🏷️ Upload Section */}
      <div className="upload-section">
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} hidden />
        <label htmlFor="file-upload" className="upload-label">Choose File</label>

        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button className="upload-button" onClick={handleUpload} disabled={loading}>
          {loading ? "Detecting..." : "Detect Breed"}
        </button>
      </div>

      {/* 🐶 Detected Breed Name */}
      {breeds.length > 0 && (
        <h2 className="breed-result">
          Detected Breed{breeds.length > 1 ? "s" : ""}: <strong>{breeds.join(", ")}</strong>
        </h2>
      )}

      {/* 🛍️ Recommended Products */}
      <div className="products-section">
        {products.length > 0 ? (
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img 
  src={product.image.startsWith("http") ? product.image : `http://localhost:4000/images/${product.image}`}
  alt={product.name} 
  className="product-image"
/>

                <h3 className="product-name">{product.name}</h3>
                <p className="product-price"><strong>₹{product.price}</strong></p>
              </div>
            ))}
          </div>
        ) : (
          breeds.length > 0 && <p className="no-products">No products found for these breeds.</p>
        )}
      </div>
    </div>
  );
};

export default PetMatch;
