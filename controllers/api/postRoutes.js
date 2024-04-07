const router = require("express").Router();
const { Post } = require("../../models");

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const currentDate = new Date();
    const postData = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
        date_created: currentDate,
        edit_flag: true,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;