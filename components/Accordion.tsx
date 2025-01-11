import React, { ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
  accordionId: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, accordionId }) => {
  return (
    <div className="accordion mt-4 mb-4" id={accordionId}>
      {children}
    </div>
  );
};

export default Accordion;