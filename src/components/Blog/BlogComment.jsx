import axios from "axios";
import React, { useState } from "react";
import { getLocalStorage } from "../../utils/store";
import { useParams } from "react-router-dom";

export default function BlogComment({ comments, setComment }) {
  const token = getLocalStorage("token");
  const auth = getLocalStorage("auth");
  // console.log(auth);
  // console.log(userData)
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState();
  const params = useParams();

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    if (content.trim().length > 0) {
      const data = {
        id_blog: params.id,
        id_user: auth.id,
        id_comment: parentId || 0,
        comment: content,
        image_user: auth.avatar,
        name_user: auth.name,
      };
      const options = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      axios
        .post(
          `http://127.0.0.1:8000/api/blog/comment/${params.id}`,
          data,
          options
        )
        .then((res) => {
          console.log("RESPONSE ==== : ", res);
          setContent("");
          setParentId("");
          setComment([...comments, res.data.data]);
        })
        .catch((err) => {
          console.log("ERROR: ====", err);
        });
    }
    // const /
  };
  // console.log(comments)
  return (
    <>
      <div className="response-area">
        <h2>3 RESPONSES</h2>
        <ul className="media-list">
          {comments.map((item) => (
            <>
              <li key={item.id} className="media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src="/frontend/images/blog/man-two.jpg"
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {item.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{item.comment}</p>
                  <a
                    href="#comment-input"
                    className="btn btn-primary"
                    onClick={() => {
                      console.log(item.id);
                      setParentId(item.id);
                    }}
                  >
                    <i className="fa fa-reply" />
                    Replay
                  </a>
                </div>
              </li>
              {item.children && item.children.map((children) => (
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img
                      className="media-object"
                      src="/frontend/images/blog/man-three.jpg"
                      alt=""
                    />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li>
                        <i className="fa fa-user" />
                        {children.name_user}
                      </li>
                      <li>
                        <i className="fa fa-clock-o" /> 1:33 pm
                      </li>
                      <li>
                        <i className="fa fa-calendar" /> DEC 5, 2013
                      </li>
                    </ul>
                    <p>
                      {children.comment}
                    </p>
                    {/* <a className="btn btn-primary" href="">
                      <i className="fa fa-reply" />
                      Replay
                    </a> */}
                  </div>
                </li>
              ))}
            </>
          ))}

          {/* <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li> */}
          {/* <li className="media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-four.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href="">
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li> */}
        </ul>
      </div>
      {/*/Response-area*/}
      {/*/Repaly Box*/}
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                onChange={handleChange}
                name="message"
                rows={11}
                value={content}
                id="comment-input"
              />
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                id="btn-submit"
              >
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
