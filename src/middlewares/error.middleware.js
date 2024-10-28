export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);  // Log del error para depuración

    if (err.name === "UnauthorizedError" || err.statusCode === 401) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (err.name === "ForbiddenError" || err.statusCode === 403) {
        return res.status(403).json({ message: "Forbidden: You don't have access to this resource" });
    }

    if (err.name === "ValidationError" || err.statusCode === 400) {
        return res.status(400).json({ message: "Bad Request: Invalid data", details: err.errors });
    }

    if (err.name === "NotFoundError" || err.statusCode === 404) {
        return res.status(404).json({ message: "Resource Not Found" });
    }

    if (err.name === "ConflictError" || err.statusCode === 409) {
        return res.status(409).json({ message: "Conflict: Resource already exists" });
    }

    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (err.name === "DatabaseError") {
        return res.status(500).json({ message: "Database error", details: err.message });
    }

    if (err.name === "RequestTimeoutError" || err.statusCode === 408) {
        return res.status(408).json({ message: "Request Timeout" });
    }

    // Default: 500 Internal Server Error
    res.status(500).json({ message: err.message || 'Internal server error' });
};