# 1. Project Overview

## 1.1 Purpose

The primary goal of this project is to develop a QR code generator specifically designed for small businesses. It enables these businesses to effortlessly share Wi-Fi and restroom passwords with their customers through customizable and printable QR code cards. This tool aims to enhance customer experience by simplifying access to essential services while allowing businesses to maintain consistent branding.

## 1.2 Features

- **Customizable QR Code Cards**: Businesses can tailor the QR code cards to reflect their brand identity by customizing background colors, labels, and including their brand name.
- **Easy Wi-Fi Access Sharing**: Generate QR codes using Wi-Fi details such as network name, password, and security type.
- **Printable Formats**: The QR codes are designed to be easily printable for physical display within business premises.
- **Event Tracking**: Integration with Vercel Analytics to monitor user interactions, helping to improve the service based on usage patterns.
- **Feedback Link**: A feedback button that redirects users to a designated page for providing comments or reporting issues.

## 1.3 Technologies Used

- **Next.js**: A React framework for building server-rendered and statically generated web applications.
- **ShadCN**: A collection of accessible and customizable UI components for building React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **React Hook Form**: A library for managing form state and validation in React applications.
- **Zod**: A TypeScript-first schema validation library for form validation.
- **Vercel Analytics**: A tool for tracking user interactions and gathering analytics data.
- **Lucide Icons**: An open-source icon library used within the user interface.

# 2. Application Structure

## 2.1 Global Layout and Components

### 2.1.0 Root Layout Component

The root layout component provides a consistent structure for all pages:

- Ensures full viewport height with vertical content stacking
- Contains a header and main content area

### 2.1.1 Header Component

The application features a sticky header that remains at the top of the page as users scroll. It includes a plain text logo, "postable", aligned to the left, and a "Feedback" link on the right. The header content is contained within an `mx-auto` container to ensure proper centering and responsive behavior.

### 2.1.2 Footer Component

There is currently no footer component implemented in the application. All essential navigation and information are provided through the header and main content areas.

### 2.1.3 Navigation Component

Navigation is primarily handled through page links and buttons within the application pages. There is no separate navigation component; instead, users are guided through the workflow via interactive elements on each page.

# 3. Feature Specifications

## 3.1 Generate QR Code Page

### 3.1.1 Layout

The **Generate QR Code** page is designed to be user-friendly, guiding users through the process of creating a customized QR code. The layout includes input fields for necessary details, customization options, and action buttons. A visual representation can be found here:

