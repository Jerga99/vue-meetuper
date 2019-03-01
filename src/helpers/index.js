
export const rejectError = ({response = null}) => {
  let message = 'Ooops, something went wrong'

  if (response && response.data && response.data.errors) {
    message = response.data.errors.message
  }

  return Promise.reject(message)
}

export const applyFilters = (url, filter) => {
  if (filter) {
    let filteredEntities = ''
    if (url.indexOf('?') === -1) {
      url += '?'
    } else {
      url += '&'
    }

    Object.keys(filter).forEach(key => {
      filteredEntities += `${key}=${filter[key]}&`;
    })

    if (filteredEntities.slice(-1) === '&') {
      filteredEntities = filteredEntities.slice(0, -1)
    }

    return url + filteredEntities
  }

  return url
}

export const processLocation = location => {
  return location.toLowerCase().replace(/[\s,]+/g,'').trim()
}



