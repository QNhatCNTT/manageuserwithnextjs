// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const ip = req.socket.remoteAddress;
  console.log(ip);
  res.status(200).json({ IpAddress: ip });
}
