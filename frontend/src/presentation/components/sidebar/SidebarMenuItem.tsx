import { NavLink } from "react-router";
import { Option } from "../../interfaces";

interface Props {
    option:Option
}

export const SidebarMenuItem = ({ option }: Props) => {
  return (
    <NavLink
      key={option.to}
      to={option.to}
      className={({ isActive }) =>
        isActive
          ? "flex gap-5 justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
          : "flex gap-5 justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`${option.icon}  text-indigo-400`}></i>
      <div className="flex flex-col flex-grow size-auto">
        <span className="text-white text-lg font-semibold">{option.title}</span>
        <span className="text-gray-400 text-sm">{option.description}</span>
      </div>
    </NavLink>
  );
};
