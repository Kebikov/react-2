import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import { Component } from 'react';


class CharList extends Component {
    state = {
        loading: true
    }

    marvelService = new MarvelService();

    infoChars = () => {
        this.marvelService.getAllCharacters()
        .then(item => {
            this.setState({info: item,
            loading: false});
        });
    }


    componentDidMount () {
        this.infoChars();
    }

    elemAllCart = (arr) => {
        const items = arr.map(item => {
        const styleObj = item.cover ? 'contain' : 'cover';
            return (
                    <li className="char__item" key={item.id}>
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

    render() {
        const {info, loading} = this.state;
        const content = info ? this.elemAllCart(info) : null;
        const spiner = loading ? <Spinner/> : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                    {spiner}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;