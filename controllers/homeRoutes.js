const router = require("express").Router();
const { Idea, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const ideaData = await Idea.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const ideas = ideaData.map((idea) => idea.get({ plain: true }));

    // Pass serialized data and session flag into template
    if (req.session.logged_in) {
      res.render("homepage", {
        ideas,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("landingpage");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/idea/:id", async (req, res) => {
  try {
    const ideaData = await Idea.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const idea = ideaData.get({ plain: true });

    res.render("idea", {
      ...idea,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Idea }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
