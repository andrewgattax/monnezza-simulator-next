import React from 'react';

interface DashCardProps {
    title: string;
    content: string;
    hrefGoTo?: string;
}

const DashCard: React.FC<DashCardProps> = ({ title, content, hrefGoTo }) => {
    return (
        <div className="card">
            <div className="card-body custom-dashcard">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                {hrefGoTo && (
                    <a href={hrefGoTo} className="btn btn-primary">Vai a {title}</a>
                )}
            </div>
        </div>
    );
};

export default DashCard;