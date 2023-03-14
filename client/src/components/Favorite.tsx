import  React, { useEffect, useState } from  'react' ;
import axios from 'axios';

function Favorite(props) {
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    
    const variable = {
                //TODO: need to fill in the variable
                userFrom: props.userFrom,
                locationId: props.locationId,
                locationName: props.locationName,
                locationType: props.locationType,
                locationImage: props.locationImage,
                
            }

    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get favorite Number')
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorited( response.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })

        }, [])

        const onClickFavorite = () => {
            if (Favorited) {
                // When it's already added to favorite, we need to remove it
                axios.post('/api/favorite/removeFromFavorite', variable)
                    .then(response => {
                        if (response.data.success) {
                            setFavoriteNumber(FavoriteNumber - 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Failed to remove from favorite')
                        }
                    })
            } else {
                // When it's not added to favorite, we need to add it
                axios.post('/api/favorite/addToFavorite', variable)
                    .then(response => {
                        if (response.data.success) {
                            setFavoriteNumber(FavoriteNumber + 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Failed to add to favorite')
                        }
                    })
            }
        }

    return (
<div className="p-4">        
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lorem Ipsum</h5>
    </a>

    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus venenatis odio, commodo laoreet ex blandit eu. </p>
        
    <button onClick={onClickFavorite} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        {Favorited ? " remove from Favorite " : " Add to Favorite "}{FavoriteNumber} 
    </button>
</div>
</div>
        
    );
}

export default Favorite;