import { useState } from "react";
import styles from './style.module.css';

export default function VolumeController({ audioRef }) {

    const [volume, setVolume] = useState(50);

    function handleVolumeChange(event) {
        const newVolume = event.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    }

    return (
        <input
            id="volume-control"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.customRange}
            style={{ width: '100px' }}
        />
    )
}