import Image from "next/image";
import styles from "./page.module.css";
import { Container, Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container
      sx={{
        animation: "fadeIn 1.5s ease-in-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Stack alignItems={"center"} mt={1}>
        <Image
          src={
            "https://sun9-63.userapi.com/s/v1/ig2/-btcO20z1lH9Z8P2Dq1v0ZEgkrToI8Tdx1FpFUxh7zWglCSoZhSoVMBCyIYCZsiprP4zAIguyjhPI7r_C6C6aDX0.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,604x604&from=bu&u=_LThJlngVZ5gQKq3kM_IMm24D8aP0vB855H7Hk5RB3I&cs=604x604"
          }
          alt={"Козлик"}
          width={300}
          height={300}
        />
        <Typography variant={"h1"}>Сашка Козлик</Typography>
      </Stack>
    </Container>
  );
}
