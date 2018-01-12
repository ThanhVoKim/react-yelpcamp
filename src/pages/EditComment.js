import React from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { fetchComments, editComment } from '../actions/indexAction';

class EditComment extends React.Component {
  componentDidMount() {
    if (this.props.campground) {
      this.props.fetchComments(this.props.campground.id);
    }
  }
  render() {
    return (
      <div className="row">
        <h1 className="text-center">Edit Comment</h1>
        <div style={{ width: '50%', margin: '30px auto' }}>
          {
            (this.props.campground && this.props.comment) ? (
              <CommentForm
                {...this.props}
                onSubmit={async (comment) => {
                  await this.props.dispatch(editComment(this.props.campground.id, this.props.comment.id, comment));
                  this.props.history.push(`/campgrounds/${this.props.campground.id}`);
                }}
              />
            ) : (
              <div>Loading...</div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const campground = state.campgrounds.find(camp => camp.id === props.match.params.id);
  let comment;
  if (campground) {
    comment = campground.comments.find(child => child.id === props.match.params.commentid);
  }
  return {
    user: state.user,
    campground,
    comment
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);