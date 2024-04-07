const newFormHandler = async (event) => {
  event.preventDefault();

  try {
    const title = document.querySelector('#pst-title').value.trim();
    const contenido_texto = document.querySelector('#pst-content').value.trim();

    if (title && contenido_texto) {
      console.log('title',title)
      console.log('contenido_texto', contenido_texto)
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, contenido_texto }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  } catch (error) {
    console.error(error);
    alert('Failed to create post');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.classList.contains('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete post');
    }
  }
};

document.querySelector('.new-blog-post-form').addEventListener('click', newFormHandler);

document.querySelector('.blog-list').addEventListener('click', delButtonHandler);
