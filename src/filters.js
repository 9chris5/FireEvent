export default [
  {
    name: 'truncate',
    execute: (value, length) => {
      if (value.length > length) {
        return value.substring(0, length) + '...'
      } else {
        return value
      }
    }
  },
  {
    name: 'truncateWords',
    execute: (value, length) => {
      if (value.split(' ').length > length) {
        return value.split(' ').splice(0, length).join(' ') + '...'
      } else {
        return value
      }
    }
  }
]
