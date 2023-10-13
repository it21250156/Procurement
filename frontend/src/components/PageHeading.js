const PageHeading = ({ text }) => {
  return (
    <div className="pageheading">
      <div className="bg-primary bg-gradient text-white rounded-1 p-2 mb-3 text-center fw-bold fst-italic fs-1">
        {text}
      </div>
    </div>
  );
};

export default PageHeading;
