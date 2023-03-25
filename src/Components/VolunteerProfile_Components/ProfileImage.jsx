import { MdAddAPhoto } from 'react-icons/md';

function ProfileImage({ photo, name }) {
  return (
    <>
      <div className=" relative mt-2">
        <img
          className="w-[170px] h-[170px] rounded-full"
          src={photo}
          // src="https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
          alt="profile"
        />
        <MdAddAPhoto
          size={30}
          color={'darkblue'}
          className="bottom-0 right-6 absolute"
        />
      </div>
      <h1 className="text-2xl font-semibold pt-1 tracking-wider">{name}</h1>
      <p className="text-sm text-gray-700">Member since 1 Jan 2010</p>
    </>
  );
}

export default ProfileImage;
