import * as config from "../data/config.js";
import Introduction from "../components/introduction/introduction.jsx";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function Index() {
  return (
    <Introduction
      title={config.sections.index.title}
      description={config.sections.index.description}
    />
  );
}
