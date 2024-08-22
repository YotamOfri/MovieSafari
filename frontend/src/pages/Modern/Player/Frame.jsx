import PropTypes from "prop-types";

export default function Frame({ sandbox, src, className }) {
  return (
    <div className={`${className} w-full relative`}>
      {sandbox ? (
        <>
          <iframe
            src={src}
            sandbox="allow-scripts allow-same-origin allow-popups"
            allowFullScreen={true}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </>
      ) : (
        <>
          <iframe
            src={src}
            allowFullScreen={true}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </>
      )}
    </div>
  );
}

Frame.propTypes = {
  sandbox: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
