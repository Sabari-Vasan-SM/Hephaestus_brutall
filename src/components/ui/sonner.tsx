import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-[3px] group-[.toaster]:border-foreground group-[.toaster]:rounded-none group-[.toaster]:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group-[.toaster]:p-4 group-[.toaster]:font-sans",
          title:
            "group-[.toast]:font-display group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:text-xs group-[.toast]:sm:text-sm",
          description:
            "group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:text-foreground/80 group-[.toast]:mt-0.5",
          actionButton:
            "group-[.toast]:bg-zap group-[.toast]:text-foreground group-[.toast]:border-[2px] group-[.toast]:border-foreground group-[.toast]:rounded-none group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:text-xs group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:group-[.toast]:bg-foreground hover:group-[.toast]:text-background group-[.toast]:transition-colors",
          cancelButton:
            "group-[.toast]:bg-smoke group-[.toast]:text-foreground group-[.toast]:border-[2px] group-[.toast]:border-foreground group-[.toast]:rounded-none group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:text-xs group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          closeButton:
            "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:rounded-none hover:group-[.toast]:bg-zap",
          success:
            "group-[.toaster]:border-foreground group-[.toaster]:bg-zap/20 group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-foreground",
          error:
            "group-[.toaster]:border-foreground group-[.toaster]:bg-destructive/15 group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-destructive",
          info: "group-[.toaster]:border-foreground group-[.toaster]:bg-smoke group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-foreground",
          warning:
            "group-[.toaster]:border-foreground group-[.toaster]:bg-zap group-[.toaster]:border-l-[8px] group-[.toaster]:border-l-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
