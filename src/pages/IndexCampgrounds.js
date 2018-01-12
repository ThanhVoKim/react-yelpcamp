import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import SearchForm from '../components/SearchForm';
import filterCampgrounds from '../selectors/filterCampgrounds';

class IndexCampgrounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.page,
      itemsShow: 6
    };
  }
  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    });
    if (eventKey === 1) {
      this.props.history.push('/campgrounds');
    } else {
      this.props.history.push(`/campgrounds/pages/${eventKey}`);
    }
  }
  render() {
    const campgrounds = this.props.campgrounds;
    const endIndex = this.state.activePage * this.state.itemsShow;
    const startIndex = endIndex - this.state.itemsShow;
    const totalPages = Math.ceil(campgrounds.length / this.state.itemsShow);
    const showItems = campgrounds.filter((campground, index) => {
      if (startIndex <= index && index < endIndex) {
        return true;
      }
      return false;
    });
    return (
      <div>
        <header className="jumbotron" >
          <div className="container">
            <h1>
              <span className="glyphicon glyphicon-tent align-bottom" aria-hidden="true" style={{ top: '7px' }} />
              Welcome to YelpCamp
            </h1>
            <p>View our hand-picked campgrounds from all over the world</p>
            <SearchForm dispatch={this.props.dispatch} searchText={this.props.searchText} />
            <Link className="btn btn-primary btn-md pull-right" to="/campgrounds/new">
              <span className="glyphicon glyphicon-plus pull-left" aria-hidden="true" />
              Share New Campground
            </Link>
          </div>
        </header>
        <div className="row text-center" style={{ display: 'flex', flexWrap: 'wrap' }} >
          {
            showItems.map(campground => (
              <div key={campground.id} className="col-md-4 col-sm-6">
                <div className="thumbnail">
                  <img src={campground.image} alt="" />
                  <div className="caption">
                    <h4>{campground.name}</h4>
                  </div>
                  <Link className="btn btn-primary btn-sm" to={`/campgrounds/${campground.id}`}>
                    More Info
                    <i className="fa fa-info-circle pull-right" style={{ marginTop: '3px' }} aria-hidden="true" />
                    </Link>
                </div>
              </div>
            ))
          }
        </div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={totalPages}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  campgrounds: filterCampgrounds(state.campgrounds, state.filter),
  user: state.user,
  searchText: state.filter.search,
  page: props.match.params.pageid ? parseInt(props.match.params.pageid, 10) : 1
});

export default connect(mapStateToProps)(IndexCampgrounds);

/* renderAddCampground() {
    if (this.props.user) {
      return (
        <Link className="btn btn-primary btn-md pull-right" to="/campgrounds/new">
          <span className="glyphicon glyphicon-plus pull-left" aria-hidden="true" />
          Share New Campground
        </Link>
      );
    }
  }
   */