const formateDate = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  //   const seconds = now.getSeconds();

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate;
};

export default formateDate;
