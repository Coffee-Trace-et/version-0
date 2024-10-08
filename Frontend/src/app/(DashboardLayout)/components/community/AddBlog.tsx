import { method } from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Tag {
  tag: string;
}
interface Blog {
  title: string;
  description: string;
  tag: string;
}

interface AddBlogProps {
  setOpen: (data: boolean) => void;
}

const AddBlog = ({ setOpen }: AddBlogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Blog>();
  const session = useSession();

  const notifySuccess = () => {
    toast.success("Blog posted successfully!", {
      position: "top-right",
      autoClose: 1000,
    });

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  const notifyError = () => toast.error("Failed to post the blog.");

  const onSubmit = async (data: Blog) => {
    const tagsArray = [];

    if (data.tag) {
      tagsArray.push(data.tag);
    }

    const submitData = {
      ...data,
      tags: tagsArray,
    };

    try {
      const res = await fetch(
        "https://cofeetracebackend-2.onrender.com/api/v0/forum/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.data?.accessToken}`,
          },
          body: JSON.stringify(submitData),
        }
      );

      if (res.ok) {
        notifySuccess();
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-white p-4 w-4/5 sm:w-1/2 md:w-1/3 border-2"
    >
      <h1 className="text-center text-xl font-semibold">post Resource</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Title is required" })}
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="tags">Tags</label>
        <select
          id="tags"
          {...register("tag", { required: "Please select a tag" })}
          className="p-4 border-2 border-gray-200 rounded-md outline-none"
        >
          <option value="">Select ...</option>
          <option value="Coffee">Coffee</option>
          <option value="System Update">System Update</option>
          <option value="Improvement">Improvement</option>
          <option value="Selling">Selling</option>
          <option value="Indigenous">Indigenous</option>
        </select>
        {errors.tag && (
          <span className="text-red-500">{errors.tag.message}</span>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          type="submit"
          className="p-2 border-2 border-gray-200 rounded-md bg-palette-primary-main text-white outline-none text-center"
        >
          Post Blog
        </button>
        <ToastContainer />
      </div>
    </form>
  );
};

export default AddBlog;
