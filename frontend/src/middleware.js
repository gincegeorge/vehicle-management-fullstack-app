import Cookies from 'universal-cookie';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    if (!request.nextUrl.pathname.startsWith('/signup') && !cookies.get('myCat')) {
        return NextResponse.redirect(new URL('/signup', request.url));
        console.log('dshkgfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
    }
}


// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (static files)
//          * - favicon.png (favicon file)
//          */
//         '/((?!api|_next/static|_next/image|favicon.png|logo).*)',
//     ],
// };