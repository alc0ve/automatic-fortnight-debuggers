const router = require("express").Router();
const { Idea } = require("../../models");
const withAuth = require("../../utils/auth");

//deleted withAuth from router.post function in order to be able to use api without logging in.
//added withAuth back in so that new users can use
router.post("/", withAuth, async (req, res) => {
  console.log("post", req.body, req.session);
  try {
    const newIdea = await Idea.create({
      ...req.body,
      user_id: req.session.user_id,
      // user_id: 3,
    });

    res.status(200).json(newIdea);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const ideaData = await Idea.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const ideas = ideaData.map((idea) => idea.get({ plain: true }));
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json(err);
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
