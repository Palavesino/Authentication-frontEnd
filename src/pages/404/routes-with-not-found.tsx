import { Route, Routes } from "react-router-dom";
import NotFound from "./404";

interface Props {
  children: React.ReactNode;
}

function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />;
    </Routes>
  )
}
export default RoutesWithNotFound;