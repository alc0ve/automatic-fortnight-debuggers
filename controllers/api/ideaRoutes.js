const router = require("express").Router();
const { Idea } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newIdea = await Idea.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newIdea);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const ideaData = await Idea.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!ideaData) {
      res.status(404).json({ message: "No idea found with this id!" });
      return;
    }

    res.status(200).json(ideaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
