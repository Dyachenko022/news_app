import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//компонент, отвечающий за пагинацию. На вход передаются количество постов на одной странице, общее количество постов, и функция paginate из компонента news.js

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
    {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick ={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
