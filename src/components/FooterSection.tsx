const FooterSection = () => {
  return (
    <footer className="py-10 px-4 border-t border-border">
      <div className="container text-center">
        <h3 className="text-xl font-bold font-display text-gradient mb-2">BankKonten.id</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Penyedia gambar AI termurah dan terpercaya di Indonesia.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BankKonten.id — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
