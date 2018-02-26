const findNextMerge = ([e1], [e2], mergers) => {
  const merger = mergers.find(([m1, m2]) => e1 === m1 && e2 === m2);
  return merger && merger[2];
};

export default findNextMerge;
