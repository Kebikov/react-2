import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import { useParams, useNavigate } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

const SingleComic = () => {
    const [comic, setComic] = useState({});
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const {comicId} = useParams();
    
    useEffect(() => {
        getCharacters(comicId, 'comics')
        .then(data => setComic(data));
    },[comicId]);

    
    const {getCharacters, loading, error} = useMarvelService();
    const content = (loading && !error) ? <Spinner/> : <BodyComic comic={comic} goBack={goBack}/>
    const errorMsg = error ? <ErrorMessage/> : null; 

    return (
        <>
            {content}
            {errorMsg}
        </>
    )
}

const BodyComic = ({comic, goBack}) => {
    return(
        <div className="single-comic">
            <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{!comic ? comic.title : 'NOT COMIC'}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{`${comic.pageCount} pages`} </p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{`${comic.price} $`}</div>
            </div>
            <Link to={'../'} className="single-comic__back">Back to all</Link>
            <div onClick={goBack} className="single-comic__back">Back to back</div>
        </div>
    )
}

export default SingleComic;
