
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserAuth } from '@/hooks/useUserAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, Users } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [loginType, setLoginType] = useState<'passenger' | 'employee'>('passenger');

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    try {
      if (isSignUp && !name) {
        toast.error("Please enter your name");
        setIsLoading(false);
        return;
      }

      const success = await login({
        email,
        password,
        name: isSignUp ? name : undefined,
        isSignUp,
        role: loginType
      });

      if (success) {
        // Success notification is now handled in the useUserAuth hook
        navigate('/');
      } else {
        toast.error(isSignUp ? "Failed to create account. Email may already be in use." : "Invalid credentials. Please check your email and try again.");
      }
    } catch (error) {
      toast.error("An error occurred while processing your request. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-airport-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="size-12 rounded-full airport-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xl">SH</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isSignUp ? "Create Account" : "Sign in to SkyHub"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp ? "Create a new account to use SkyHub" : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={loginType} 
            onValueChange={(value) => setLoginType(value as 'passenger' | 'employee')}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="passenger" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Passenger
              </TabsTrigger>
              <TabsTrigger value="employee" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Employee
              </TabsTrigger>
            </TabsList>
            <TabsContent value="passenger" className="mt-2 text-center text-sm text-muted-foreground">
              {isSignUp ? "Create a passenger account to book flights and check-in" : "Access your bookings and check-in for flights"}
            </TabsContent>
            <TabsContent value="employee" className="mt-2 text-center text-sm text-muted-foreground">
              {isSignUp ? "Employee registration requires approval" : "Staff portal for flight and passenger management"}
            </TabsContent>
          </Tabs>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe" 
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com" 
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <Button variant="link" className="px-0 font-normal h-auto" type="button">
                    Forgot password?
                  </Button>
                )}
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            className="w-full mb-4" 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
          <p className="text-center text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Button 
              variant="link" 
              className="pl-1 underline" 
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isLoading}
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
