const router = require("express").Router();
const { Post } = require("../models"); // Suponiendo que tu archivo de modelo esté ubicado aquí
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id // Ajustado para usar user_id en lugar de userId
      }
    })
      .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        
        res.render("post", {
          views: "dashboard", // Corregido error tipográfico en 'views'
          posts
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect("login");
      });
  });

  // Rutas para crear y editar publicaciones...

module.exports = router;
