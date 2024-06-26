import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
       
        const response = await axios.get(
          `http://localhost:3001/breweries/${id}`
        );
        console.log( response.data);
        // setBrewery(response.data);
         setBrewery(response.data.brewery);
         setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching brewery details", error);
      }
    };
    fetchBrewery();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const data = await axios.post(
        `http://localhost:3001/breweries/${id}/review`,
        { rating, description,userId },
      );
      console.log(data)
      setDescription("");
      setRating(1);

      const response = await axios.get(
        `http://localhost:3001/breweries/${id}`
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {brewery && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">{brewery.name}</h2>
          <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
          <p>{brewery.phone}</p>
          <a href={brewery.website_url} className="text-blue-500 hover:underline">{brewery.website_url}</a>
          <div className="mt-6">
            <h3 className="text-xl font-bold">Reviews</h3>
            {reviews.map(review => (
              <div key={review._id} className="border-b border-gray-200 py-4">
                <p className="font-bold">{review.userId.username}</p>
                <p>Rating: {review.rating}</p>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold">Add a Review</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Rating</label>
                <select className="w-full border-2 border-gray-200 p-2 rounded-lg" value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea className="w-full border-2 border-gray-200 p-2 rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreweryDetail;
