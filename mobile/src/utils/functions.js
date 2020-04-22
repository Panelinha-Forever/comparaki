const retrieveSiteName = (site) => {
  let nome_do_site;
  let separaporbarra = site.split('/');
  if (
    separaporbarra.indexOf('https:') != -1 ||
    separaporbarra.indexOf('http:') != -1
  ) {
    let nomes = separaporbarra[2].split('.');
    if (nomes.indexOf('www') != -1) {
      nome_do_site = nomes[1];
    } else {
      nome_do_site = nomes[0];
    }
  } else {
    let nomes = separaporbarra[0].split('.');
    if (nomes.indexOf('www') != -1) {
      nome_do_site = nomes[1];
    } else {
      nome_do_site = nomes[0];
    }
  }

  return nome_do_site;
};

module.exports = {
  retrieveSiteName,
};
