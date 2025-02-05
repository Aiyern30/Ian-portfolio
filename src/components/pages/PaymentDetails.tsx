import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

const paymentMethods = [
  {
    name: 'PayPal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    link: 'https://www.paypal.com/paypalme/aiyern30',
    description: 'Send tips via PayPal.'
  },
  {
    name: 'Buy Me a Coffee',
    logo: 'Logo/buymeacoffee.svg',
    link: 'https://buymeacoffee.com/IanGan',
    description: 'Support me with a coffee!'
  },
  {
    name: 'Stripe',
    logo: 'Logo/stripe.png',
    link: 'https://buy.stripe.com/test_7sIg2FeFCfvu2FW144',
    description: 'Donate securely via Stripe.'
  }
];

const PaymentDetails = () => {
  return (
    <div className="container flex items-center justify-center min-h-[50vh] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paymentMethods.map((method, index) => (
          <a
          href={method.link}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <Card key={index} className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={method.logo} alt={method.name} />
                <AvatarFallback>{method.name[0]}</AvatarFallback>
              </Avatar>
            </CardHeader>
            
          </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
