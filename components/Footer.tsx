import Link from "next/link";

import { Content, Manufacturer } from "@generated/types";

interface FooterProps {
    pages: Content[];
    manufacturers: Manufacturer[];
}

const links = [
    {
        title: "Home",
        id: "/",
    },
];

const Footer = ({ pages, manufacturers }: FooterProps) => {
    const sitePages = pages
        ? pages.filter((page) => page.folder === "CMSFOLDER_USERINFO")
        : [];
    return (
        <footer className="text-gray-50 transition-colors duration-150 bg-gray-900 border-t border-gray-100">
            <div className="max-w-7xl lg:grid-cols-4 grid grid-cols-1 gap-8 py-12 mx-auto">
                <div className="col-span-1">
                    <Link href="/">
                        <a className="flex items-center flex-initial font-bold">
                            <span className="mr-2">Powered by</span>
                            <span className="text-xl font-semibold tracking-tight">
                                OXID <span className="text-red-600">e</span>
                                Sales
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="grid">
                    {[...links, ...sitePages].map((page) => (
                        <span key={page.id} className="py-2">
                            <Link href={`${page.id}`}>
                                <a className="hover:underline transition duration-150 ease-in-out">
                                    {page.title}
                                </a>
                            </Link>
                        </span>
                    ))}
                </div>
                <div className="grid">
                    {manufacturers.slice(0, 6).map((manufacturer) => (
                        <span key={manufacturer.id} className="py-2">
                            <Link href={`${manufacturer.id}`}>
                                <a className="hover:underline transition duration-150 ease-in-out">
                                    {manufacturer.title}
                                </a>
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
