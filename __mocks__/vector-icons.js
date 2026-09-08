const React = require('react');
const { Text } = require('react-native');

function MockIonicons({ name, ...props }) {
  return React.createElement(Text, props, name);
}

module.exports = { Ionicons: MockIonicons };
