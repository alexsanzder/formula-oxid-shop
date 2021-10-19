interface TextProps {
    html: string;
}
const Text = ({ html }: TextProps) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        ></div>
    );
};

export default Text;
