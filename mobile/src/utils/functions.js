const retrieveSiteName = (site) => {
  const firstDotIndex = site.indexOf('.');
  const secondDotIndex = site.lastIndexOf('.');

  if (firstDotIndex !== -1 && secondDotIndex !== -1) {
    return site.substring(firstDotIndex + 1, secondDotIndex);
  }

  return site;
};

const validator = (items) => {
  let validate = [];
  for (const item of items) {
    switch (item.field) {
      default:
        if (!item.value || item.value === '') {
          validate.push({
            field: item.field,
            rule: 'required',
          });
        }
        break;
    }
  }

  return validate;
};

module.exports = {
  retrieveSiteName,
  validator,
};
