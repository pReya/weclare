import Logger from "./Logger";

const getFormattedDate = () => {
  const today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}-${mm}-${yyyy}`;
};

export const downloadFile = data => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute(
    "download",
    `weclare-${getFormattedDate()}.json`
  );
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  Logger.info("Created and started file download");
};

export const saveToStorage = data => {
  localStorage.setItem("weclare", data);
  Logger.info("Saved questionset to local storage");
};
