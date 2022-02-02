import Spin from "components/Spin";

const ButtonSubmit = ({
    text = "Save",
    loading = false,
    className = "btn btn-hero",
}) => {
    return (
        <button
            type="submit"
            className={`${className} ${loading ? "pointer-events-none" : ""}`}
            disabled={loading ? true : false}
        >
            {loading ? <Spin className="h-6 w-6 text-white" /> : text}
        </button>
    );
};
export default ButtonSubmit;
