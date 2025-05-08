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
            "https://plus.unsplash.com/premium_photo-1664304299664-a8e2e2f80290?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
