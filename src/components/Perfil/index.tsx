import { IPerfil } from "@/service/api/Model/User.model";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CiUser } from "react-icons/ci";
import { auth } from "@/service/firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const PerfilForm = () => {
  const user = auth.currentUser;
  const displayName = user?.displayName;
  const [firstName, lastName] = displayName!.split(" ");
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerfil>();
  const storage = getStorage();
  const [preview, setPreview] = useState<string | null | undefined>(
    user?.photoURL
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };
  const onSubmit: SubmitHandler<IPerfil> = (data, e) => {
    e?.preventDefault();
    handleRegister(data);
  };
  const notify = () => toast.success("Perfil atualizado!");
  const handleRegister = async (data: IPerfil) => {
    try {
      if (!user) throw new Error("Usuário não autenticado");
      if (!selectedFile)
        throw new Error("Nenhuma imagem selecionada para upload");
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);
      await updateProfile(user, {
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: imageUrl,
      });
      console.log("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
    notify()
    navigate("/")
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mx-auto w-[350px] md:w-[500px]  lg:w-[1200px] shadow-xl shadow-cor-shadow py-10 px-5  rounded-md border "
      >
        <h1 className="font-Poppins text-xl self-start font-bold text-[#333]">
          Informações da conta
        </h1>
        <div className="flex flex-col md:flex-row gap-4  w-full  ">
          <label className="label flex flex-col gap-2 flex-auto">
            Nome
            <input
              className="input"
              {...register("firstName", {
                required: "Nome precisa ser preenchido",
              })}
              placeholder="First Name"
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>

          <label className="label flex flex-col gap-2 flex-auto">
            Sobrenome
            <input
              className="input"
              {...register("lastName", {
                required: "Sobrenome precisa ser preenchido",
              })}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <h1 className="font-Poppins text-xl self-start font-bold text-[#333]">
          Informações pessoais
        </h1>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between items-start md:items-center">
          <label className="label flex flex-col gap-2 self-center md:self-start">
            Foto perfil
            <div className="flex flex-wrap items-center gap-3 flex-auto">
              {preview ? (
                <img src={preview} className="rounded-2xl w-20" />
              ) : (
                <CiUser className="text-2xl text-cor-9F9F9F" />
              )}
              <span className="bg-white text-[#333] font-Poppins text-sm font-semibold border border-cor-9F9F9F px-4 py-2 rounded-md cursor-pointer">
                Escolher
              </span>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                onChange={handleImageChange}
              />
            </div>
          </label>

          <label className="label flex flex-col gap-2 lg:w-[500px] w-full">
            Telefone
            <input
              className="input "
              type="text"
              {...register("phone", { required: true })}
              placeholder="+55 (00) 9 000-0000"
            />
            {errors.phone && (
              <span className="text-red-500">
                Numero precisa ser preenchido
              </span>
            )}
          </label>
        </div>

        <label className="label flex flex-col gap-2 flex-auto">
          Endereço
          <input
            className="input"
            type="text"
            {...register("address", { required: true })}
            placeholder="Digite o endereço"
          />
          {errors.address && (
            <span className="text-red-500">
              Endereço precisa ser preenchido
            </span>
          )}
        </label>

        <input
          type="submit"
          value={"Salvar Alterações"}
          className="py-3 px-20 bg-black rounded-lg font-Poppins font-normal text-base text-white cursor-pointer self-end"
        />
      </form>
    </div>
  );
};

export default PerfilForm;
