const getClaimedUniquesAsset = async (api, classId, instanceId) => {
  const asset = {
    classId,
    instanceId
  };
  try {
    if (classId && instanceId) {
      let [classMeta, instanceMeta] = await Promise.all([
        api.query.uniques.classMetadataOf(classId),
        api.query.uniques.instanceMetadataOf(classId, instanceId)
      ]);

      classMeta = classMeta?.unwrapOrDefault()?.toHuman();
      instanceMeta = instanceMeta.unwrapOrDefault()?.toHuman();

      asset.classMetadata = classMeta?.data;
      asset.instanceMetadata = instanceMeta?.data;
    }
  } catch (err) {
    console.log(`error reading uniques metadata ${err}`);
  }
  return asset;
};

export const getClaimedAssets = async (api, events) => {
  const claimed = { uniques: [], balances: [], assets: [] };
  for (const { event } of events) {
    if (api.events.balances && api.events.balances.Transfer.is(event)) {
      // parse claimed balances
      const claimedBalance = event?.data[2]?.toString();
      claimedBalance && claimed.balances.push(claimedBalance);
    } else if (api.events.uniques && api.events.uniques.Transferred.is(event)) {
      // parse claimed uniques
      const classId = event?.data[0]?.toString();
      const instanceId = event?.data[1]?.toString();
      const claimedAsset = await getClaimedUniquesAsset(api, classId, instanceId);
      claimedAsset && claimed.uniques.push(claimedAsset);
    }
  }
  return claimed;
};
