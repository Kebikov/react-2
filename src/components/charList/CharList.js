import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';


class CharList extends Component {
    state = {
    }

    marvelService = new MarvelService();

    infoChars = () => {
        this.marvelService.getAllCharacters()
        .then(item => {
            this.setState({info: item});
        });
    }


    componentDidMount () {
        this.infoChars();
    }

    render() {
        const {info} = this.state;
        const content = info ? <ElemAllCart obj={info}/> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const ElemAllCart = ({obj}) => {

    let i = 0;
    const arr = obj.map(item => {
        i++;
        return <ElemCart key={i} name={item.name} img={item.thumbnail}/>
    });

        return (
            <>
                {arr}
            </>
        )
}

const ElemCart = ({name, img}) => {
    return (
        <>
        <li className="char__item">
            <img src={img} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    </>
    )
};

export default CharList;