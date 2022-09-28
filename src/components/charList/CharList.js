import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import { Component } from 'react';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false
    }

    //= HOOK 
    componentDidMount () {
        this.onRequest();
    }
    
    //= CODE 
    marvelService = new MarvelService();

    onCharListLoading = () => {
        this.setState({newItemLoading: true});
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false
        }));
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({loading: true});
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
        const {charList, loading} = this.state;
        const content = charList ? this.elemAllCart(charList) : null;
        const spiner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                    {spiner}
                </ul>
                <button className="button button__main button__long">
                    <div
                        onClick={this.onRequest}
                        className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;