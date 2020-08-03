import Gesture from './gesture';

// auto use
if(typeof window !== 'undefined' && window.spritejs) {
  window.spritejs.use(install);
}

export default function install({use}) {
  return [
    Gesture,
  ].reduce((pkg, Node) => {
    return Object.assign(pkg, use(Node));
  }, {});
}