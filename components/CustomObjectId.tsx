import React from 'react';

interface ObjectIdProps {
  objectId: string | undefined;
  nome: string
}

const CustomObjectId: React.FC<ObjectIdProps> = ({ objectId, nome }) => {
  return ( (objectId === '' || objectId === undefined) ? null :
    <div>
      <input type="hidden" name={nome} value={objectId} />
    </div>
  );
};

export default CustomObjectId;