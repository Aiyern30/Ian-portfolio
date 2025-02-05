import React from 'react';
import Image from 'next/image';
import { Card } from '../ui';

const isMobile = () => {
  if (typeof window !== "undefined") {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }
  return false;
};

const handleMaybankClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();

  const duitNowNumber = "0182133211";

  if (isMobile()) {
    // Attempt to open MAE app with pre-filled DuitNow Mobile Number
    window.location.href = `mae://duitnow?recipient=${duitNowNumber}&type=mobile`;
  } else {
    // Open DuitNow QR Code for desktop users
    window.open('/Logo/MaeQR.jpg', '_blank');
  }
};

const paymentMethods = [
  {
    name: 'PayPal',
    logo: '/Logo/paypal.png',
    link: 'https://www.paypal.com/paypalme/aiyern30'
  },
  {
    name: 'Buy Me a Coffee',
    logo: '/Logo/buymeacoffee.svg',
    link: 'https://buymeacoffee.com/IanGan'
  },
  {
    name: 'Stripe',
    logo: '/Logo/stripe.png',
    link: 'https://buy.stripe.com/test_7sIg2FeFCfvu2FW144'
  },
  {
    name: 'Kofi',
    logo: '/Logo/kofi_logo.svg',
    link: 'https://ko-fi.com/iangan'
  },
  {
    name: "Touch 'n Go eWallet",
    logo: '/Logo/TNG.jpg', 
    link: 'https://payment.tngdigital.com.my/sc/bDLnPgpH5S'
  },
  {
    name: 'Maybank QRPay',
    logo: '/Logo/mae.png',
    link: '/Logo/MaeQR.jpg',
    onClick: handleMaybankClick // Add click handler
  }
];

const PaymentDetails = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] p-4 text-white">
      <div className="text-5xl text-center relative mb-8">
        <div className="font-primary">Support Me</div>
        <div className="h-1 w-48 bg-white mx-auto text-center mt-4"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paymentMethods.map((method, index) => (
          <a
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            onClick={method.onClick ? method.onClick : undefined} // Use custom handler for Maybank
          >
            <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden h-32 w-32 relative flex items-center justify-center">
              <Image 
                src={method.logo} 
                alt={method.name} 
                width={64}
                height={64}
                priority
              />
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
