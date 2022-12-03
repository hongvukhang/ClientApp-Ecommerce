import classes from "./Footer.module.css";

const DUMMY_FOOTER = [
  {
    id: "col-1",
    titleColumn: "CUSTOMER SERVICES",
    listContent: [
      "Help & Contact Us",
      "Returns & Refunds",
      "Online Store",
      "Term & Conditions",
    ],
  },
  {
    id: "col-2",
    titleColumn: "COMPANY",
    listContent: ["What We DO", "Availabie Services", "Latest Posts", "FAQs"],
  },
  {
    id: "col-3",
    titleColumn: "SOCIAL MEIDA",
    listContent: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  },
];

const Footer = () => {
  return (
    <div className={classes["background-footer"]}>
      <footer className={classes.footer}>
        {DUMMY_FOOTER.map((col) => {
          return (
            <div key={col.id}>
              <h4>{col.titleColumn}</h4>
              <ul className={classes["footer-column"]}>
                {col.listContent.map((li) => {
                  return (
                    <li key={li}>
                      <a href="/#">{li}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </footer>
    </div>
  );
};

export default Footer;
