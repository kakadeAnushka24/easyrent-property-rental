import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => setProperty(data))
      .catch((error) => console.log("Error:", error));
  }, [id]);

  if (!property) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back to Home
      </Link>

      <div className="card shadow border-0 p-4">
        <span className="badge bg-primary mb-3">
          {property.type}
        </span>

        <h1>{property.title}</h1>

        <p className="text-secondary">
          📍 {property.location}
        </p>

        <h3 className="text-primary">
          ₹{property.price.toLocaleString()} / month
        </h3>

        <hr />

        <p>
          This property is available for rent through EasyRent.
          Find your comfortable home at an affordable price.
        </p>

        <button className="btn btn-success">
          Contact Owner
        </button>
      </div>
    </div>
  );
}

export default PropertyDetails;