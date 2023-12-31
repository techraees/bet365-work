export const metadata = {
  title: "Bet with bet365 - Live Online Betting",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  HandheldFriendly: "true",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body>{children}</body>
    </>
  );
}
