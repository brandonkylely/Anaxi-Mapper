import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { favoriteAtom, addressAtom } from '../state';
  // @ts-ignore


function FavoritePage(props) {
    //const favList = useAtomValue(favoriteAtom);
    //console.log('favList',favList)
    
    const [FavoritePlaces, setFavoritePlaces] = useState([])

    
    const variable = { 
                id: props._id,
                place_id: props.place_id,
                address: props.address,
        }
    
    useEffect(() => {
        
        fetchFavoritePlaces()
        
    }, [])

    const fetchFavoritePlaces = () => {
        axios.post('/api/favorite/getFavoritePlaces', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoritePlaces(response.data.favorites)
                } else {
                    alert('Failed to get list')
                }
            })
    }
    
    const onClickRemove = (place_id) => {
        const variable = {
            _id: localStorage.getItem('_id'),
            place_id: place_id,
        }
        axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoritePlaces(FavoritePlaces.filter(place => place.place_id !== place_id))
                } else {
                    alert('Failed to remove from favorite')
                }
            })
    }

    const renderTableBody = FavoritePlaces.map((result) => {
        return <tr key={result.id}>
            <td>{result.place_id}</td>
            <td>{result.address}</td>
        </tr>
    })
            
    // favList.map((address, index) => (
    //     console.log('address', address)
    //     console.log('index', index)
    // ))
    return (
        <div className="container flex">
        <div className="m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
        
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Favorite</h5>
            
            <div className="overflow-auto">
            <table className="pb-3 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                    
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {renderTableBody}

                        </tr>
                        
                    </tbody>
                </table>

            </div>

        </div>
    </div>
    )
    }

export default FavoritePage;