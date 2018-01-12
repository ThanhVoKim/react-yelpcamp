import React from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { addComment } from '../actions/indexAction';

class NewComment extends React.Component {
  render() {
    return (
      <div className="row">
        <h1 className="text-center">Add New Comment</h1>
        <div style={{ width: '50%', margin: '30px auto' }}>
          { this.props.campground ? (
            <CommentForm
              {...this.props}
              onSubmit={(comment) => {
                this.props.dispatch((addComment(this.props.campground.id, comment)));
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

const mapStateToProps = (state, props) => ({
  campground: state.campgrounds.find(camp => camp.id === props.match.params.id),
  user: state.user
});

export default connect(mapStateToProps)(NewComment);