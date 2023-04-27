const verifyToken = (req, res, next) => {
    const token = req.headers['auth'];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'rahasia');
      req.body.userId = decoded.id;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  module.exports={verifyToken}