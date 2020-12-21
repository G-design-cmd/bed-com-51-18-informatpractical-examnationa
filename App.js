import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserService from "./components/users/users.service";

const About = lazy(() => import("./components/about"))
const Footer = lazy(() => import("./components/footer"))
const Header = lazy(() => import("./components/header"))
const Home = lazy(() => import("./components/main/home.main"))

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            search: {},
            searcheable: []
        }
    }

    setSearcheableList = resp => this.setState({ searcheable: resp })

    setSearch = term => this.setState({ search: term })

    handleSearchTextChange = e => this.setSearch({ [e.target.name]: e.target.value })

    componentDidMount() {
        UserService.getUsers()
            .then(response => this.setSearcheableList(response))
            .catch(error => console.log(error))
    }

    render() {
        const { searcheable, search } = this.state;

        return (<Router>
            <Suspense fallback={<div>Loading, Please wait...</div>}>
                {/* Header Section */}
                <Header searcheable={searcheable} onChange={this.handleSearchTextChange} />
                {/* Main Content */}
                <Switch>
                    <Route exact path='/' render={props => <Home {...props} searchTerm={search || null} />} />
                    <Route exact path='/about' render={(props) => <About {...props} />} />
                </Switch>
                {/* Footer Section */}
                <Footer />
            </Suspense>
        </Router>)
    }
}

export default App;
