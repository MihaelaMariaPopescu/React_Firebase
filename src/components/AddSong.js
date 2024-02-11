import React from 'react';
import { useEffect, useState } from "react";
import { db, auth } from '../config/firebase';
import { getDocs, collection, addDoc } from "firebase/firestore";

export const AddSong = () => {

    const songsCollectionRef = collection(db, "songs");

    const [newSongTitle, setNewSongTitle] = useState("");
    const [newArtistName, setNewArtistName] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);

    const [songList, setSongList] = useState([]);


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


    const onSubmitSong = async () => {

        try {
            await addDoc(songsCollectionRef, {
                title: newSongTitle,
                artist: newArtistName,
                releaseDate: newReleaseDate,
                userId: auth?.currentUser?.uid,
            });
            getSongList();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getSongList();
    }, [])


    return (
        <div>
            <input
                placeholder="Song title..."
                onChange={(e) => setNewSongTitle(e.target.value)}
            />

            <input
                placeholder="Artist name..."
                onChange={(e) => setNewArtistName(e.target.value)}
            />
            <input
                placeholder="Release Date..."
                type="number"
                onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            />

            <button onClick={onSubmitSong}> Submit Song</button>
        </div>
    )
};