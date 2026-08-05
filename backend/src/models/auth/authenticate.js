const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return process.env.JWT_SECRET;
};

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.miserere_session;

  if (!authHeader && !cookieToken) {
    return res.status(401).json({
      message: 'Authorization header is missing',
    });
  }

  const [scheme, bearerToken] = authHeader ? authHeader.split(' ') : ['Bearer', cookieToken];
  const token = cookieToken || bearerToken;
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Authorization header must use the Bearer scheme',
    });
  }

  let secret;
  try {
    secret = getJwtSecret();
  } catch (error) {
    return next(error);
  }

  try {
    const { jwtVerify } = await import('jose');
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ['HS256'],
      issuer: 'miserere-api',
      audience: 'miserere-web',
    });
    req.user = payload;
    return next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
