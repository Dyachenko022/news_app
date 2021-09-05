import React from 'react';
import axios from 'axios';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//компонент, открывающий новость

const SinglePost = () => {

    const values = useSelector(selectUser);
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const history = useHistory();

    

    const apiGetter = axios.create({
        baseURL: 'http://lzone.isfb.ru/api/v2',
        timeout: 3000,
        headers: {
            'access-token': values.accessToken,
            'client': values.client,
            'uid': values.uid
        }
    })

    useEffect(() => {
        apiGetter.get('/news').then(response => {
            setPost(response.data.news.find(p => p.id == id))
            setLoading(false)
        }).catch(error => {
            console.log(error)
            history.push('/sign-up')
        })
    }, [])

    return (
        loading ? <div className='container mt-4' ><h1>loading</h1></div> :
            <div >
                 <div className='container mt-4' ><h1>{post.title}</h1></div>
                 <div style={{position: 'absolute', left: "50%", top: "50%", transform: 'translate(-50%, -20%)'}}>
                    <div className='container mt-4'><img src={post.image_url}/></div>
                    <div className='container mt-5' dangerouslySetInnerHTML={{__html: post.body}}></div>
                 </div>
                 
            </div>
    )
}

export default SinglePost
