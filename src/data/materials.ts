import { ArrowLeftRight, CircleGauge, MoveRight, Scale, ShieldCheck, Waves } from "lucide-react";

export const materialSummaries = [
  {
    title: "Newton I",
    subtitle: "Inersia",
    icon: MoveRight,
    accent: "bg-sage-soft text-ink-deep dark:bg-moss dark:text-cream",
    chip: "bg-sage text-ink-deep dark:bg-moss/40 dark:text-cream",
    body: "Benda mempertahankan keadaan diam atau bergerak lurus beraturan selama resultan gaya bernilai nol.",
    formula: "Resultan F = 0"
  },
  {
    title: "Newton II",
    subtitle: "Gaya, massa, percepatan",
    icon: Scale,
    accent: "bg-beige-soft text-ink-deep dark:bg-ink-muted dark:text-beige",
    chip: "bg-beige text-ink-deep dark:bg-beige-deep/40 dark:text-cream",
    body: "Percepatan sebanding dengan gaya total dan berbanding terbalik dengan massa benda.",
    formula: "F = m x a"
  },
  {
    title: "Newton III",
    subtitle: "Aksi dan reaksi",
    icon: ArrowLeftRight,
    accent: "bg-moss-soft text-ink-deep dark:bg-ink-soft dark:text-cream",
    chip: "bg-moss text-cream dark:bg-moss-deep dark:text-cream",
    body: "Setiap gaya aksi selalu memiliki gaya reaksi yang sama besar, segaris, dan berlawanan arah.",
    formula: "F aksi = -F reaksi"
  }
];

