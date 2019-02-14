const isConnected = state => {
  const {
    server: { connections }
  } = state;
  return connections.length > 0;
};

export default isConnected;
