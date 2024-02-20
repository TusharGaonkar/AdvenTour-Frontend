/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Input,
  Tabs,
  Tab,
  Avatar,
  Skeleton,
  Pagination,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { useGetAllUserQuery } from '../../redux/slices/admin-getAllUsersInfoSlice';
import useDebounce from '../../hooks/useDebounce';

const UsersTable = () => {
  const [role, setRole] = useState<'local-guide' | 'user'>('local-guide');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

  const debouncedSetSearchQuery = useDebounce(setSearchQuery, 400);

  const handleInputChange = (inputValue: string) => {
    const trimmedInputValue = inputValue;
    setPage(1);
    setTotalPages(1);
    setInputText(trimmedInputValue);
    debouncedSetSearchQuery(trimmedInputValue);
  };

  const resetInputValue = () => {
    setInputText('');
    setSearchQuery('');
  };

  const {
    data: userData,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useGetAllUserQuery({
    role,
    page,
    limit: 5,
    searchQuery,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while fetching users', {
        className: 'text-xs font-medium',
      });
    } else if (userData) {
      const pageCount = userData.pagination.page ?? 1;
      const totalPageCount = userData.pagination.totalPages ?? 1;

      if (totalPageCount === 0) {
        setTotalPages(1);
        setPage(1);
      } else {
        setTotalPages(totalPageCount);
        setPage(pageCount);
      }
    }
  }, [userData, isError]);

  const handleTabChange = (key: 'local-guide' | 'user') => {
    setTotalPages(1);
    setPage(1);
    setRole(key);
  };

  const RenderTableSkeleton = useCallback(() => {
    return Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-[56px] w-[56px] rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[120px] rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[130px] rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[50px] rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[40px] w-[120px] rounded-full" />
        </TableCell>
      </TableRow>
    ));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="md:flex md:justify-between items-end">
        <div className="flex gap-2 w-full items-end">
          <Input
            type="text"
            label="Search Users"
            labelPlacement="outside"
            className="w-1/3"
            placeholder="Search by name or email"
            onChange={(event) => handleInputChange(event.target.value)}
            value={inputText}
          />
          <Button color="primary" variant="flat" onClick={() => resetInputValue()}>
            Clear
          </Button>
        </div>
        <div className="flex gap-2 items-center mt-3 sm:mt-3">
          <Button variant="flat" color="success" onClick={() => refetch()}>
            <span>
              <IoMdRefresh size={20} />
            </span>
            Refresh Data
          </Button>
          <Tabs
            variant="solid"
            aria-label="Filter users"
            onSelectionChange={(key) => handleTabChange(key as 'local-guide' | 'user')}
          >
            <Tab key="user" title="Users" />
            <Tab key="local-guide" title="Local Guides" />
          </Tabs>
        </div>
      </div>
      <Table
        aria-label="Registered users of Adventour"
        isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(nextPage) => setPage(nextPage)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>AVATAR</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>CONTACT</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No users found">
          {isFetching && RenderTableSkeleton()}

          {/* !isFetching may look redundant below, but it is required as the results are cached
          else will get the cached results along with the skeleton while fetching
          Internally isSuccess set to true from cache , then isFetching set to false
          */}

          {isSuccess &&
            !isFetching &&
            userData?.data?.users?.map(
              (user: { avatar: string; email: string; userName: string; role: string }) => (
                <TableRow key={user?.email}>
                  <TableCell>
                    <Avatar name={user?.userName} src={user?.avatar} size="lg" />
                  </TableCell>
                  <TableCell>{user?.userName}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    <Chip size="sm" color="warning" variant="flat">
                      {user.role.toUpperCase()}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button size="md" className="bg-black rounded-full  text-white">
                      Contact User
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
