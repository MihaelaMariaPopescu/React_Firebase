import './App.css';
import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [songList, setSongList] = useState([]);

  const songsCollectionRef = collection(db, "songs");

  const [newSongTitle, setNewSongTitle] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");

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
  }, [])

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

  const deleteSong = async (id) => {
    const songDoc = doc(db, "songs", id);
    await deleteDoc(songDoc);
  }


  const updateSongTitle = async (id) => {
    const songDoc = doc(db, "songs", id);
    await updateDoc(songDoc, { title: updatedTitle });
  };


  return (
    <div classname="App">
      <Auth />

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
      <div>
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
    </div>
  );
}

export default App;
