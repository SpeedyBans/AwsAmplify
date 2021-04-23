import API, { graphqlOperation } from "@aws-amplify/api";
import React, { Component } from "react";
import { createPost } from "../graphql/mutations";

class Createpost extends Component {
  state = {
    postOwnerId: "",
    postOwnerUsername: "",
    postTitle: "",
    postBody: "",
  };

  componentDidMount = async () => {
    //Todo:
  };

  handleChangePost = async (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  handleAddPost = async (event) => {
    event.preventDefault();

    const input = {
      postOwnerId: "1232132", //this.state.postOwnerId,
      postOwnerUsername: "Speedy", //this.state.postOwnerUsername,
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      createdAt: new Date().toISOString(),
    };

    await API.graphql(graphqlOperation(createPost, { input }));

    this.setState({ postTitle: "", postBody: "" });
  };

  render() {
    return (
      <form className="add-post" onSubmit={this.handleAddPost}>
        <input
          style={{ font: "19px" }}
          type="text"
          placeholder="Title"
          name="postTitle"
          requried
          value={this.state.postTitle}
          onChange={this.handleChangePost}
        />
        <textarea
          type="text"
          name="postBody"
          rows="3"
          cols="40"
          required
          placeholder="New Blog Post"
          value={this.state.postBody}
          onChange={this.handleChangePost}
        />
        <input type="Submit" className="btn" style={{ fontSize: "19px" }} />
      </form>
    );
  }
}
export default Createpost;
