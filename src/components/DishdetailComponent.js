import React from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText} from 'reactstrap';

    function RenderDish({dish})                     //Functional Component
    {
        if(dish!=null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
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

    function RenderComments({comments})                 //Functional Component
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
                </ul>
            );

        }else{
            return(
                <div></div>
            );
        }
    }

    
    const DishDetail = (props) => {                 //Functional Component
        if(props.dish!=null) {

            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <div>
                                <h4>Comments</h4>
                            </div>
                            <div>
                                <RenderComments comments={props.dish.comments} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
        
export default DishDetail;