import React, { useEffect, useState } from "react";
import "./App.css";
import { getTodos } from "./services/services";

function App() {
  const [allData, setAllData] = useState([]);
  const [allPost, setAllPostData] = useState([]);
  const [allChangePosts, setAllChangePost] = useState([]);

  useEffect(() => {
    Promise.all([getTodos("users"), getTodos("posts")]).then((success) => {
      setAllData(success[0].data);
      setAllPostData(success[1].data);
    });
  }, []);

  const getAllPost = (userId) => {
    let getPostData = allPost.filter((item) => item.userId == userId);
    debugger;
    setAllChangePost(getPostData);
  };

  return (
    <div className="App">
      <div
        class="modal fade"
        id="modelId"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">All Posts</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-striped table-inverse table-responsive">
                <thead class="thead-inverse">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Body</th>
                  </tr>
                </thead>
                <tbody>
                  {allChangePosts &&
                    allChangePosts.map((item, index) => (
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.map((item, index) => (
              <tr>
                <td scope="row">{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  {" "}
                  <i
                    onClick={() => getAllPost(item.id)}
                    class="fas fa-list"
                    data-toggle="modal"
                    data-target="#modelId"
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
