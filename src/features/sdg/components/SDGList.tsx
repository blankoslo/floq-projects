import FloqCheckbox from "common/floq/components/FloqCheckbox/FloqCheckbox";
import React from "react";
import SDGs from "../sdg.json";

interface Props {
  selected: number[];
}

const SDGList: React.FC<Props> = (props: Props) => {
  const { selected } = props;
  return (
    <ul>
      {SDGs.map(sdg => (
        <li key={`sdg-${sdg.id}`}>
          <FloqCheckbox
            label={`${sdg.id}. ${sdg.title}`}
            checked={sdg.id in selected}
          />
        </li>
      ))}
    </ul>
  );
};

export default SDGList;
