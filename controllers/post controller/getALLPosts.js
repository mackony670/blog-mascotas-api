const Post = require("../../models/post");
module.exports = async (req, res) => {
  try {
    const posts = await Post.find();
    //res.json(posts);

    if (posts[0].title) {
      res.json(posts);
    } else {
      res.json({
        msg: "no hay posts que mostrar ",
        quantiti: 0,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las publicaciones." });
  }
};
