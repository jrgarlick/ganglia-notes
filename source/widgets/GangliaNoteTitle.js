import React from 'react';
import StringUtils from "../utils/stringUtils";

const GangliaNoteTitle = ({ title }) => {
  var formattedTitle = StringUtils.cleanTitle(title);
  return <span>{formattedTitle}</span>;
}
export default GangliaNoteTitle;