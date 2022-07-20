export default ({ config }) => {
  return {
    ...config, extra: { localAPI: process.env.LOCAL_API === 'true', }
  }
}
