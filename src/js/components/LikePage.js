import React,{Component} from 'react';
import BottomBar from './BottomBar';
import '../../less/like.less';
import EmptyContent from './EmptyContent';


class LikePage extends Component{
    constructor(){
        super();
        this.state = {
            likes:[]
        }
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
                {!length&&<EmptyContent/>}
                <BottomBar selected="like"/>
            </div>
        )

    }
}
export default LikePage;