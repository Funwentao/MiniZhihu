import React,{Component} from 'react';
import BottomBar from './BottomBar';
import '../../less/like.less';
import EmptyContent from './EmptyContent';
import fetch from 'isomorphic-fetch';


class LikePage extends Component{
    constructor(){
        super();
        this.state = {
            likes:[]
        }
        this._loadData = this._loadData.bind(this);
    }
    _loadData(){
        const that = this;
        const {username} = sessionStorage.getItem('__username__');
        const url = '/api/getMyLike' + '?username=' + username;
        fetch(url,{
            method: 'GET',
            // 设置这个header，才能正确parse
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function(data){
            if(data.status === 1){
                that.setState({
                    like:data.like
                })
            }
        })
    }
    componentDidMount(){
        this._loadData();
    }
    render(){
        const {length} = this.state.likes;
        return(
            <div>
                {
                    this.state.likes.map((e,i)=>{
                        return (
                            <div className="person" key={i}>
                                <div className="head-pic">
                                    <img src={e.pic}/>
                                    <span>{e.username}</span>
                                </div>
                                <div className="tip-item">
                                    <p className="bold">{e.beLiked}</p>
                                    <p className="gray">关注者</p>
                                </div>
                            </div>
                        )
                    })
                }
                {!length&&<EmptyContent/>}
                <BottomBar selected="like"/>
            </div>
        )

    }
}
export default LikePage;