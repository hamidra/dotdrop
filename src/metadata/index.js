import cidMapping from './cidMapping.json';
const basePath = `${process.env.PUBLIC_URL}/assets/nfts/previews`;
const ext = '.png';
export const resolveAssetImage = (classMetadata, instanceMetadata) => {
  const filename =
    cidMapping?.[instanceMetadata] || cidMapping?.[classMetadata];
  let imageSrc;
  if (filename) {
    imageSrc = `${basePath}/${filename}` + (ext || '');
  }
  return imageSrc;
};
