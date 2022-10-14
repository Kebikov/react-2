import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';

const  CharList = (props) => {
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
        getAllCharacters(off)
        .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        //lod-false
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(() => ended);
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
    const spiner = loading && !newItemLoading ? <Spinner/> : null;
    //= RENDER 
    return (
        <div className="char__list">
            <ul className="char__grid">
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
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
} 

export default CharList;