import IconVolumeMax from '../../public/icons/volume-max.png';


export default function VolumeMutedIcon({ style, onClick }) {
    return (
        <>
            <img src={IconVolumeMax} style={style} onClick={onClick} alt="volume muted" title="Volume muted" />
        </>
    );
}