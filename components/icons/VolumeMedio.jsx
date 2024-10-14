import IconVolumeMedio from '../../public/icons/volume-medio.png';

export default function VolumeMutedIcon({ style, onClick }) {
    return (
        <>
            <img src={IconVolumeMedio} style={style} onClick={onClick} alt="volume muted" title="Volume muted" />
        </>
    );
}