import React, { useEffect, useState } from 'react'
// import './favorite.css';
import Axios from 'axios';
  // @ts-ignore

function FavoritePage() {
    return (
        <div className="m-4 float-right bg-white border border-gray-200 rounded-lg shadow p-4">
        
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Favorite</h5>
            
            <div className="relative overflow-scroll">
                <table className="w-full pb-3 text-sm text-left text-gray-500 dark:text-gray-400">
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
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Laptop
                            </td>

                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                           
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
    }

export default FavoritePage;