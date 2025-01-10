# MUN 🎤

This is is an interview system designed specifically for Model United Nations (MUN). It allows secretariats to track their interviews, receive notifications, and manage the delegate interviewing process seamlessly. <br> Deployed at: [mun.ambe.dev](https://mun.ambe.dev/).

![Group 9](https://github.com/user-attachments/assets/6b5f1938-7c19-4003-868c-7030f29cc588)

## Features

- **Interview scheduling:** delegates can view available interview slots and schedule their interviews.
- **Track interview progress:** secretariats can check the status of scheduled interviews and see if which have been completed and which still need action.
- **Notifications:** secretariats receive notifications when interviews are scheduled or when there are updates.
- **Admin panel:** admins can manage interview slots, track progress, and manage secretariats.
- **Responsive design:** the system is designed to be mobile-first, ensuring a smooth experience across all devices.

## Setup Locally

1. Run the following command to copy the application's code.

   ```
   git clone https://github.com/ammarmbe/vibe.git
   ```

2. Create a `.env.local` file in the root directory.
3. Create a [Neon](http://neon.tech/) account, create a new database and add the `DATABASE_URL` to the `.env.local` file.
4. Setup [Clerk](https://clerk.com), add the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to the `.env.local` file.
5. Add the following to the `.env.local` file:

   ```
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_URL=http://localhost:3000
   ```

6. Run the following command, and add `NEXT_PUBLIC_VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` to the `.env.local` file (for push notifications).

   ```
   web-push generate-vapid-keys --json
   ```

7. Run the queries in the [Database Schema](#database-schema) in your database.
8. Run `pnpm install` then `pnpm dev` in the root directory to start a local development server.

## Tech Stack

Next.js, PostgreSQL, React, TailwindCSS, React Query. Auth implemented with the help of [Lucia](https://lucia-auth.com/).

Deployed on Vercel and Neon.

## License

[MIT](https://choosealicense.com/licenses/mit/)
