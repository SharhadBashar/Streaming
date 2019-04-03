import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import StreamList from './Streams/StreamList';
import StreamCreate from './Streams/StreamCreate';
import StreamShow from './Streams/StreamShow';
import StreamEdit from './Streams/StreamEdit';
import StreamDelete from './Streams/StreamDelete';
import history from '../History';

const App = () => {
    return (
        //for edit, :, then anything, the anything is a variable
        //Since :id is a variable, if we go to /streams/4 or streams/new, react sees both 4 and new as a variable.
        //So it will render the stuff from both Stream create and Stream show when you navigate to /streams/new
        //So we use Switch, and wrap everything in it, which takes care of this issue
        <div className = "ui container">
            <Router history = {history}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path = "/" exact component = {StreamList}/>
                        <Route path = "/streams/new" exact component = {StreamCreate}/>
                        <Route path = "/streams/:id" exact component = {StreamShow}/>
                        <Route path = "/streams/edit/:id" exact component = {StreamEdit}/>
                        <Route path = "/streams/delete/:id" exact component = {StreamDelete}/>
                    </Switch>
                </div>   
            </Router>
        </div>
    );
}

export default App;