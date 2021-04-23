import React, { Component } from "react";
import { listPosts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import DeletePost from "./DeletePosts";
import EditPost from "./EditPost";
import { onCreatePost } from "../graphql/subscriptions";
import { onDeletePost } from "../graphql/subscriptions";

class DisplayPosts extends Component {
  state = {
    posts: [],
  };
  componentDidMount = async () => {
    this.getPosts();

    this.createPostListener = API.graphql(
      graphqlOperation(onCreatePost)
    ).subscribe({
      next: (postData) => {
        const newPost = postData.value.data.onCreatePost;
        const prevPost = this.state.posts.filter((post) => post.id !== newPost);

        const updatedPost = [newPost, ...prevPost];

        this.setState({ posts: updatedPost });
      },
    });

    this.deletePostListener = API.graphql(
      graphqlOperation(onDeletePost)
    ).subscribe({
      next: (postData) => {
        const deletedPost = postData.value.data.onDeletePost;
        const updatedPost = this.state.posts.filter(
          (post) => post.id !== deletedPost.id
        );

        this.setState({ posts: updatedPost });
      },
    });
  };

  componentWillUnmount() {
    this.createPostListener.unsubscribe();
    this.deletePostListener.unsubscribe();
  }

  getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listPosts));
    this.setState({ posts: result.data.listPosts.items });
    //console.log("All Posts", JSON.stringify(result.data.listPosts.items));
    // console.log("All Posts", result.data.listPosts.items);
  };
  render() {
    const { posts } = this.state;

    return posts.map((post) => {
      return (
        <div className="posts" style={rowStyle} key={post.id}>
          <h1> {post.postTitle}</h1>
          <p>{post.postBody}</p>
          <span style={{ color: "#0000FF" }}>
            {"wrote by:"} {post.postOwnerUsername}
            {"             on "}
            <time style={{ fontStyle: "italic", color: "#0ca5e297" }}>
              {" "}
              {new Date(post.createdAt).toDateString()}
            </time>
          </span>
          <br />
          <span>
            <DeletePost data={post} />
            <EditPost />
          </span>
        </div>
      );
    });
  }
}
const rowStyle = {
  background: "#f4f4f4",
  padding: "10px",
  boder: "1px #ccc dotted",
  margin: "14px",
};
export default DisplayPosts;
