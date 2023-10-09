import styles from "./page.module.css";
import ECSTasks from "@/components/ECSTasks";

export default function Home() {
  return (
    <main className={styles.main}>
      <ECSTasks />
    </main>
  );
}
