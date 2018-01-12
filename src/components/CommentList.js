import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { removeComment } from '../actions/indexAction';

class CommentsList extends React.Component {
  render() {
    return (
      <div className="well">
        <div className="text-right">
          <Link
            className="btn btn-success btn-sm pull-right"
            to={`/campgrounds/${this.props.campground.id}/comment/new`}
          >
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            Add New Comment
          </Link>
        </div>
        <h4 style={{ margin: '5px 0', paddingBottom: '30px' }} >
          <span className="glyphicon glyphicon glyphicon-comment" aria-hidden="true" />
          <strong>Comments</strong>
        </h4>
        <div className="row">
          {
            this.props.comments.map((comment) => {
              const OwnComment = () => {
                if (this.props.user.uid === comment.uid) {
                  return (
                    <span>
                      <Link
                        className="btn btn-xs btn-warning"
                        to={`/campgrounds/${this.props.campground.id}/comment/${comment.id}/edit`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-xs btn-danger"
                        onClick={() => {
                          this.props.dispatch(removeComment(this.props.campground.id, comment.id));
                        }}
                      >
                        Delete
                      </button>
                    </span>
                  );
                }
              };
              return (
                <div key={comment.id} className="col-md-12" style={{ marginBottom: '7px' }}>
                  <strong>
                    <img src={comment.avatar} alt="#" className="small-avatar" />
                    {comment.createdBy}
                  </strong>
                  <span className="pull-right">{moment(comment.createdAt).fromNow()}</span>
                  <p style={{ margin: '0 0 3px 0' }}>{comment.text}</p>
                  { this.props.user && OwnComment()}
                </div>
              );
            })
          }

        </div>
      </div>
    );
  }
}


export default CommentsList;
