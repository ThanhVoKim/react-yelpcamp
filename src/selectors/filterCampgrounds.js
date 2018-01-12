export default (campgrounds, { search }) => {
  return campgrounds.filter((campground) => {
    const nameMatch = campground.name.toLowerCase().includes(search.toLowerCase());
    return nameMatch;
  });
}