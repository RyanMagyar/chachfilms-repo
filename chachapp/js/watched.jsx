import React from 'react';
import Feed from './feed';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

class Watched extends React.Component {
  constructor(props) {
    super(props);
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    this.state = {
      isLoggedIn: userToken,
      sortBy: "-added",
      filterBy: "",
      toggleRerender: false,
    };

    this.rerenderParent = this.rerenderParent.bind(this);
  }

  rerenderParent() {
    this.setState({ toggleRerender: !this.state.toggleRerender });
  }

  renderFilterMenu() {
    const numInRotation = this.props.numInRotation;

    return (
      <DropdownButton
        bsPrefix="navigationMenu"
        id="dropdown-basic-button"
        title="Filter By"
      >
        {Object.keys(numInRotation).map((username) => {
          return (
            <Dropdown.Item
              active={this.state.filterBy == username ? true : false}
              onClick={() =>
                this.state.filterBy == username
                  ? this.setState({ filterBy: "" })
                  : this.setState({ filterBy: username })
              }
              className="navigationItem"
            >
              {`${username}`}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  }

  render() {
    return (
      <div>
        <div className="watchedHeading">
          <DropdownButton
            bsPrefix="navigationMenu"
            id="dropdown-basic-button"
            title="Sort By"
          >
            <Dropdown.Item
              active={this.state.sortBy == "-added" ? true : false}
              onClick={() => this.setState({ sortBy: "-added" })}
              className="navigationItem"
            >
              Most Recent
            </Dropdown.Item>
            <Dropdown.Item
              active={this.state.sortBy == "added" ? true : false}
              onClick={() => this.setState({ sortBy: "added" })}
              className="navigationItem"
            >
              Oldest
            </Dropdown.Item>
            <Dropdown.Item
              active={this.state.sortBy == "-average" ? true : false}
              onClick={() => this.setState({ sortBy: "-average" })}
              className="navigationItem"
            >
              Rating (Highest)
            </Dropdown.Item>
            <Dropdown.Item
              active={this.state.sortBy == "average" ? true : false}
              onClick={() => this.setState({ sortBy: "average" })}
              className="navigationItem"
            >
              Rating (Lowest)
            </Dropdown.Item>
            <Dropdown.Item
              active={this.state.sortBy == "suggestedby" ? true : false}
              onClick={() => this.setState({ sortBy: "suggestedby" })}
              className="navigationItem"
            >
              Suggested By
            </Dropdown.Item>
            <Dropdown.Item
              active={this.state.sortBy == "year" ? true : false}
              onClick={() => this.setState({ sortBy: "year" })}
              className="navigationItem"
            >
              Year (Oldest)
            </Dropdown.Item>
            <Dropdown.Item
              active={this.state.sortBy == "-year" ? true : false}
              onClick={() => this.setState({ sortBy: "-year" })}
              className="navigationItem"
            >
              Year (Newest)
            </Dropdown.Item>
          </DropdownButton>
          <h1 className="moviesHeading">Watched Films</h1>

          {this.renderFilterMenu()}

          {/* <div className="fakeHeadingDiv"></div>*/}
        </div>
        <Feed
          url="/api/v1/watched/"
          getNumInRotation={this.props.getNumInRotation}
          toggleRerender={this.state.toggleRerender}
          rerenderParent={this.rerenderParent}
          numInRotation={this.props.numInRotation}
          isLoggedIn={this.state.isLoggedIn}
          sortBy={this.state.sortBy}
          filterBy={this.state.filterBy}
        />
      </div>
    );
  }
};

export default Watched;