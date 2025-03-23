export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title } = props;
  return <div className='__Header'>{title} component works!</div>;
};
