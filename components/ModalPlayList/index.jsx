import { useEffect, useState } from "react";
import ExcluirIcon from "../icons/ExcluirIcon";

export default function ModalPlaylist() {
    const [musicPlayList, setMusicPlayList] = useState([])

    function removeMusicOnPlaylist(indexToRemove) {
        setMusicPlayList(prevPlaylist => prevPlaylist.filter((_, index) => index !== indexToRemove))
    }

    useEffect(() => {
        window.electronAPI.ReciveFromElectron("music-playable", (event, music) => {
            setMusicPlayList([...musicPlayList, music])
        })
    }, [musicPlayList])

    return (
        <div id="modal-play-list" className="absolute flex flex-col right-0 bottom-20 bg-[#212124] w-80 h-auto border-solid mr-2">
            <h1 className="text-center text-white">PlayList</h1>
            <div className="m-4 bg-[#171719]">
                {musicPlayList.length === 0 ? <p className="text-zinc-400">Empty</p> : musicPlayList.map((music, index) => {
                    return (
                        <div style={{display: "flex"}}>
                            <p className="text-white" style={{paddingRight: "20px"}} key={index}>{music}</p>
                            <ExcluirIcon style={{ width: '20px', color: 'red' }} onClick={() => removeMusicOnPlaylist(index)}/>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}