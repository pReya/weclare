const isConnected = state => {
  const {
    client: { connection }
  } = state;
  return connection && connection.open;
};

export default isConnected;
