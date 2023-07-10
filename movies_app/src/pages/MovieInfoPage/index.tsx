import {useParams} from "react-router-dom";
import BasicInfo from "./BasicInfo";
import CommentDisplay from "./CommentDisplay"

const MovieInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <BasicInfo id={id || ''} />
            <CommentDisplay id={id || ''} />
        </div>
    );
};

export default MovieInfoPage;
