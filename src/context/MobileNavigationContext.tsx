import { createContext, ReactNode, useContext, useState } from "react";

const MobileNavigationContext = createContext({
	isOpen: false,
	toggleMobileNavigation: () => {},
});

export const useMobileNavigation = () => useContext(MobileNavigationContext);

export const MobileNavigationProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMobileNavigation = () => {
		setIsOpen(!isOpen);
	};

	return (
		<MobileNavigationContext.Provider
			value={{ isOpen, toggleMobileNavigation }}
		>
			{children}
		</MobileNavigationContext.Provider>
	);
};
