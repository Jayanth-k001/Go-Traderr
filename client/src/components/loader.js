import React from 'react'
import loading from './loading.gif'

export const Spinner = ()=> {
        return (
            <div className="text-center">
                <img className="my-9" src={loading} alt="loading" />
            </div>
        )
}