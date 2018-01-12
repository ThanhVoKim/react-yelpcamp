import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.comment ? props.comment.text : ''
    };
  }
  onContent = (e) => {
    const text = e.target.value;
    this.setState({ text });
  }
  render() {
    return (
      <div className="well" style={{ border: '1px solid #00A546' }}>
        <h4>Say something about this campground <span className="glyphicon glyphicon glyphicon-pencil" aria-hidden="true" /></h4>
        <form onSubmit={(e) => {
            e.preventDefault();
            const comment = {
              text: this.state.text,
              createdAt: moment().valueOf(),
              uid: this.props.user.uid,
              createdBy: this.props.user.displayName,
              avatar: this.props.user.avatar
            };
            this.props.onSubmit(comment);
          }}
        >
          <div className="form-group">
            <input className="form-control" type="text" disabled value={this.props.user.displayName} />
          </div>
          <div className="form-group">
            <textarea
              value={this.state.text}
              onChange={this.onContent}
              className="form-control"
              type="text"
              placeholder="What are you thinking about?"
              rows="5"
              cols="70"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-sm ">Save</button>
          </div>
        </form>
        <div className="form-group">
          <Link className="btn btn-info btn-sm" to={`/campgrounds/${this.props.campground.id}`}>Back</Link>
        </div>
      </div>
    );
  }
}
export default CommentForm;