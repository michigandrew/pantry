import React from "react";
import { Link } from "react-router-dom";
// import Camera from 'react-native-camera';

class ScanNewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            quantity: 1
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    // takePicture() {
    //     this.camera.capture()
    //       .then((data) => {
    //         console.log(data);
    //         this.setState({ path: data.path })
    //       })
    //       .catch(err => console.error(err));
    //   }

    //   renderCamera() {
    //     return (
    //       <Camera
    //         ref={(cam) => {
    //           this.camera = cam;
    //         }}
    //         style={styles.preview}
    //         aspect={Camera.constants.Aspect.fill}
    //         captureTarget={Camera.constants.CaptureTarget.disk}
    //       >
    //         <TouchableHighlight
    //           style={styles.capture}
    //           onPress={this.takePicture.bind(this)}
    //           underlayColor="rgba(255, 255, 255, 0.5)"
    //         >
    //           <View />
    //         </TouchableHighlight>
    //       </Camera>
    //     );
    //   }
    
    //   renderImage() {
    //     return (
    //       <View>
    //         <Image
    //           source={{ uri: this.state.path }}
    //           style={styles.preview}
    //         />
    //         <Text
    //           style={styles.cancel}
    //           onPress={() => this.setState({ path: null })}
    //         >Cancel
    //         </Text>
    //       </View>
    //     );
    //   }

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
        const { name, description, quantity } = this.state;

        if (name.length == 0 || description.length == 0 || quantity == 0 )
            return;
        
        const body = {
            name,
            description,
            quantity
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
                            Add a new item to our awesome item collection.
                        </h1>
                        {/*
                        <div>
                            <View style={styles.container}>
                                {this.state.path ? this.renderImage() : this.renderCamera()}
                            </View>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <button type="submit" className="btn custom-button mt-3">
                                Create Item
                            </button>
                            <Link to="/inventory" className="btn btn-link mt-3">
                                Back to inventory
                            </Link>
                        </form>
                        */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ScanNewItem;