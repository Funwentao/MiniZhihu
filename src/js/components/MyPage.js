import React,{Component} from 'react';
import BottomBar from './BottomBar';
import {List} from 'antd-mobile';
import '../../less/my.less';

class MyPage extends Component{
    constructor(){
        super();
        this.state = {
            pic:'/src/img/810438.jpg',
            username:'funwt',
            like:0,
            beLiked:0
        }
    }
    render(){
        return(
            <div>
                <div className="header">
                    <h1>个人主页</h1>
                </div>
                <div className="person">
                    <div className="head-pic">
                        <img src={this.state.pic}/>
                        <span>{this.state.username}</span>
                    </div>
                    <div className="tip">
                        <div className="tip-item">
                            <p className="bold">{this.state.like}</p>
                            <p className="gray">关注</p>
                        </div>
                        <div className="tip-item">
                            <p className="bold">{this.state.beLiked}</p>
                            <p className="gray">关注者</p>
                        </div>
                        <div className="big-tip-item">
                            <a href="javascript:;" className="btn">编辑</a>
                        </div>
                    </div>
                </div>
                <div className="information">
                    <List>
                        <List.Item>
                            原创文章
                        </List.Item>
                        <List.Item>
                            原创问题
                        </List.Item>
                        <List.Item>
                            我的关注
                        </List.Item>
                        <List.Item>
                            我的收藏
                        </List.Item>
                    </List>
                </div>
                <div className="login-out">
                    退出登录
                </div>
                <BottomBar selected="my"/>
            </div>
        )

    }
}
export default MyPage;