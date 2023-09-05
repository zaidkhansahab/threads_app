"use client"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
  
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from '@hookform/resolvers/zod';
import { ThreadValidation } from "@/lib/validations/thread";
import * as z from "zod"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import {useUploadThing} from '@/lib/uploadthing';
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    user: {
        id:string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string
    };
    btnTitle:string;
}


  

function PostThread({userId}: { userId: string}){

  const router = useRouter();
  const  pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
          thread: '',
          accountId: userId,
        }
    }
    

    )
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname
      });
      router.push("/")

    }
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="mt-10 flex flex-col justify-start gap-1">


<FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col  w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
              content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                rows={15}
                className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         <Button type="submit" className="bg-primary-500">
            PostThread

         </Button>


      </form>
      </Form>
    )
}
export default PostThread;