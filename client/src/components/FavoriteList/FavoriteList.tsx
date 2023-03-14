// import React, { useEffect, useState } from 'react'
// import './favorite.css';
// import Axios from 'axios';
// // import { Popover } from 'antd';



// function FavoritePage() {

//     const variables = { userFrom: localStorage.getItem('userId') }

//     const [FavDestination, setFavDestination] = useState([])

//     useEffect(() => {

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




//     const onClickRemove = (movieId) => {
        
//         // const variable = {
//         //     locationId: locationId,
//         //     userFrom:  localStorage.getItem('userId')
//         // }

//         // Axios.post('/api/favorite/removeFromFavorite', variable)
//         // .then(response=> {
//         //     if(response.data.success) {
               
//         //         fetchFavDestination();

//         //     } else {
//         //         alert(' Failed to remove from favorite')
//         //     }
//         // })

//     }


//     const renderTableBody = FavDestination.map((movie, index) => {


//         // const content = (
//         //     <div>
//         //         {movie.moviePost ? 
//         //         <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost" />
//         //         : 
//         //         "no Image"}
//         //     </div>
//         // )

//         // return <tr >

//         //     <Popover content={content} title={`${movie.movieTitle}`} >

//         //         <td>{movie.movieTitle}</td>

//         //     </Popover>
//         //     <td>{movie.movieRunTime} mins</td>
//         //     <td><button onClick={()=>onClickRemove(movie.movieId)}>
//         //         Remove from the Favorites</button></td>
//         // </tr>


//     // })

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>
//             <h3>My Favorites</h3>
//             <hr />

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Destination Title	</th>
//                         <th>Destination Description</th>
//                         <th>Remove from favorites</th>
//                     </tr>
//                 </thead>
//                 <tbody>

//                     {renderTableBody}

//                 </tbody>
//             </table>
//         </div>
//     )
// }

// // export default FavoritePage;

export default {};