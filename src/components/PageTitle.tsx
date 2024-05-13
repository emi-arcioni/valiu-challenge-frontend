type Props = {
  title: string;
};

function PageTitle({ title }: Props) {
  return <h2>{title}</h2>;
}

export default PageTitle;
