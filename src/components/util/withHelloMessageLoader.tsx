import { useEffect, FC, ComponentType } from "react";

interface Props {
  message?: string;
  error?: string;
  noData?: string;
  loading?: boolean;
}

const withHelloMessageLoader = <P extends object>(
  Component: ComponentType<P>,
  componentName: string
): FC<P & Props> => {
  const WrapperComponent: FC<P & Props> = ({
    message,
    error,
    noData,
    loading,
    ...rest
  }) => {
    
    useEffect(() => {
      console.log(`${message} ${componentName}`);
    }, [message, componentName]);

    if (loading) {
      return <div className="loader"></div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (noData) {
      return <div className="no-data">{noData}</div>;
    }

    return <Component {...(rest as P)} message={message} />;
  };

  return WrapperComponent;
};

export default withHelloMessageLoader;
