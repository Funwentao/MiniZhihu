import React,{Component} from 'react';
import Header from './Header';
import BottomBar from './BottomBar';

class Index extends Component{
    render(){
        return(
            <div>
                <Header/>
                {/*<ArticleList/>*/}
                <BottomBar/>
            </div>
        )

    }
}
export default Index;