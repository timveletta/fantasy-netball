const Text = {
	Header: ({ children }: React.HTMLAttributes<HTMLElement>) => (
		<h1 className="text-4xl font-bold">{children}</h1>
	),
	Body: ({ children }: React.HTMLAttributes<HTMLElement>) => <p>{children}</p>,
};

export default Text;
