"use client";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useEpoch } from './EpochContext';

const SuccessfulOperationToast: React.FC = () => {
    const { lastOperationEpoch, updateEpoch } = useEpoch();

    useEffect(() => {
        if (lastOperationEpoch && Date.now() - lastOperationEpoch >= 2000) {
            updateEpoch();
            toast.success('Operazione completata con successo!');
        }
    }, []);

    return null;
};

export default SuccessfulOperationToast;