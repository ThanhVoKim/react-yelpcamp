import React from 'react';

class SearchForm extends React.Component {
  onSearch = (e) => {
    const search = e.target.value;
    this.props.dispatch({
      type: 'FILTER_SEARCH',
      search
    });
  }
  render() {
    return (
      <form className="form-inline" >
        <div className="form-group has-feedback">
          <input
            className="form-control"
            type="text"
            placeholder="Search name campgrounds"
            autoComplete="off"
            onChange={this.onSearch}
            value={this.props.searchText}
          />
          <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true" />
        </div>
      </form>
    );
  }
}

export default SearchForm;