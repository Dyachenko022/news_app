import Login from './components/login';
import './app.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import News from './components/news';
import SinglePost from './components/SinglePost';
function App() {
  return (
   <Router>
     <main>
       <Switch>
         <Route path='/news/:id'>
           <SinglePost/>
         </Route>
         <Route path='/sign-up'>
            <Login/>
         </Route>
         <Route path='/news'>
            <News/>
         </Route>
         <Route path='/'>
           <Redirect to='/sign-up'/>
         </Route>
       </Switch>
    </main>
   </Router>
  );
}

export default App;
