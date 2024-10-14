import IconVolumeMuted from '../../public/assets/icons/volume-muted.png';

export default function VolumeMutedIcon({ style, onClick }) {
    return (
        <img
            src={IconVolumeMuted}
            style={style} 
            onClick={onClick} 
            alt="volume muted" 
            title="Volume muted" 
        />
    );
}