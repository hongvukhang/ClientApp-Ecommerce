import classes from "./Description.module.css";

const Description = (props) => {
  const description = props.description;

  return (
    <div className={classes["detail_description"]}>
      <h3>DESCRIPTION</h3>
      <h2>PRODUCT DESCRIPTION</h2>

      <pre>{description}</pre>
    </div>
  );
};

export default Description;