[Generate QR Code Page Layout](https://whimsical.com/generate-qr-code-VJCrxqSiaFdCHAcsJ2xrab)

### 3.1.2 Components

- **QR Code Form**
  - **Network Name**
    - Required field for the Wi-Fi network's SSID.
  - **Password**
    - Required field for the Wi-Fi network password.
  - **Security Type**
    - Required field specifying the Wi-Fi security protocol (e.g., WPA2, WEP).
  - **Background Color Picker**
    - Optional field allowing users to select a background color or gradient; defaults to white if not specified.
  - **Label**
    - Optional field to customize the label displayed on the QR code card; defaults to "WiFi QR Code".
  - **Brand Name**
    - Required field where users input their business's brand name.
- **QR Code Card Component**

  - Displays the generated QR code based on the input details and customization settings.
  - "by Postable" Label
    - A small attribution label positioned at the bottom right corner of the QR code card
  - Create Component to similar design

        ```
        import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
        import { Square } from 'lucide-react';

        export default function QRCodeCard() {
          return (
            <Card className='w-64'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-xl flex items-center gap-2'>Wi-Fi Access</CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='bg-black w-full aspect-square mb-4'>
                  {/* QR code rendering */}
                </div>
                <div className='text-sm flex flex-col items-end'>
                  <div className='font-medium'>Your Brand Name</div>
                  <div className='text-muted-foreground'>by postable</div>
                </div>
              </CardContent>
            </Card>
          );
        }

        ```

    **Color Picker Component**

  - An interactive tool that allows users to select solid colors, gradients, or images for the QR code card's background.
  - Create component with reference to it

        ```
        'use client';

        import { Button } from '@/components/ui/button';
        import { Input } from '@/components/ui/input';
        import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
        import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
        import { cn } from '@/utils';
        import { Paintbrush } from 'lucide-react';
        import Link from 'next/link';
        import { useMemo, useState } from 'react';

        export function GradientPicker({ background, setBackground, className }) {
          const solids = ['#E2E2E2', '#ff75c3', '#ffa647', '#ffe83f', '#9fff5b', '#70e2ff', '#cd93ff', '#09203f'];
          const gradients = ['linear-gradient(to top left,#accbee,#e7f0fd)', /* ...other gradients */];
          const images = ['url(image1.jpg)', 'url(image2.jpg)', /* ...other images */];

          const defaultTab = useMemo(() => {
            if (background.includes('url')) return 'image';
            if (background.includes('gradient')) return 'gradient';
            return 'solid';
          }, [background]);

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className={cn('w-[220px] justify-start text-left font-normal', className)}>
                  {/* Button content */}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-64'>
                {/* Popover content with tabs for solids, gradients, and images */}
              </PopoverContent>
            </Popover>
          );
        }

        ```

- **Button**:
  - **Generate QR Code**
    - Triggers the QR code generation; remains disabled until all required fields are valid.
  - **Download Image**
    - Allows users to download the generated QR code image; includes a login check and redirects to the login page if the user is not authenticated.
  - **Feedback**
    - Redirects users to the Slash page for submitting feedback or reporting issues.

### 3.1.3 Functionalities

- **Form Validation**
  - Utilizes React Hook Form and Zod to validate input fields in real-time, ensuring data integrity before QR code generation.
- **QR Code Generation**
  - Creates a QR code that encodes the Wi-Fi network details provided by the user.
- **Customization**
  - Offers options to personalize the QR code card's background and label to align with the user's branding.
- **Download Functionality**
  - Provides a way to download the QR code as an image file, with access control based on user authentication.
- **Event Tracking**
  - Implements event tracking for user interactions with the "Generate QR Code" and "Download Image" buttons using Vercel Analytics.
- **Feedback Mechanism**
  - Encourages user engagement by providing a direct link to submit feedback at header

# 4. Implementation Details

## 4.1 Event Tracking and Analytics

The application integrates **Vercel Analytics** to monitor key user interactions, helping the development team understand how users engage with the application and identify areas for improvement.

- **Tracking Button Clicks**:
  - The "Generate QR Code" button click events are tracked.
  - The "Download Image" button click events are also tracked.
- **Implementation**:
  - The `track` function from `@vercel/analytics` is used within the button's `onClick` handlers.
  - The `Analytics` component is included in the root layout to initialize analytics across the application.

**Example Code**:

```jsx
import { track } from "@vercel/analytics";

function GenerateQRCodeButton() {
  return (
    <button
      onClick={() => {
        track("Generate QR Code");
        // Additional logic
      }}
    >
      Generate QR Code
    </button>
  );
}
```

## 4.2 Business Logic and Algorithms

- **QR Code Generation**:
  - Utilizes a QR code generation library to encode Wi-Fi credentials into a QR code.
  - The QR code follows standard formats recognized by devices for automatic Wi-Fi configuration upon scanning.
- **Form Validation**:
  - **React Hook Form** manages form state and handles submission.
  - **Zod** provides schema validation to ensure all required fields are correctly filled and adhere to expected formats.

## 4.3 Third-Party Integrations

- **Vercel Analytics**: For tracking and analyzing user events.
- **React Hook Form** and **Zod**: For efficient form management and validation.
- **Lucide Icons**: Provides iconography for UI components.
- **QR Code Library**: A third-party library (e.g., `qrcode.react`) is used to generate QR codes.
- **Color Picker Component**: A custom component or third-party library is used to enable background customization.

## 4.4 Error Handling and Logging

- **Form Errors**: Users receive immediate feedback on invalid or missing inputs, preventing form submission until all validations pass.
- **Authentication Checks**: The application verifies user authentication status before allowing image downloads, redirecting unauthenticated users to the login page.
- **Exception Handling**: Try-catch blocks and error boundaries are implemented to capture and handle unexpected errors gracefully.

# 5. Project File Structure

An overview of the project's directory and file organization:

```
├── README.md
├── app
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json

```

# 6. Appendices

## 6.1 Glossary

- **QR Code**: A machine-readable code consisting of an array of black and white squares, used for storing data that can be read by a camera.
- **Next.js**: A React framework that enables server-side rendering and static site generation for web applications.
- **ShadCN**: A collection of accessible and customizable UI components for React.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces without leaving the HTML.
- **React Hook Form**: A library that helps with form validation and handling in React applications.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Vercel Analytics**: An analytics tool provided by Vercel for monitoring performance and user interactions.
- **Lucide Icons**: An open-source icon library used within the application.

## 6.2 References

- **Vercel Analytics Documentation**: <https://vercel.com/docs/concepts/analytics>
- **React Hook Form Documentation**: <https://react-hook-form.com/>
- **Zod Documentation**: <https://zod.dev/>
- **Tailwind CSS Documentation**: <https://tailwindcss.com/docs>
- **Next.js Documentation**: <https://nextjs.org/docs>
- **Generate QR Code Page Layout**: <https://whimsical.com/generate-qr-code-VJCrxqSiaFdCHAcsJ2xrab>

## 6.3 Additional Resources

### Event Tracking with Vercel Analytics

The application uses `@vercel/analytics` to track user interactions with key components.

**Example Code**:

```jsx
import { track } from "@vercel/analytics";

function DownloadImageButton() {
  return (
    <button
      onClick={() => {
        track("Download Image");
        // Additional logic
      }}
    >
      Download Image
    </button>
  );
}
```

**Integration in Root Layout**:

```jsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Postable QR Code Generator</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```
