import translations from './index'

export const extractTranslations = (keys: string[]): Record<string, Record<string, string>> => {
  const result = {}
  keys.forEach((key) => {
    result[key] = {}
  })
  Object.entries(translations).forEach(([language, resource]) => {
    if (!resource) {
      return

    }
      keys.forEach((key) => {
        console.log(key, language, resource)
        const [section, target] = key.split(':')
        result[key][language] = resource[section][target]
      })
  })
  return result
}
