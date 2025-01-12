import React from 'react';

interface ObjectIdProps {
  objectId: string | undefined;
}

const ObjectId: React.FC<ObjectIdProps> = ({ objectId }) => {
  return ( (objectId === '' || objectId === undefined) ? null :
    <div>
      <input type="hidden" name='objectId' value={objectId} />
    </div>
  );
};

export default ObjectId;