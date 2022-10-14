import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';

const  App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                        <Route exact path='/comics'>
                            <ComicsPage/>
                        </Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )
    
}




export default App;





