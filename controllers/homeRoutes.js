// Importar Express y otros módulos necesarios
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Ruta para la página de inicio
router.get('/', async (req, res) => {
  try {
    // Obtener todos los posts con el nombre del autor
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Mapear los datos de los posts para convertirlos en objetos simples
    const posts = postData.map((post) => post.get({ plain: true }));

    // Renderizar la plantilla de la página de inicio con los posts y el estado de inicio de sesión
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Error retrieving posts:', err);
    res.status(500).json({ error: 'Error retrieving posts' });
  }
});

// Ruta para mostrar un post específico con comentarios
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // include: [
      //   {
      //     include: {
      //       model: User,
      //       attributes: ['name']
      //     }
      //   },
      //  
      // ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    };

    const posts = postData.get({ plain: true });
    res.render("post", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Ruta para el panel de control del usuario autenticado
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Buscar los datos del usuario autenticado
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Obtener los datos del usuario como objeto simple
    const user = userData.get({ plain: true });

    // Renderizar la plantilla del panel de control con los datos del usuario y el estado de inicio de sesión
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error retrieving user data:', err);
    res.status(500).json({ error: 'Error retrieving user data' });
  }
});

// Ruta para crear un nuevo comentario
router.post('/comments', withAuth, async (req, res) => {
  try {
    // Crear el comentario utilizando los datos del cuerpo de la solicitud
    const newComment = await Comment.create({
      contenido_post: req.body.contenido_post,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });

    // Redireccionar al usuario de vuelta al post después de crear el comentario
    res.redirect(`/posts/${req.body.post_id}`);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Error creating comment' });
  }
});

// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
  // Redirigir al panel de control si el usuario ya ha iniciado sesión
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  // Renderizar la plantilla de inicio de sesión
  res.render('login');
});

// Exportar el enrutador para que pueda ser utilizado por la aplicación
module.exports = router;
