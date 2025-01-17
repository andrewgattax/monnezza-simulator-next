import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkInProgress: React.FC = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
                <h1 className="mt-3">Work In Progress</h1>
                <p className="text-muted">Stiamo lavorando duro per completare questa funzionalità, torna presto!</p>            
            </div>
        </div>
    );
};

export default WorkInProgress;