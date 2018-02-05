import React,{Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';

class BottomBar extends Component{
    static propTypes = {
        selected: PropTypes.string.isRequired
    }
    render(){
        return(
            <div style={  {position: 'fixed', width: '100%', bottom: 0} }>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item title="首页"
                         selected = {this.props.selected==="index"?true:false}
                         icon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/index.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                         selectedIcon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/index-selected.svg) center center /  21px 21px no-repeat'
                         }}
                         />
                         }
                         onPress={()=>{location.href="/index"}}
                    />
                    <TabBar.Item title="关注"
                         selected = {this.props.selected==="like"?true:false}
                         icon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/like.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                         selectedIcon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/like-selected.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                                 onPress={()=>{location.href="/like"}}
                    />
                    <TabBar.Item title="收藏"
                         selected = {this.props.selected==="collection"?true:false}
                         icon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/collection.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                         selectedIcon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/collection-selected.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                                 onPress={()=>{location.href="/collection"}}
                    />
                    <TabBar.Item title="我的"
                         selected = {this.props.selected==="my"?true:false}
                         icon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/my.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                         selectedIcon={<div style={{
                             width: '22px',
                             height: '22px',
                             background: 'url(../../svg/my-selected.svg) center center /  21px 21px no-repeat' }}
                         />
                         }
                         onPress={()=>{location.href="/my"}}
                    />
                </TabBar>
            </div>
        )
    }
}
export default BottomBar;