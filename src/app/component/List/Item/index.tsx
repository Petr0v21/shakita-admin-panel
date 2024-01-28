import React, { ReactNode, useState } from 'react';
import { StyledListItem } from '../../../styled-components/List';

type ListItemProps = {
  values: string[];
  id?: string;
  isHeader?: boolean;
  children?: ReactNode;
};

const Item: React.FC<ListItemProps> = ({ values, id, children, isHeader }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyText = (item: string) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StyledListItem header={isHeader} count_text={values.length}>
      {/* TODO maybe use toast */}
      <div className={`copy-toast${isCopied ? '-active' : ''}`}>Copied!</div>
      <div className="item-content">
        {values.map((item) => (
          <span
            key={id + item}
            onClick={!isHeader ? () => copyText(item) : undefined}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="item-buttons-container">{children}</div>
    </StyledListItem>
  );
};

export default Item;
