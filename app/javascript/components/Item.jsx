import React from "react";
import { Link } from "react-router-dom";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { available_quantity: null, description: ''} };
        this.addHtmlEntities = this.addHtmlEntities.bind(this);
        this.decrementAvailableQuantity = this.decrementAvailableQuantity.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/item/${id}`;
        fetch(url)
          .then(response => {
              if(response.ok) {
                  return response.json();
              }
              throw new Error("Network response was not ok, dog.");
          })
          .then(response => this.setState({item: response}))
          .catch(() => console.log(this.state));
 /*         .catch(() => this.props.history.push("/inventory"));*/
    }

    addHtmlEntities(str) {
        return String(str)
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
    }

    decrementAvailableQuantity() {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      const url = `/api/v1/destroy/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if(response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }

    render() {
        const { item } = this.state;
        let itemDescription = 'No description available';

        if (item.description.length > 0) {
            itemDescription = (<p> {item.description} </p>)
        }
        
        return (
            <div className="">
              <div className="hero position-relative d-flex align-items-center justify-content-center">
                <div className="overlay bg-dark position-absolute" />
                <h1 className="display-4 position-relative text-white">
                  {item.name}
                </h1>
              </div>
              <div className="container py-5">
                <div className="row">
                  <div className="col-sm-12 col-lg-3">
                    <ul className="list-group">
                      <h5 className="mb-2">Description</h5>
                      {itemDescription}
                    </ul>
                  </div>
                  <div className="col-sm-12 col-lg-7">
                    <h5 className="mb-2">Available Quantity</h5>
                    <div>
                        <p> {item.available_quantity} </p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-2">
                    <button type="button" className="btn btn-danger" onClick={this.decrementAvailableQuantity}>
                      Reduce Available Quantity
                    </button>
                  </div>
                </div>
                <Link to="/inventory" className="btn btn-link">
                  Back to inventory
                </Link>
              </div>
            </div>
          );
    }
}

export default Item;