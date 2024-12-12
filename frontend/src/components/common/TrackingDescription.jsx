import React, { useEffect, useState } from 'react'
import { API, DEViewRequests } from '../../helpers/api-communicator';

const TrackingDescription = () => {

  const [response, setResponse] = useState("");

  const fetchData = async () => {
    if (response.length === 0) {
      try {
        const data = await DEViewRequests()
        if (data) {
          API(`This is the sample expense of mine. advice me financially: ${JSON.stringify(data)}`)
            .then((data) => {
              setResponse(data);
            })
            .catch((err) => {
              toast.error('Something Went Wrong', {
                toastId: 'something-went-wrong',
              })
            })
        }
      } catch (err) {
        toast.error('Something Went Wrong')
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   if (requests.length !== 0) {
  //     if (response.length === 0) {

  //     }
  //   }
  // }, [requests])


  return (
    <div className='tracking-description'>
      <b>AI Recommendation:</b> <br />
      {response?.answer?.content.replace('**', '\t') ?? 'Generating...'}
    </div>
  )
}

export default TrackingDescription