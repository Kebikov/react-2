import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';
import { Component } from 'react';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 238,
        charEnded:false
    }

    //= HOOK 
    componentDidMount () {
        this.onRequest();
        window.addEventListener('scroll', () => {
            if(document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight && window.scrollY > 1) {
                this.onRequest(this.state.offset);
            } 
        });
    }
    
    //= CODE 
    marvelService = new MarvelService();

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        this.onCharLoading();
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        });
    }

    elemAllCart = (arr) => {
        const items = arr.map(item => {
        const styleObj = item.cover ? 'contain' : 'cover';
        const {onCharSelected} =this.props;

            return (
                    <li 
                        className="char__item" 
                        key={item.id}
                        onClick={() => onCharSelected(item.id)}>
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

    //= RENDER() 
    render() {
        const {charList, loading, offset, newItemLoading, charEnded} = this.state;
        const content = charList ? this.elemAllCart(charList) : null;
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
                    onClick={() => this.onRequest(offset)}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
} 

export default CharList;