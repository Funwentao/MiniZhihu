import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import ArticleList from './ArticleList';
import {Tabs} from 'antd-mobile';


class MyPage extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <BottomBar selected="my"/>
            </div>
        )

    }
}
export default MyPage;