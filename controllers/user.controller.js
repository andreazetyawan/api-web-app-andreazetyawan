exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.officialBoard = (req, res) => {
  res.status(200).send("Official Content.");
};

exports.memberBoard = (req, res) => {
  res.status(200).send("Member Content.");
};
