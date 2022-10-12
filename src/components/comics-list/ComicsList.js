import './comics-list.scss';
import '../charList/charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const ComicsList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(238);
    const [charEnded, setCharEnded] = useState(false);

    //= HOOK 
    useEffect(() => {
        onRequest(offset, true);
    }, []);


    //= CODE 
    const {loading, error, getAllCharacters} = useMarvelService();
    
    const onRequest = (off, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(off, 'comics', 8)
        .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 8) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setCharEnded(() => ended);
    }

    const elemAllCart = (arr) => {
        const items = arr.map(item => {
            const styleObj = item.cover ? 'contain' : 'cover';
            const {onCharSelected} = props;

            return (
                    <li
                    className={(props.charId === item.id) ? 'char__item item-hi char__item_selected' : 'char__item item-hi'}
                    key={item.id}
                    onClick={(e) => onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit: styleObj, height: '270px'}}/>
                        <h4>{item.title}</h4>
                        <h4 className='mt-10'>{`${item.price}\$`}</h4>
                    </li>
            )
        });
    
        return (
                <>
                    {items}
                </>
        )
    }

    const items = elemAllCart(charList);
    const errorMsg = error ? <ErrorMessage/> : null;
    const spiner = loading && !newItemLoading ? <Spinner/> : null;
    //= RENDER 
    return (
        <>
        {hederComics}
        <div className="char__list">
            <ul className="char__grid four-row">
                {errorMsg}
                {items}
                {spiner}
            </ul>
            <button
                style={{display: charEnded ? 'none' : 'block'}}
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        </>
    )
}

const hederComics = (
    <div className="heder-comics">
        <div className="heder-comics__body">
            <img className="heder-comics__img-left" src={avengers} alt="" />
            <h2>New comics every week!<br/>Stay tuned!</h2>
            <img className="heder-comics__img-right" src={avengersLogo} alt="" />
        </div>
    </div>
);

export default ComicsList;