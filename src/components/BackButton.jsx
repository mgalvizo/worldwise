import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        // Programatically navigate backwards to the previous screen before accessing the form
        <Button type="button" kind="back" onClick={() => navigate(-1)}>
            &larr; Back
        </Button>
    );
};

export default BackButton;
