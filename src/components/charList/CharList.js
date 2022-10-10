import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import useHttp from '../hooks/http.hook';

const  CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(238);
    const [charEnded, setCharEnded] = useState(false);


    //= HOOK 
    useEffect(() => {
        onRequest();
    }, []);

    //= CODE 
    const marvelService = new MarvelService();

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onRequest = (off) => {
        onCharListLoading();
        marvelService.getAllCharacters(off)
        .then(onCharListLoaded)
        .catch(onError);
    }

    const onCharLoading = () => {
        setLoading(true);
    }
    

    const elemAllCart = (arr) => {
        const items = arr.map(item => {
            const styleObj = item.cover ? 'contain' : 'cover';
            const {onCharSelected} = props;

            return (
                    <li
                    className={(props.charId === item.id) ? 'char__item char__item_selected' : 'char__item'}
                    key={item.id}
                    onClick={(e) => onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit: styleObj}}/>
                        <div className="char__name">{item.name}</div>
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
    const content = !(loading || error) ? items : null;
    const spiner = loading ? <Spinner/> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMsg}
                {content}
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
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
} 

export default CharList;