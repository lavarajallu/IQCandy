// navigationUtils.js
export const goBack = (navigation) => {
  if (navigation) {
    navigation.goBack({navigation:navigation});
  }
};
