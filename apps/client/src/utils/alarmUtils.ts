const formatPushType = (type: string) => {
  switch (type) {
    case 'P0001':
      return 'brf'
    case 'P0004':
      return 'response'
    case 'P0000':
      return 'push'
    default:
      return 'alert'
  }
}

export { formatPushType }
