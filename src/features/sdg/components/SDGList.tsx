import FloqCheckbox from "common/floq/components/FloqCheckbox/FloqCheckbox";
import React from "react";
import SDGs from "../sdg.json";

interface Props {
  selected: number[];
  onSelect: (id: number, checked: boolean) => void;
}

const SDGList: React.FC<Props> = (props: Props) => {
  const { selected, onSelect } = props;
  return (
    <div>
      {SDGs.map(sdg => (
        <div key={`sdg-${sdg.id}`}>
          <FloqCheckbox
            data-id={sdg.id}
            label={`${sdg.id}. ${sdg.title}`}
            checked={selected.includes(sdg.id)}
            onChange={(e): void => {
              onSelect(sdg.id, e.target.checked);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SDGList;
