# Cloudinary AI Video Compression

A modern web application that leverages Cloudinary's AI-powered video compression capabilities to optimize video files while maintaining quality. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎥 **AI-Powered Video Compression**

  - Automatic video optimization using Cloudinary's AI
  - Smart quality adjustment based on content
  - Maintains video quality while reducing file size

- 🎯 **Smart Compression**

  - Real-time compression percentage display
  - Original vs. compressed size comparison
  - Space savings calculation

- 🎨 **Modern UI/UX**

  - Responsive design with Tailwind CSS
  - Interactive video cards with hover previews
  - Smooth animations and transitions
  - Dark mode support

- 📱 **Video Management**
  - Video upload with drag-and-drop support
  - Video preview functionality
  - Duration display
  - Download compressed videos

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma with PostgreSQL
- **Video Processing:** Cloudinary
- **UI Components:** Shadcn/ui
- **Icons:** Lucide Icons
- **Date Handling:** Day.js

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Cloudinary account
- PostgreSQL database
- Vercel account (for deployment)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your-postgresql-database-url"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cloudinary-ai.git
   cd cloudinary-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. **Prepare Your Repository**

   - Push your code to a GitHub repository
   - Ensure all environment variables are properly set up
   - Make sure your database is accessible from Vercel's servers

2. **Deploy to Vercel**

   - Go to [Vercel](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Configure the following settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build` or `yarn build`
     - Output Directory: `.next`
     - Install Command: `npm install` or `yarn install`

3. **Environment Variables**
   Add the following environment variables in your Vercel project settings:

   ```
   DATABASE_URL="your-postgresql-database-url"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   ```

4. **Database Setup**

   - After deployment, run the database migrations:
     ```bash
     npx prisma generate
     npx prisma db push
     ```
   - You can do this through Vercel's CLI or by connecting to your deployment

5. **Domain Configuration**
   - Vercel will automatically assign you a domain
   - You can add your custom domain in the project settings
   - Configure SSL certificates if needed

## Project Structure

```
cloudinary-ai/
├── app/
│   ├── (app)/
│   │   ├── home/
│   │   └── social-share/
│   └── video/
├── components/
│   ├── ui/
│   ├── VideoCard.tsx
│   └── DownloadButton.tsx
├── lib/
│   └── cloudinary.ts
├── prisma/
│   └── schema.prisma
└── types/
    └── index.tsx
```

## Features in Detail

### Video Upload

- Drag and drop interface
- Progress tracking
- File size validation
- Format validation

### Video Processing

- Automatic compression using Cloudinary AI
- Quality optimization
- Format conversion if needed
- Thumbnail generation

### Video Display

- Grid layout of video cards
- Hover preview functionality
- Compression statistics
- Download options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cloudinary](https://cloudinary.com/) for video processing capabilities
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn/ui](https://ui.shadcn.com/) for UI components
- [Vercel](https://vercel.com/) for hosting and deployment

## Support

For support, email support@example.com or create an issue in the repository.
