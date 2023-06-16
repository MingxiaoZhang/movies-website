import {useParams} from "react-router-dom";
import BasicInfo from "../../components/BasicInfo";


const MovieInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <BasicInfo id={id || ''} />
        </div>
    );
};

export default MovieInfoPage;
