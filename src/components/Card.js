import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

//Компонент, который отвечает за рендер одной карточки из списка новостей. На вход передается соответствующая новость

const Card = ({post}) => {
    return (
        <div className='cardContainer'>
            <div className='imageContainer'>
                <img src={post.image_url} />
            </div>
            <div className='cardContent'>
                <div className="cardTitle">
                <h3>{post.title} </h3>
                </div>
                <div className='cardBody' dangerouslySetInnerHTML={{__html: post.short_text}}>
                    
                </div>
            </div>
            <h3 style={{}}> <Link to={`/news/${post.id}`}>go to article</Link> </h3>
        </div>
    )
}

export default Card
