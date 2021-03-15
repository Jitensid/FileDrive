import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

const RepoLink = () => {
  const REPOLINK = "https://github.com/Jitensid/Drive";

  return (
    <IconButton color="inherit" href={REPOLINK}>
      <GitHubIcon></GitHubIcon>
    </IconButton>
  );
};

export default RepoLink;
