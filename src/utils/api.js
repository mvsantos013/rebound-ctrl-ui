import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_PATH,
})

function responseInterceptor(response) {
  response.ok = [200, 201].includes(response.status)

  if (response.data?.data) response.data = response.data.data

  const hasAttachments =
    response.headers['content-disposition'] &&
    response.headers['content-disposition'].includes('attachment')

  if (hasAttachments) {
    // Force download if it's an attachment
    let data = response.data
    if (response.headers['content-type'].includes('application/json'))
      data = JSON.stringify(data)

    const filename = response.headers['content-disposition'].split('=')[1]
    const url = window.URL.createObjectURL(
      new Blob([data], {
        type: response.headers['content-type'],
      }),
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
  }
  return response
}

// Show error banner in case of response error
function responseErrorHandler(e) {
  let msg
  if (e?.response?.data?.error) msg = `Error: ${e.response.data.error}`
  else msg = 'Unexpected Network Error'
  Vue.$toast.open({ message: msg, type: 'error' })
  return { ok: false }
}

// Add Axios response interceptor
api.interceptors.response.use(responseInterceptor, responseErrorHandler)

export default api
