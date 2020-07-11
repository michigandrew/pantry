import React from "react";
import { Link } from "react-router-dom";

class Inventory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inventories: []
      };
    }
  
    componentDidMount() {
        const url = "/api/v1/inventory/index";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ inventories: response }))
          .catch(() => this.props.history.push("/"));
    }

    render() {
        console.log(this);
        const { inventories } = this.state;
        const allInventory = inventories.map((inventory, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
              <img
                src={inventory.image}
                className="card-img-top"
                alt={`${inventory.name} image`}
              />
              <div className="card-body">
                <h5 className="card-title">{inventory.name}</h5>
                <Link to={`/inventory/${inventory.id}`} className="btn custom-button">
                  View inventory
                </Link>
              </div>
            </div>
          </div>
        ));
        const noInventory = (
          <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
              No inventory yet. Why not <Link to="/new_inventory">add to your inventory?</Link>
            </h4>
          </div>
        );
    
        return (
          <>
            <section className="jumbotron jumbotron-fluid text-center">
              <div className="container py-5">
                <h1 className="display-4">You might need to go shopping</h1>
                <p className="lead text-muted">
                  Here's all the shit you have.
                </p>
              </div>
            </section>
            <div className="py-5">
              <main className="container">
                <div className="text-right mb-3">
                  <Link to="/inventory" className="btn custom-button">
                    Create New Inventory
                  </Link>
                </div>
                <div className="row">
                  {inventories.length > 0 ? allInventory : noInventory}
                </div>
                <Link to="/" className="btn btn-link">
                  Home
                </Link>
              </main>
            </div>
          </>
        );
      }
  }
export default Inventory;