import React, { useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios';
  // @ts-ignore
import { Popover } from 'antd';



function FavoritePage() {

//     const variables = { userFrom: localStorage.getItem('userId') }

//     const [FavDestination, setFavDestination] = useState([])

//     useEffect(() => {
//         console.log('use effect favorite page')
//         fetchFavDestination();


//     }, [])

//     const fetchFavDestination = () => {
//         Axios.post('/api/favorite/getFavDestination', variables)
//         .then(response => {
//             if (response.data.success) {
//                 setFavDestination(response.data.favorites)
//             } else {
//                 alert('Failed to get favorited videos')
//             }
//         })
//     }



//   // @ts-ignore
//     const onClickRemove = (movieId) => {
        
//         const variable = {
//             // @ts-ignore
//             locationId: locationId,
//             userFrom:  localStorage.getItem('userId')
//         }

//         Axios.post('/api/favorite/removeFromFavorite', variable)
//         .then(response=> {
//             if(response.data.success) {
               
//                 fetchFavDestination();

//             } else {
//                 alert(' Failed to remove from favorite')
//             }
//         })

//     }


    const renderTableBody = FavDestination.map((movie, index) => {


        const content = (
            <div>
                {
                    // @ts-ignore
                movie.moviePost ? 
                  // @ts-ignore
                <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost" />
                : 
                "no Image"}
            </div>
        )

        return <tr >
            <Popover content={content} title={`${
                // @ts-ignore
              movie.movieTitle
              }`} >

                <td>{
                  // @ts-ignore
                movie.movieTitle
                }</td>

            </Popover>
            <td>{
              // @ts-ignore
            movie.movieRunTime
            } mins</td>
            <td><button onClick={()=>onClickRemove(
                // @ts-ignore
              movie.movieId
              )}>
                Remove from the Favorites</button></td>
        </tr>


    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>My Favorites</h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Destination Title	</th>
                        <th>Destination Description</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>

                    {renderTableBody}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;