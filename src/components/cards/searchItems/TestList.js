import React from 'react'

const TestList = ({data}) => {
  return (
    <div>
        {data.requests.map((request) => (   
            <div>
                <h1>{request.title}</h1>
                <h1>{request.description}</h1>
            </div>

            )
        )}

    </div>
  )
}

export default TestList