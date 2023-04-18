import { contextType } from "../../Context";

/** Functions checks all conditions regarding new categoriez the user wants to add. **/
export const checkConditionsForNewCat = (
  trimmedNewCat: string,
  trimmedNewCol: string,
  selectedCollection: string,
  ctx: contextType
) => {
  const checkForCategoryDuplicates = () => {
    const curCollection: number = ctx.collections.findIndex(
      (col) => col.name === selectedCollection
    );
    return ctx.collections[curCollection].categoriez.some(
      (cat) => cat.toLowerCase() === trimmedNewCat.toLowerCase()
    );
  };

  const checkForCollectionDuplicates = () => {
    if (selectedCollection !== "new") {
      return false;
    }
    return ctx.collections.some(
      (col) => col.name.toLowerCase() === trimmedNewCol.toLowerCase()
    );
  };

  if (trimmedNewCat === "") {
    ctx.setSnackbarMessage(
      "Bitte trage einen Namen für die neue Category ein."
    );
    ctx.setSnackbarOpen(true);
    return false;
  } else if (checkForCollectionDuplicates()) {
    ctx.setSnackbarMessage(
      "Diese Kollektion ist schon vorhanden. Hast du noch andere Ideen?"
    );
    ctx.setSnackbarOpen(true);
    return false;
  } else if (selectedCollection === "new" && trimmedNewCol === "") {
    ctx.setSnackbarMessage(
      "Bitte trage einen Namen für die neue Kollektion ein."
    );
    ctx.setSnackbarOpen(true);
    return false;
  } else if (selectedCollection !== "new" && checkForCategoryDuplicates()) {
    ctx.setSnackbarMessage(
      "Diese Category ist schon vorhanden. Hast du noch andere Ideen?"
    );
    ctx.setSnackbarOpen(true);
    return false;
  } else {
    return true;
  }
};
