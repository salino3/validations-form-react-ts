import React from 'react';
import './btn-validation-form.scss';

interface Props {
  startValidation: boolean;
};

export const ValidationButton: React.FC<Props> = ({ startValidation }) => {
  return (
    <button type="submit" id='btn' disabled={startValidation}>
      Register
    </button>
  );
};
