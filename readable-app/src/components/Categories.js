import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions'

class Categories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <div>Categories</div>
                    <ul className="category-list">
                    <li key="all"><Link to='/'>All</Link></li>
                    {this.props.categories.map((category) => (
                        <li key={category.name}><Link to={`/${category.path}`}>{category.name}</Link></li>
                    ))}
                    </ul>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)