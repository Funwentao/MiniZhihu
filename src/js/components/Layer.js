import React,{Component} from 'react';
import '../../less/layer.less';
import PropTypes from 'prop-types'


class Layer extends Component{
    static propTypes = {
        closeHandler:PropTypes.func.isRequired
    }
    render(){
        return(
            <div className="layer">
                <div className="children">
                    <a href="javascript:;" className="close" onClick={this.props.closeHandler}>&times;</a>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default Layer;