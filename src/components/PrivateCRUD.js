import React from 'react';
import { useEffect, useState } from "react";
import { db } from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";


export const PrivateCRUD = () => {
    const [songList, setSongList] = useState([]);
    const songsCollectionRef = collection(db, "songs");

    const [newSongTitle, setNewSongTitle]= useState("");
    const [newArtist, setNewArtist]= useState("");
    const [newRelease, setNewRelease]= useState("");

    const [updatedTitle, setUpdatedTitle] = useState("");

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


    const deleteSong = async (id) => {
        const songDoc = doc(db, "songs", id);
        await deleteDoc(songDoc);
        getSongList();
    }


    const updateSongTitle = async (id) => {
        const songDoc = doc(db, "songs", id);
        await updateDoc(songDoc, { title: updatedTitle });
        getSongList();
    };

    const onSubmitSong = async () => {
        try{
              await addDoc(songsCollectionRef, 
            {title: newSongTitle, artist: newArtist, releaseDate: newRelease})
            getSongList();
            
        } catch (err){
            console.error(err);
        }
      
    }
    return (
        <div>
            <div>

            <input placeholder="Song title..."
                    onChange={(e) => setNewSongTitle(e.target.value)}/>
            <input placeholder="Artist name..."
                    onChange={(e) => setNewArtist(e.target.value)}/>
            <input placeholder="Duration..."
                    onChange={(e) => setNewRelease(e.target.value)}/>
            <button onClick={onSubmitSong}> Submit Song </button>

            </div>
            {songList.map((song) => (
                <div>
                    <h1>
                        {song.title}
                    </h1>
                    <h4>
                        {song.artist}
                    </h4>
                    <p> Date: {song.releaseDate} </p>

                    <button onClick={() => deleteSong(song.id)}> Delete Song</button>

                    <input
                        placeholder="new title..."
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <button onClick={() => updateSongTitle(song.id)}>
                        {" "}
                        Update Title
                    </button>
                </div>
            ))}

        </div>
    )
};