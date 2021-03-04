import React, { useContext, useState, useEffect } from 'react';
import { commentsContext } from '../../contexts/CommentsContext';
import './Comments.css';

const Comments = ({ id }) => {
    const {
        setDataComments,
        productsComments,
        getDataComments
    } = useContext(commentsContext);

    useEffect(() => {
        getDataComments(id);
    }, [])

    const [openReplyInput, setOpenReplyInput] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [comments, setComments] = useState({ comment: '' });

    const getCommentsInpValue = (e) => {
        const comment = {
            ...comments,
            [e.target.name]: e.target.value
        }
        setComments(comment);
    }

    return (
        <div className="comments-inner">
            <div className="add-comment-inner">
                <div className="comment-input">
                    <input
                        value={comments.comment}
                        name="comment"
                        onChange={getCommentsInpValue}
                        type="text"
                        placeholder="Add a public comment"
                    ></input>
                </div>
                <div className className="comment-add">
                    <button
                        onClick={() => setDataComments(id, comments)}
                        className="comment-add__btn"
                    >Comment</button>
                </div>
            </div>
            <div className="comments-list">
                {productsComments.map(item => (
                    <div className="comments-list-main" key={item.id}>
                        <div className="comments-list-name">
                            <span>{item.userName}</span>
                            <span>{item.date}</span>
                        </div>
                        <div className="comments-list-text">{item.comment}</div>
                        <div className="comments-actions">
                            <div
                                onClick={() => setOpenReplyInput(!openReplyInput)}
                                className="comments-list-reply"
                            >Reply</div>
                            <div
                                onClick={() => setShowReply(!showReply)}
                                className="show-reply"
                            >Show Reply</div>
                        </div>
                    </div>
                ))}
                {openReplyInput ? <div className="comments-list-reply">
                    <div className="comment-input">
                        <input
                            name="comments"
                            type="text"
                            placeholder="Add a public reply"
                        ></input>
                    </div>
                    <div className className="reply-add">
                        <button
                            onClick={() => setOpenReplyInput(!openReplyInput)}
                            className="reply-add__btn"
                        >Reply</button>
                    </div>
                </div> : null}
                {showReply ? <div className="reply-list">
                    <div className="reply-list-name">Andrey</div>
                    <div className="reply-list-text">sfsdfsdfsdfsdf</div>
                </div> : null}
            </div>
        </div>
    );
};

export default Comments;