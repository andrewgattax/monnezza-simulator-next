import React, { ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
  accordionId: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, accordionId }) => {
  return (
    <div className="accordion mt-3 mb-3" id={accordionId}>
      {children}
    </div>
  );
};

export default Accordion;