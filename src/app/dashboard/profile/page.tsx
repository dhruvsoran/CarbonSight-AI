
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirebase } from '@/firebase';
import { useDoc, useCollection, WithId } from '@/firebase/firestore/use-collection';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { UserProfile } from '@/models/user-profile';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  mineName: z.string().min(1, 'Mine name is required'),
});

export default function ProfilePage() {
  const { user, firestore, isUserLoading } = useFirebase();
  const { toast } = useToast();
  const [profile, setProfile] = useState<WithId<UserProfile> | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      mineName: '',
    },
  });

  useEffect(() => {
    async function fetchProfile() {
      if (user && firestore) {
        setIsLoading(true);
        const profilesRef = collection(firestore, 'users', user.uid, 'profiles');
        const q = query(profilesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0];
          const profileData = { id: profileDoc.id, ...profileDoc.data() } as WithId<UserProfile>;
          setProfile(profileData);
          setProfileId(profileDoc.id);
          form.reset({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            jobTitle: profileData.jobTitle,
            mineName: profileData.mineName,
          });
        }
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [user, firestore, form]);

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!user || !firestore) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update your profile.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const profileData: Omit<UserProfile, 'id'> = {
      ...values,
      userId: user.uid,
      email: user.email || '',
    };

    try {
      let docRef;
      if (profileId) {
        docRef = doc(firestore, 'users', user.uid, 'profiles', profileId);
        setDocumentNonBlocking(docRef, profileData, { merge: true });
      } else {
        const collectionRef = collection(firestore, 'users', user.uid, 'profiles');
        const newDocRef = await addDoc(collectionRef, profileData);
        setProfileId(newDocRef.id);
      }

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isUserLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your personal and professional information.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mineName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mine Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input value={user?.email || ''} disabled />
            </FormItem>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
