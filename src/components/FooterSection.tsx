import { useContentStore } from "@/modules/admin/store/contentStore";

const FooterSection = () => {
  const { footer } = useContentStore();
  return (
    <footer className="py-10 px-4 border-t border-border">
      <div className="container text-center">
        <h3 className="text-xl font-bold font-display text-gradient mb-2">{footer.brand_name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{footer.description}</p>
        <p className="text-xs text-muted-foreground">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
