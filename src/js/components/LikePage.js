import React,{Component} from 'react';
import BottomBar from './BottomBar';
import '../../less/like.less';


class LikePage extends Component{
    constructor(){
        super();
        this.state = {
            likes:[{
                pic:'/src/img/810438.jpg',
                username:'funwt',
                like:10,
                beLiked:0
            },{
                pic:'/src/img/810438.jpg',
                username:'funwt',
                like:10,
                beLiked:0
            },{
                pic:'/src/img/810438.jpg',
                username:'funwt',
                like:0,
                beLiked:10
            }]
        }
    }
    render(){
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
                                    <p className="bold">{e.like}</p>
                                    <p className="gray">关注</p>
                                </div>
                                <div className="tip-item">
                                    <p className="bold">{e.beLiked}</p>
                                    <p className="gray">关注者</p>
                                </div>
                            </div>
                        )
                    })
                }
                <BottomBar selected="like"/>
            </div>
        )

    }
}
export default LikePage;