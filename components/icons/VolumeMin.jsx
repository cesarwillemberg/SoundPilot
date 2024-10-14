import IconVolumeMin from '../../public/icons/volume-min.png';

export default function VolumeMutedIcon({ style, onClick }) {
    return (
        <>
            <img src={IconVolumeMin} style={style} onClick={onClick} alt="volume muted" title="Volume muted" />
        </>
    );
}