export const detailedMaterials = [
  {
    title: "Hukum Newton I",
    kicker: "Inersia",
    icon: MoveRight,
    color: "bg-sage text-ink-deep dark:bg-moss dark:text-cream",
    formula: "Resultan F = 0",
    explanation:
      "Hukum Newton I menjelaskan sifat benda untuk mempertahankan keadaan geraknya. Jika benda diam, benda cenderung tetap diam. Jika benda bergerak lurus beraturan, benda cenderung tetap bergerak dengan kecepatan konstan selama tidak ada resultan gaya yang mengubahnya.",
    keyPoints: [
      "Resultan gaya nol berarti gaya-gaya yang bekerja saling meniadakan.",
      "Benda tidak harus diam saat resultan gaya nol; benda juga bisa bergerak dengan kecepatan tetap.",
      "Massa berhubungan dengan inersia. Semakin besar massa, semakin sulit keadaan geraknya diubah."
    ],
    examples: [
      "Penumpang terdorong ke depan saat mobil direm mendadak.",
      "Buku di atas meja tetap diam karena gaya berat dan gaya normal seimbang.",
      "Puck hoki meluncur lebih lama di permukaan es karena gaya gesek kecil."
    ]
  },
  {
    title: "Hukum Newton II",
    kicker: "Dinamika gerak",
    icon: Scale,
    color: "bg-beige text-ink-deep dark:bg-beige-deep/40 dark:text-cream",
    formula: "F = m x a",
    explanation:
      "Hukum Newton II menjelaskan hubungan kuantitatif antara resultan gaya, massa, dan percepatan. Saat gaya total bertambah, percepatan bertambah. Saat massa bertambah dengan gaya yang sama, percepatan menjadi lebih kecil.",
    keyPoints: [
      "Percepatan memiliki arah yang sama dengan resultan gaya.",
      "Satuan gaya adalah newton, satuan massa kilogram, dan satuan percepatan meter per sekon kuadrat.",
      "Rumus turunannya adalah a = F / m dan m = F / a."
    ],
    examples: [
      "Troli kosong lebih mudah dipercepat daripada troli penuh.",
      "Tendangan lebih kuat membuat bola mengalami percepatan lebih besar.",
      "Dua benda dengan massa berbeda memerlukan gaya berbeda untuk memperoleh percepatan yang sama."
    ]
  },
  {
    title: "Hukum Newton III",
    kicker: "Aksi dan reaksi",
    icon: ArrowLeftRight,
    color: "bg-moss text-cream dark:bg-moss-deep dark:text-cream",
    formula: "F aksi = -F reaksi",
    explanation:
      "Hukum Newton III menyatakan bahwa gaya selalu muncul berpasangan. Ketika benda A memberi gaya pada benda B, benda B memberi gaya yang sama besar tetapi berlawanan arah pada benda A.",
    keyPoints: [
      "Pasangan gaya bekerja pada dua benda yang berbeda.",
      "Besar gaya aksi dan reaksi sama, tetapi arahnya berlawanan.",
      "Kedua gaya muncul bersamaan, bukan bergantian."
    ],
    examples: [
      "Saat berjalan, kaki mendorong tanah ke belakang dan tanah mendorong tubuh ke depan.",
      "Roket terdorong naik karena gas panas didorong ke bawah.",
      "Dua kereta kecil yang bertumbukan saling memberi gaya berlawanan arah."
    ]
  },
  {
    title: "Gaya Normal dan Berat",
    kicker: "Gaya pada bidang",
    icon: ShieldCheck,
    color: "bg-sage-soft text-ink-deep dark:bg-moss dark:text-cream",
    formula: "W = m x g",
    explanation:
      "Berat adalah gaya gravitasi yang bekerja pada benda. Gaya normal adalah gaya kontak dari permukaan yang arahnya tegak lurus bidang. Pada benda diam di bidang datar, besar gaya normal sering sama dengan berat benda.",
    keyPoints: [
      "Berat berbeda dari massa. Massa tetap, berat bergantung pada gravitasi.",
      "Gaya normal muncul hanya saat ada kontak dengan permukaan.",
      "Pada bidang miring, gaya normal lebih kecil dari berat total."
    ],
    examples: [
      "Buku di meja memiliki berat ke bawah dan gaya normal ke atas.",
      "Orang di lift bisa terasa lebih berat atau ringan saat lift dipercepat.",
      "Benda di bidang miring memiliki komponen berat sejajar bidang."
    ]
  },
  {
    title: "Gaya Gesek",
    kicker: "Hambatan gerak",
    icon: Waves,
    color: "bg-beige-soft text-ink-deep dark:bg-beige-deep/40 dark:text-cream",
    formula: "f = koefisien x N",
    explanation:
      "Gaya gesek bekerja melawan kecenderungan gerak relatif antara dua permukaan. Gesek dapat membantu benda bergerak, seperti saat berjalan, tetapi juga dapat menghambat gerak, seperti saat kotak didorong di lantai kasar.",
    keyPoints: [
      "Gaya gesek statis bekerja sebelum benda mulai bergerak.",
      "Gaya gesek kinetis bekerja saat benda sudah bergerak relatif terhadap permukaan.",
      "Semakin kasar permukaan atau semakin besar gaya normal, gesek biasanya semakin besar."
    ],
    examples: [
      "Sepatu tidak tergelincir karena ada gesek antara sol dan lantai.",
      "Ban kendaraan membutuhkan gesek agar bisa berbelok dan mengerem.",
      "Kotak lebih sulit didorong di permukaan kasar daripada permukaan licin."
    ]
  },
  {
    title: "Resultan Gaya",
    kicker: "Penjumlahan gaya",
    icon: CircleGauge,
    color: "bg-sage text-ink-deep dark:bg-moss dark:text-cream",
    formula: "F total = F1 + F2 + ...",
    explanation:
      "Resultan gaya adalah gabungan semua gaya yang bekerja pada benda. Arah dan besar resultan menentukan apakah benda tetap stabil, bergerak konstan, atau mengalami percepatan.",
    keyPoints: [
      "Gaya searah dijumlahkan.",
      "Gaya berlawanan arah dikurangkan.",
      "Jika resultan gaya tidak nol, benda mengalami percepatan sesuai Hukum Newton II."
    ],
    examples: [
      "Dua siswa mendorong meja ke arah yang sama menghasilkan gaya total lebih besar.",
      "Tarik tambang seimbang saat gaya kedua tim sama besar.",
      "Bola berubah arah ketika resultan gaya bekerja menyamping."
    ]
  }
];
