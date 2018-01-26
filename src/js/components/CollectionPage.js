import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import {Tabs} from 'antd-mobile';


class CollectionPage extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <BottomBar selected="collection"/>
            </div>
        )

    }
}
export default CollectionPage;