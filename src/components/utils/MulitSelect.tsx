import { Collection, useGameContext } from "../../Context";
import { ChangeEvent, ReactPropTypes, SyntheticEvent, useState } from "react";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps,
  Checkbox,
  createFilterOptions,
  FilterOptionsState,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import placeholder from "lodash/fp/placeholder";

const selectAllOption: Collection = {
  name: "select-all",
  id: "reserved-select-all",
  categoriez: [],
};

type CategoriezAutocomplete = AutocompleteProps<Collection, true, false, false>;

export const MultiSelect = (props: {
  items: Collection[];
  label: string;
  placeholder: any;
  // selectAllLabel: any;
  noOptionsText: CategoriezAutocomplete["noOptionsText"];
  limitTags: CategoriezAutocomplete["limitTags"];
  onChange: any;
}) => {
  const ctx = useGameContext();

  const [selectedOptions, setSelectedOptions] = useState<Collection[]>([]);
  const allSelected = props.items.length === selectedOptions.length;
  const handleToggleOption = (selectedOptions: Collection[]) =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const getOptionLabel = (option: Collection) => option.name;
  const handleSelectAll = (allCheckboxIsSelected: boolean) => {
    if (allCheckboxIsSelected) {
      setSelectedOptions(props.items);
    } else {
      handleClearOptions();
    }
  };
  const handleToggleSelectAll = () => {
    handleSelectAll(!allSelected);
  };
  // ToDo name === select-all muss ergänzt werden
  const handleChange: CategoriezAutocomplete["onChange"] = (
    e,
    selectedOptions,
    reason
  ) => {
    if (reason === "selectOption" || reason === "removeOption") {
      if (selectedOptions.find((option) => option.name === "select-all")) {
        handleToggleSelectAll();
        let result = [];
        result = props.items.filter((el) => el.name !== "select-all");
        return props.onChange(result);
      } else {
        handleToggleOption(selectedOptions);
        return props.onChange(selectedOptions);
      }
    } else if (reason === "clear") {
      handleClearOptions && handleClearOptions();
    }
  };

  const optionRenderer: CategoriezAutocomplete["renderOption"] = (
    _,
    option,
    { selected }
  ) => {
    const selectAllProps =
      option.name === "select-all" // To control the state of 'select-all' checkbox
        ? { checked: allSelected }
        : {};
    return (
      <>
        <Checkbox
          color="primary"
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
          {...selectAllProps}
        />
        {getOptionLabel(option)}
      </>
    );
  };

  const inputRenderer: CategoriezAutocomplete["renderInput"] = (params) => (
    <TextField {...params} label={props.label} placeholder={placeholder} />
  );

  const getOptionSelected: CategoriezAutocomplete["isOptionEqualToValue"] = (
    option,
    anotherOption
  ) => option.name === anotherOption.name;

  const filter = createFilterOptions<Collection>();

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={props.limitTags}
      options={props.items}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={getOptionSelected}
      noOptionsText={props.noOptionsText}
      filterOptions={(
        options: Collection[],
        params: FilterOptionsState<Collection>
      ) => {
        const filtered = filter(options, params);
        return [selectAllOption, ...filtered] as Collection[];
      }}
      onChange={handleChange}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  );
};

// MultiSelect.defaultProps = {
//   limitTags: 5,
//   items: [],
//   selectedValues: [],
//   getOptionLabel: name => name
// };
//
// export default MultiSelect;

// Controlled states:
// 1) value = this states represents the value selected by the user
// 2) input value = this state represents the value displayed in the textbox

// Multiple Values => Checkbox + Limit Tags
