export const getAbsoluteUrl = (hostname: string, path: string | undefined) => {
  let absoluteUrl: string;

  if (
    typeof path === 'string' &&
    path !== null &&
    path !== '' &&
    hostname !== null &&
    hostname !== ''
  ) {
    absoluteUrl = hostname.concat(path);

    return absoluteUrl;
  }

  return path;
};
