import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react';

interface ShopInterface {
  shopState: any;
  setShopState: Dispatch<SetStateAction<any>>;
}

interface PropsType {
  children?: ReactElement;
}

const ShopContext = createContext({} as ShopInterface);

export default function ShopProvider(props: PropsType) {
  const [shopState, setShopState] = useState({ isSticky: false });

  return (
    <ShopContext.Provider value={{ shopState: shopState, setShopState: setShopState }}>
      {props.children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error('Missing ShopProvider');
  }
  return shopContext;
}
