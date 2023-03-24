function HeaderAndBorder({ title }) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-wider pb-2 text-gray-500">
        {title}
      </h1>
      <hr className="border border-gray-300 w-[90%] mb-4" />
    </>
  );
}

export default HeaderAndBorder;
