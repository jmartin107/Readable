import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions'

class Categories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    renderCategories = () => {
        return <div>
            <div>Categories</div>
            <ul className="category-list">
                <li key="all"><Link to='/'>All</Link></li>
                {this.props.categories.map((category) => (
                    <li key={category.name}><Link to={`/${category.path}`}>{category.name}</Link></li>
                ))}
            </ul>
        </div>
    };

    render() {
        return (
            <div className="sidebar">
                {this.renderCategories()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.posts.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);