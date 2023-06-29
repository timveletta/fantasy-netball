import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/api/user-created-event'],
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
