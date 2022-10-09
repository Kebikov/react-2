import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';


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
        function scroll() {
            console.log('1', document.documentElement.clientHeight + window.scrollY);
            console.log('2', document.documentElement.scrollHeight);
                if(document.documentElement.clientHeight + window.scrollY + 1 >= document.documentElement.scrollHeight && window.scrollY > 1) {
                    console.log('загрузка...');
                    onRequest(offset);
                } 
        }
        window.addEventListener('scroll', scroll);

        return () => {
            window.removeEventListener('scroll', scroll);
        }
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

        onCharLoading();

        setCharList([...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
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

        const content = charList ? elemAllCart(charList) : null;
        const spiner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
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