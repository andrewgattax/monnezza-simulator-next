import React, { ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
  parentId: string;
  title: string;
  isShown?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ children, title, parentId, isShown }) => {
  const id = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className={`accordion-button ${isShown ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`}
          aria-expanded={isShown} aria-controls={id}>
          {title}
        </button>
      </h2>
      <div id={id} className={`accordion-collapse collapse ${isShown ? "show" : ""}`} data-bs-parent={`#${parentId}`}>
        <div className='m-3'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;