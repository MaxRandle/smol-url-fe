import React, { useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  flexColContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  flexColItem: {
    marginBottom: theme.spacing(3),
  },
  header: {
    textAlign: "center",
  },
  // h3: {
  //   marginTop: "calc((1 - #{$line-height}) * 0.5em)",
  // },
  // h5: {
  //   lineHeight: "24px",
  // },
  button: {
    textTransform: "none",
    borderRadius: "50%",
    height: "64px",
    "&:hover": {
      WebkitTransform: "scale(0.8)",
      msTransform: "scale(0.8)",
      transform: "scale(0.8)",
      transition: "0.3s ease",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [longUrl, setLongUrl] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [smolUrl, setSmolUrl] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [firstRender, setFirstRender] = useState(true);

  const longUrlTests = [
    {
      test: (value) =>
        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(
          value
        ),
      onFailFeedback: "that's not a valid url D:<",
    },
  ];

  const smolTests = [
    {
      test: (value) => /^[\w-]*$/i.test(value),
      onFailFeedback: "contains invalid characters",
    },
    {
      test: (value) => value.length <= 5,
      onFailFeedback: "not smol enough",
    },
  ];

  const handleLongChange = (event) => {
    let newLongUrl = {};
    longUrlTests.some((validationTest) => {
      if (!validationTest.test(event.target.value)) {
        newLongUrl.error = true;
        newLongUrl.helperText = validationTest.onFailFeedback;
        return true;
      }
      return false;
    });
    newLongUrl.value = event.target.value;
    setLongUrl(newLongUrl);
    setFirstRender(false);
  };

  const handleSmolChange = (event) => {
    let newSmolUrl = {};
    smolTests.some((validationTest) => {
      if (!validationTest.test(event.target.value)) {
        newSmolUrl.error = true;
        newSmolUrl.helperText = validationTest.onFailFeedback;
        return true;
      }
      return false;
    });
    newSmolUrl.value = event.target.value;
    setSmolUrl(newSmolUrl);
  };

  const handleSubmit = () => {};

  return (
    <Container className={clsx(classes.flexColContainer)} maxWidth="xs">
      <Typography
        className={clsx(classes.flexColItem, classes.header, classes.h3)}
        variant="h3"
      >
        smol url
      </Typography>
      <Typography
        className={clsx(classes.flexColItem, classes.header, classes.h5)}
        variant="h5"
      >
        for urls that should be smolr
      </Typography>
      <TextField
        className={clsx(classes.flexColItem)}
        fullWidth
        variant="outlined"
        placeholder="paste longboi here"
        {...longUrl}
        onChange={handleLongChange}
      />
      <TextField
        className={clsx(classes.flexColItem)}
        variant="outlined"
        placeholder="choose a smol if you want"
        {...smolUrl}
        onChange={handleSmolChange}
      />
      <Button
        className={clsx(classes.flexColItem, classes.button)}
        variant="outlined"
        color="secondary"
        disabled={firstRender || smolUrl.error || longUrl.error}
        onClick={handleSubmit}
      >
        smol
      </Button>
    </Container>
  );
}

export default App;
