import React, { Component } from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Link} from "react-router-dom";
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";

const required = (val) => (val && val.length);
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render()
    {
        return(
        <>
            <Button outline onClick={this.toggleModal}>
                <i class="fa fa-pencil fa-lg"></i> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => {this.handleSubmit(values)}}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>
                                        <h6>Rating</h6>
                                    </Label>
                                    <Col md={12}>
                                        <Control.select 
                                            model=".rating" 
                                            name="rating" 
                                            className="form-control"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="author">
                                        <h6>Your Name</h6>
                                    </Label>
                                    <Col md={12}>
                                        <Control.text 
                                            model=".author" 
                                            id="author" 
                                            name="author" 
                                            className="form-control"
                                            placeholder="Your Name"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                minLength: "Must be greater than 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="comment">
                                        <h6>Comment</h6>
                                    </Label>
                                    <Col md={12}>
                                        <Control.textarea 
                                            model=".comment" 
                                            id="comment" 
                                            name="comment" 
                                            className="form-control" 
                                            rows="6"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={2}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
        );
    }
}

    function RenderDish({dish})                     //Functional Component
    {
        if(dish!=null){
            return(
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments, postComment, dishId})                 //Functional Component
    {
        if(comments!=null){

            const Comments = comments.map((comment) => {
                return(
                    <li key={comment.id}>
                        <p>
                        {comment.comment} 
                        </p>
                        <p>
                        -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </li>
                    );
            });

            return(
                <ul className="list-unstyled">
                    {Comments}
                    <CommentForm comments={comments} dishId={dishId} postComment={postComment}/>
                </ul>
            );

        }else{
            return(
                <div></div>
            );
        }
    }

    
    function DishDetail(props){                 //Functional Component
            if(props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if(props.errMess) {
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else if(props.dish!=null) {

                return(
                <>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/menu">
                                        Menu
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                        {props.dish.name}
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderDish dish={props.dish}/>
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <div>
                                    <h4>Comments</h4>
                                </div>
                                <div>
                                    <RenderComments 
                                    comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                );
            } else {
                return(
                    <div></div>
                );
            }
    }
        
export default DishDetail;