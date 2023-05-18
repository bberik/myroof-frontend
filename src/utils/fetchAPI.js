const BASE_URL = process.env.REACT_APP_BASE_URL
export const request = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
    let res
    let data
    switch (method) {
        case 'GET':
            res = await fetch(BASE_URL + url, { headers })
            data = await res.json()
            
            return [data, res.status]

        case 'POST':
            // if we send form data, it is not content-type:application/json,
            // hence the bonus param 
            if (isNotStringified) {
                res = await fetch(BASE_URL + url, { headers, method, body })
                data = await res.json()
            } else {
                    res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) })
                    data = await res.json()
                    
            }
            return [data, res.status]

        case 'PUT':
            res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify(body) })
            data = await res.json()
            return [data, res.status]

        case 'DELETE':
            res = await fetch(BASE_URL + url, { headers, method })
            data = await res.json()
            return [data, res.status]
        default:
            return
    }
}