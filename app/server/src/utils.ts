function parsePlayerIdentifiers(identifiers: string[]) {
  let i = {};
  identifiers.forEach((id) => {
    const [platform, idNumber] = id.split(':');

    i = { ...i, [platform]: idNumber };
  });
  return i;
}

export { parsePlayerIdentifiers };
