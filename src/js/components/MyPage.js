import React,{Component} from 'react';
import BottomBar from './BottomBar';
import {List,Button} from 'antd-mobile';
import '../../less/my.less';
import Layer from './Layer';
//import fetch from 'isomorphic-fetch';
import Promise from 'pinkie-promise';
import 'whatwg-fetch';


class MyPage extends Component{
    constructor(){
        super();
        this.state = {
            pic:'/img/810438.jpg',
            username:'funwt',
            like:0,
            beLiked:0,
            show:false,
            tempPic:'/img/810438.jpg'
        }
        this.editHandler = this.editHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
    }
    logoutHandler(){
        sessionStorage.removeItem('__username__');
        location.href = 'login.html';
    }
    editHandler(){
        this.setState({
            show:!this.state.show
        })
    }
    uploadHandler(e){
        const that = this;
        e.preventDefault();
        const url = `/api/upload`;
        const file = e.target.files[0];

        let formData = new FormData();
        try{
            if(formData.set){
                formData.set('file',file);
            }else{
                formData.append('file',file);
            }
        }catch (e){
            console.log(e.message);
        }
        fetch(url, {
            method: 'POST',
            body:formData,
            mode: 'cors'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.status === 1) {
                that.setState({
                    tempPic:'/img/'+data.path
                })
            }
        })
    }
    render(){
        return(
            <div>
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
                            <a href="javascript:;" className="btn" onClick={this.editHandler}>编辑</a>
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
                <div className="logout" onClick={this.logoutHandler}>
                    退出登录
                </div>
                <BottomBar selected="my"/>
                {
                    this.state.show&&<Layer closeHandler={this.editHandler}>
                        <div className="layer-item">
                            <img src={this.state.tempPic} className="pic"/>
                            <input type="file" className="file-upload" accept="image/*" onChange={this.uploadHandler}/>
                        </div>
                        <div className="layer-item">
                            <input type="text" defaultValue={this.state.username} className="name-input"/>
                        </div>
                        <div className="layer-item">
                            <Button type="primary" inline size="small" onClick={this.uploadHandler}>提交</Button>
                        </div>
                    </Layer>
                }
            </div>
        )

    }
}
export default MyPage;