import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';

class Comment extends React.Component {
  /* Display number of likes
   */

  constructor(props){
      super(props);

      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

      this.state = {
          commentid: this.props.commentid, showDeleted: false,
          user: localStorage.getItem('username'), isLoggedIn: userToken,
          delete: false,
      }

      this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
  }

  handleDeleteClick(){
    const movieid = this.props.movieid;
    const deleteUrl = `/api/v1/m/${movieid}/comments/${this.state.commentid}/`;
    const {isLoggedIn} = this.state;

    fetch(deleteUrl, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {"authorization": `Bearer ${isLoggedIn}`},
    })
    .then((response) => {
       if (!response.ok) {
            throw Error(response.statusText);
        } else {
            this.setState({
                showDeleted: false,
                deleted: true, 
              });
          }
        })
    .catch((error) => console.log(error)) 
  }



  render() {
    const { owner, text, filename } = this.props;
    const { showDeleted, deleted } = this.state;

    if(deleted){
        return(
            <></>
        )
    }

    console.log(this.props.added);

    return (
      <div className="commentDiv">
        <div className="commentHeader">
          <img className="commentPic" src={filename}></img>
          <h5 className="commentUser">
            {owner}  
          </h5>
          <h3 className="commentTimestamp"> Added {(moment(this.props.added).fromNow()).replace('in ', '')} ago</h3>
          {owner == this.state.user ? <Button variant="danger" className="deleteCommentButton" onClick={ () => this.setState({showDeleted: true})}>Delete</Button>
          : '' }      
        </div>
          <h5 className="commentText">{text}</h5>
        <Modal centered contentClassName='deletedCommentModal' show={showDeleted} animation={false} onHide={() => this.setState({deleteChecked: false, showDeleted: false})}>
                  <div className="modal-content deleteCommentModal">
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                        <span className="modalBodyText">Are you sure you want to delete this comment?</span><br></br>
                        <span className="modalBodyTextWarning">This action cannot be undone.</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="danger" onClick={() => this.handleDeleteClick()}>
                            Delete
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({deleteChecked: false, showDeleted: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                  </div>  
          </Modal>

      </div>
    );
  }
}

Comment.propTypes = {
  // postid: PropTypes.number.isRequired,
  filename: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;