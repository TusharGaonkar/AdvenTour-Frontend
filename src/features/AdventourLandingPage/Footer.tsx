import adventTourLogo from '/advenTourLogo.png';
import { Chip } from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <section className="mb-20 lg:mb-0 p-6 w-full bg-gradient-to-r from-slate-50 to-slate-100 overflow-hidden">
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="flex items-end">
        <img
          src={adventTourLogo}
          alt="adventTourLogo"
          height={30}
          width={40}
          className="object-cover"
        />
        <h2 className="text-sm font-semibold">
          &nbsp;
          <span className="font-bold">&#169; AdvenTour {new Date().getFullYear()}</span>
        </h2>
      </div>
      <p className="text-xs md:text-sm text-slate-400">Your journey, our expertise!</p>

      <a
        href="https://github.com/TusharGaonkar"
        className="text-xs text-slate-500 underline mt-2"
        target="_blank"
        rel="noreferrer"
      >
        By Tushar Gaonkar
      </a>

      <div className="flex flex-col md:flex-row gap-2 items-start mt-2">
        <Chip size="sm" variant="solid" className="bg-slate-200">
          <a
            href="https://github.com/TusharGaonkar/AdvenTour-Frontend"
            rel="noreferrer"
            className="text-xs flex items-center gap-1"
            target="_blank"
          >
            <FaGithub className="text-medium" />
            Contribute to Frontend
          </a>
        </Chip>
        <Chip size="sm" variant="solid" className="bg-slate-200">
          <a
            href="https://github.com/TusharGaonkar/AdvenTour-Backend"
            rel="noreferrer"
            className="text-xs flex items-center gap-1"
            target="_blank"
          >
            <FaGithub className="text-medium" />
            Contribute to Backend
          </a>
        </Chip>
      </div>
    </div>
  </section>
);

export default Footer;
