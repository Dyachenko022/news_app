import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

//компонент, отвечающий за отображение новостей. Отправляет запрос на получение записей, в хедер помещаются access-token, client, uid. В случае ошибки запроса пользователя редиректит
//на страницу авторизации

const News = () => {

    const values = useSelector(selectUser)
    const history = useHistory()
    const [items, setitems] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10;
    
    const apiGetter = axios.create({
        baseURL: 'http://lzone.isfb.ru/api/v2',
        timeout: 3000,
        headers: {
            'access-token': values.accessToken,
            'client': values.client,
            'uid': values.uid
        }
    }) 

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = items.slice(firstPostIndex, lastPostIndex);
    
    useEffect(() => {
        apiGetter.get('/news').then(response => {
            console.log(response.data.news)
            setitems(response.data.news)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            history.push('/sign-up')
        })
    
    }, [])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        loading ? <div className='container mt-5'><h1>loading</h1></div> :
        <div className='container mt-5'>
            <h1 className='text-primary mb-3'>News</h1>
           <Posts posts={currentPosts} loading={loading} />
           <Pagination postsPerPage={postsPerPage} totalPosts={items.length} paginate={paginate}/>
        </div>
    )
}

export default News