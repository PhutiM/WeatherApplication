module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
      'jest': true,
    },
    'rules': {
      'no-use-before-define': 'off',
      "no-unused-expressions": "off",
      "react/jsx-props-no-spreading": "off",
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'react/no-array-index-key': 'off',
      'no-plusplus': 'off',
      'comma-dangle': 'off',
      'global-require': 'off',
      'array-callback-return': 'off',
      'no-unused-vars': 'off',
      'import/no-unresolved': 'off',
      'consistent-return': 'off',
      'no-undef': 'off'
    },
    'globals': {
      "fetch": false
    }
  }