import React from "react";
import { Link } from "react-router-dom";

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            initial_quantity: 1,
            available_quantity: 1
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "api/v1/inventory/create";
        const { name, description, initial_quantity } = this.state;

        if (name.length == 0 || description.length == 0 || initial_quantity == 0 )
            return;
        
        const body = {
            name,
            description,
            initial_quantity
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error("Network response was not ok.");
          })
          .then(response => this.props.history.push(`/item/${response.id}`))
          .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add a new item to our pantry.
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="itemName">Item name</label>
                                <input
                                  type="text"
                                  name="name"
                                  id="itemName"
                                  className="form-control"
                                  required
                                  onChange={this.onChange}
                                  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="itemDescription">Description</label>
                                <input
                                  type="text"
                                  name="description"
                                  id="itemDescription"
                                  className="form-control"
                                  required
                                  onChange={this.onChange}
                                  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="itemInitialQuantity">Quantity</label>
                                <input
                                  type="number"
                                  name="initial_quantity"
                                  id="itemInitialQuantity"
                                  className="form-control"
                                  required
                                  onChange={this.onChange}
                                  />
                            </div>
                            <button type="submit" className="btn custom-button mt-3">
                                Create Item
                            </button>
                            <Link to="/inventory" className="btn btn-link mt-3">
                                Back to inventory
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewItem;