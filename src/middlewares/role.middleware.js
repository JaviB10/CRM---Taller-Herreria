export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const { user } = req;
        if (!user || !requiredRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }
        next();
    };
};