import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

const passwordResetRequestSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;

const PasswordResetRequestPage: React.FC = () => {
  console.log('PasswordResetRequestPage loaded');
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<PasswordResetRequestFormValues>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: PasswordResetRequestFormValues) => {
    console.log('Password reset request submitted:', data);
    // Simulate API call
    setMessage(`If an account with email ${data.email} exists, a password reset link has been sent.`);
    form.reset();
    // In a real app, you might not want to navigate away immediately
    // or provide a link to try again / go to login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert variant="default" className="mb-4 bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordResetRequestPage;