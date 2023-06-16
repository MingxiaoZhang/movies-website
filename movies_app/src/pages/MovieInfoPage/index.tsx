import {useParams} from "react-router-dom";
import BasicInfo from "./BasicInfo";


const MovieInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <BasicInfo id={id || ''} />
        </div>
    );
};

export default MovieInfoPage;
