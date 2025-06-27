import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            navigate("/login");
        }
    }, [userData, navigate]);

    const submit = async (data) => {
        try {
            if (post) {
                let file = null;
                if (data.image && data.image.length > 0 && data.image[0]) {
                    file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image || data.image.length === 0 || !data.image[0]) {
                    alert('Please select an image.');
                    return;
                }
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            alert('An error occurred while submitting the form. Please check your network and try again.');
            console.error('Form submit error:', error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} style={{display:'flex',flexWrap:'wrap',gap:32,marginTop:16}}>
            <div style={{flex:'2 1 350px',paddingRight:16}}>
                <h2 style={{fontSize:'1.5rem',fontWeight:700,marginBottom:24,textAlign:'center',color:'#1e293b'}}>{post ? 'Edit Post' : 'New Post'}</h2>
                <Input
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                {errors.title && (
                  <p style={{color:'#f43f5e',fontSize:14,margin:'4px 0'}}>Title is required.</p>
                )}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && (
                  <p style={{color:'#f43f5e',fontSize:14,margin:'4px 0'}}>Slug is required.</p>
                )}
                <RTE 
                  label="Content :" 
                  name="content" 
                  control={control} 
                  defaultValue={getValues("content")}
                  rules={{
                    required: "Content is required.",
                    validate: value => (value && value.replace(/<(.|\n)*?>/g, '').trim() !== '') || "Content is required."
                  }}
                />
                {errors.content && (
                  <p style={{color:'#f43f5e',fontSize:14,margin:'4px 0'}}>{errors.content.message}</p>
                )}
            </div>
            <div style={{flex:'1 1 220px',paddingLeft:16,display:'flex',flexDirection:'column',gap:16}}>
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {errors.image && (
                  <p style={{color:'#f43f5e',fontSize:14,margin:'4px 0'}}>Featured image is required.</p>
                )}
                {post && (
                    <div style={{width:'100%',marginBottom:16,display:'flex',justifyContent:'center'}}>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            style={{borderRadius:12,boxShadow:'0 2px 8px 0 rgba(31,38,135,0.10)',maxHeight:160,objectFit:'cover'}}
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                {errors.status && (
                  <p style={{color:'#f43f5e',fontSize:14,margin:'4px 0'}}>Status is required.</p>
                )}
                <Button type="submit" style={{width:'100%',padding:'12px 0',fontWeight:700,fontSize:18,borderRadius:8,background:'#6366f1',color:'#fff',border:'none',boxShadow:'0 2px 8px 0 #6366f133',cursor:'pointer'}}> {post ? "Update" : "Submit"} </Button>
            </div>
        </form>
    );
}
