module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**'
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function (ns, value) {
        return value
      },
      acorn: {
        ecmaVersion: 2020,
        sourceType: 'module' // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      }
    },
    lngs: ['en', 'de'],
    ns: ['translation'],
    defaultLng: 'en',
    defaultNs: 'translation',
    defaultValue: function(lng, ns, key) {
      if (lng === 'en') {
        // Return key as the default value for English language
        return key
      }
      // Return the string '__NOT_TRANSLATED__' for other languages
      return '__NOT_TRANSLATED__'
    },
    resource: {
      loadPath: './locale/{{lng}}/{{ns}}.json',
      savePath: './locale/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: ':', // namespace separator
    keySeparator: ':', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    },
    metadata: {},
    allowDynamicKeys: false,
  },
}
