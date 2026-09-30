import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleSearch = () => {
    const result = properties.filter((property) =>
      property.location.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProperties(result);
  };

  const handleViewProperty = (property) => {
    alert(
      `Property Details\n\n` +
        `Title: ${property.title}\n` +
        `Location: ${property.location}\n` +
        `Price: ₹${property.price}/month\n` +
        `Type: ${property.type}`
    );
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            🏠 EasyRent
          </a>

          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="/">
              Home
            </a>

            <a className="nav-link" href="#properties">
              Properties
            </a>

            <a className="nav-link" href="#about">
              About
            </a>

            <a className="nav-link" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold">
            Find Your Perfect Rental Home
          </h1>

          <p className="lead text-secondary">
            Search, explore and rent your dream property with EasyRent.
          </p>

          {/* Search */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by city or location"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="container py-5">
        <h2 className="text-center fw-bold mb-2">
          Available Properties
        </h2>

        <p className="text-center text-secondary mb-5">
          Find a place that feels like home
        </p>

        <div className="row g-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div className="col-md-4" key={property.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body p-4">
                    <span className="badge bg-primary mb-3">
                      {property.type}
                    </span>

                    <h4 className="fw-bold">
                      {property.title}
                    </h4>

                    <p className="text-secondary">
                      📍 {property.location}
                    </p>

                    <h5 className="text-primary">
                      ₹{property.price.toLocaleString()} / month
                    </h5>

                    <button
                      className="btn btn-outline-primary w-100 mt-3"
                      onClick={() => handleViewProperty(property)}
                    >
                      View Property
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5 className="text-danger">
                No properties found.
              </h5>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">
            Why Choose EasyRent?
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <h3>🏠</h3>
                <h5>Verified Properties</h5>
                <p className="text-secondary">
                  Explore reliable rental properties.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <h3>🔍</h3>
                <h5>Easy Search</h5>
                <p className="text-secondary">
                  Find properties quickly and easily.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <h3>❤️</h3>
                <h5>Easy Renting</h5>
                <p className="text-secondary">
                  Save properties and contact owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-dark text-white text-center py-4"
      >
        <p className="mb-0">
          © 2026 EasyRent. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;