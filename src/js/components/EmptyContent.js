import React,{Component} from 'react';
import ReactSVG from 'react-svg';
import '../../less/empty.less';

export default function EmtpyContent() {
    return(
        <div className="empty-content">
            <ReactSVG
                path="../../svg/empty.svg"
                className="empty-svg"
            />
            <p>暂无内容...</p>
        </div>
    )
}