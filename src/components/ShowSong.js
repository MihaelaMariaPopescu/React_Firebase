import React from 'react';
import { useEffect, useState } from "react";
import { db } from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaPlay } from "react-icons/fa6";

export const ShowSong = () => {
    const [songList, setSongList] = useState([]);
    const songsCollectionRef = collection(db, "songs");

    const getSongList = async () => {

        try {
            const data = await getDocs(songsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setSongList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getSongList();
    }, []);


    return (
        <div>
            <div id="songlist">
            <h4> Title </h4>
            <h4> Artist </h4>
            <h4> Duration </h4>
            </div>
            {songList.map((song) => (
                <div id="musiccontainer">
                    <FaPlay />
                    <h1>
                        {song.title}
                    </h1>
                    <h4>
                        {song.artist}
                    </h4>
                    <p> {song.releaseDate} </p>

                </div>
            ))}

        </div>
    )
};