import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = (props) => {

    const [char, setChar] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [cover, setCover] = useState(true);

    useEffect(() => {
        updateChar();
    },[]);

    const {loading, error, getCharacters} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        setLoading(true);
        setError(false);
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService
        .getCharacters(id)
        .then(onCharLoaded)
        .catch(onError);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const  spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name,description,thumbnail,homepage,wiki,cover} = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: `${cover ? 'contain' : 'cover'}`}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;



