import CircleLoader from "react-spinners/CircleLoader";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircleLoader color="#0D6EFD" size={480} />
    </div>
  );
};

export default Loading;
