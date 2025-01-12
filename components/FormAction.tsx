import React from 'react';

interface FormActionProps {
  create?: boolean;
  update?: boolean;
  remove?: boolean;
}

const FormAction: React.FC<FormActionProps> = ({ create, update, remove }) => {
  return (
    <div>
      {create && <input type='hidden' name='action' value='create' />}
      {update && <input type='hidden' name='action' value='update' />}
      {remove && <input type='hidden' name='action' value='remove' />}
    </div>
  );
};

export default FormAction;