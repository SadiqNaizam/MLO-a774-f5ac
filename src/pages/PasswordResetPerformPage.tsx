import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const passwordResetPerformSchema = z.object({
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match.",
  path: ['confirmNewPassword'],
});

type PasswordResetPerformFormValues = z.infer<typeof passwordResetPerformSchema>;

const PasswordResetPerformPage: React.FC = () => {
  console.log('PasswordResetPerformPage loaded');
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>(); // Example: Get token from URL
  const [resetStatus, setResetStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const form = useForm<PasswordResetPerformFormValues>({
    resolver: zodResolver(passwordResetPerformSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: PasswordResetPerformFormValues) => {
    console.log('Password reset perform submitted:', data, 'Token:', token);
    setResetStatus(null);
    // Simulate API call with token
    setTimeout(() => {
      // Simulate success
      setResetStatus({ type: 'success', message: 'Password has been reset successfully! You can now login with your new password.' });
      form.reset();
      setTimeout(() => navigate('/login'), 3000);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
          <CardDescription>Enter and confirm your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          {resetStatus && (
            <Alert 
              variant={resetStatus.type === 'error' ? 'destructive' : 'default'} 
              className={`mb-4 ${resetStatus.type === 'success' ? 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:text-green-300 dark:border-green-600' : ''}`}
            >
              {resetStatus.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              <AlertTitle>{resetStatus.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{resetStatus.message}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Setting Password...' : 'Set New Password'}
              </Button>
            </form>
          </Form>
        </CardContent>
        {resetStatus?.type === 'success' && (
          <CardFooter className="text-center text-sm">
             <p>Redirecting to login...</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PasswordResetPerformPage;