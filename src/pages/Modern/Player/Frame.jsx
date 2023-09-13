import PropTypes from "prop-types";
export default function Frame({ sandbox, src }) {
  return (
    <div className="h-[90vh] w-full">
      {sandbox ? (
        <iframe
          src={src}
          sandbox="allow-scripts allow-same-origin allow-popups"
          allowFullScreen={true}
          className="h-[90vh] w-full"
        ></iframe>
      ) : (
        <iframe
          src={src}
          allowFullScreen={true}
          className="h-[90vh] w-full"
        ></iframe>
      )}
    </div>
  );
}
Frame.propTypes = {
  sandbox: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};
