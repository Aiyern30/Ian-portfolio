import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

const paymentMethods = [
  {
    name: 'PayPal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    link: 'https://www.paypal.me/yourname',
    description: 'Send tips via PayPal.'
  },
  {
    name: 'Buy Me a Coffee',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Buy_Me_A_Coffee_Logo.png',
    link: 'https://www.buymeacoffee.com/yourname',
    description: 'Support me with a coffee!'
  },
  {
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Stripe_Logo%2C_revised_2016.svg',
    link: 'https://your-stripe-payment-link.com',
    description: 'Donate securely via Stripe.'
  }
];

const PaymentDetails = () => {
  return (
    <div className="container flex items-center justify-center min-h-[50vh] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paymentMethods.map((method, index) => (
          <Card key={index} className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={method.logo} alt={method.name} />
                <AvatarFallback>{method.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{method.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Donate Now
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
