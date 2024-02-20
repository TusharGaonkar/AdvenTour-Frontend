import { Card, CardHeader, CardBody, Divider, Skeleton } from '@nextui-org/react';

const StatsCard = ({
  title,
  value,
  style = {},
  isLoaded = false,
  icon,
}: {
  title: string;
  value: number;
  style?: React.CSSProperties;
  isLoaded: boolean;
  icon?: JSX.Element;
}) => (
  <Skeleton isLoaded={isLoaded} className="rounded-2xl shadow-md">
    <Card className="flex flex-col flex-1 min-w-max" style={style}>
      <CardHeader className="font-bold text-xl px-3 py-3 leading-loose">
        <div className="flex gap-2 items-center">
          {icon}
          <p>{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="font-semibold text-xl">{value}</CardBody>
    </Card>
  </Skeleton>
);

export default StatsCard;
