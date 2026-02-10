import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'client' | 'freelancer';
      image?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: 'client' | 'freelancer';
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'client' | 'freelancer';
  }
}
