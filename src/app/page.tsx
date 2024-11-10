import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 h-screen w-full items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>Login</CardHeader>
        <CardContent>Untuk login, Anda tidak perlu memasukkan apa pun. Cukup tekan tombol login dan Anda langsung dapat mengakses aplikasi.</CardContent>
        <CardHeader>Dashboard</CardHeader>
        <CardContent>Di bagian ini, saya telah menyediakan card untuk menampilkan data dan tabel untuk manipulasi data. Namun, fitur ini belum berfungsi sepenuhnya karena masih dalam tahap pengembangan dan hanya menggunakan data dummy untuk tampilan saja.</CardContent>
      </Card>
      <Button>
        <Link href={"/auth"}>Login</Link>
      </Button>
    </div>
  );
}
