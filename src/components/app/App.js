import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MyDiv = (props) => {
    return (
        <div style={{border: '2px solid ' + props.color}}>
            {props.children}
        </div>
    )
}


class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (chois) => {
        this.setState({selectedChar: chois});
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <MyDiv color={'green'}>
                    <h1>Hello!</h1>
                </MyDiv>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList 
                            onCharSelected={this.onCharSelected}/>
                        <ErrorBoundary>
                            <CharInfo
                                charId={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}


export default App;

