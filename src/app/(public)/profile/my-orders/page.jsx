"use client";

import OrderCard from "@/common/components/cards/OrderCard";

import PaginationComponent from "@/common/components/pagination";
import useGetOnGoingOrder from "@/app/(public)/orders/hooks/useGetOnGoingOrder";
import useGetOrderHistory from "@/app/(public)/orders/hooks/useGetOrderHistory ";
import { Input } from "@/common/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { debounce } from "@/common/lib/utils";
import TabButton from "@/common/components/shared/TabButton";
import RowSkeleton from "@/common/components/shared/RowSkeleton";
import EmptyDataSkeleton from "@/common/components/shared/EmptyDataSkeleton";

const MyOrders = () => {
  const [activeTab, setActiveTab] = React.useState(profileOrderTabList[0]);
  const [ongoingOrders, setOngoingOrders] = React.useState([]);
  const [orderHistory, setOrderHistory] = React.useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [onGoingOrderLoading, setOnGoingOrderLoading] = React.useState(true);
  const [orderHistoryLoading, setOrderHistoryLoading] = React.useState(false);

  const { getOnGoingOrder, onGoingPageSize, loading } = useGetOnGoingOrder();
  const {
    getOrderHistory,
    orderHistoryPageSize,
    loading: historyLoading,
  } = useGetOrderHistory();

  // React.useEffect(() => {
  //   // fetch ongoing orders
  //   // fetch order history
  //   fetchOrderHistory(0, 10);
  // }, []);

  useEffect(() => {
    if (activeTab?.id === 1) {
      fetchOngoingOrders(0, 10);
    } else {
      fetchOrderHistory(0, 10);
    }

    setCurrentPage(1);
  }, [activeTab]);

  const fetchOngoingOrders = async (page = 0, size = 10) => {
    const response = await getOnGoingOrder(page, size);

    setOngoingOrders(response);
    setOnGoingOrderLoading(false);
  };

  const fetchOrderHistory = async (page = 0, size = 10) => {
    const response = await getOrderHistory(page, size);

    setOrderHistory(response);
    setOrderHistoryLoading(false);
  };

  const fetchFilteredOrders = async (query) => {
    if (activeTab.title === "OnGoing Orders") {
      setOnGoingOrderLoading(true);
      const response = await getOnGoingOrder(0, 10, query);
      setOngoingOrders(response);
      setOnGoingOrderLoading(false);
    } else {
      setOrderHistoryLoading(true);
      const response = await getOrderHistory(0, 10, query);
      setOrderHistory(response);
      setOrderHistoryLoading(false);
    }
  };

  // Custom debounce search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchFilteredOrders(query);
    }, 1000),
    [activeTab]
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handlePagination = (page, size) => {
    if (activeTab?.id === 1) {
      fetchOngoingOrders(page - 1, size);
      setCurrentPage(page);
    } else {
      fetchOrderHistory(page - 1, size);
      setCurrentPage(page);
    }
  };

  return (
    <div>
  <h2 className="text-gray-dark font-semibold text-2xl">
        {activeTab.title}
      </h2>
      <div className="mt-6">
        <TabButton
          tabs={profileOrderTabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative mt-6">
          <Input
            placeholder="Search by Order ID"
            className="search-field pr-10"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
        </div>
      </div>

      <div className="mt-6">
        {activeTab.title === "OnGoing Orders" ? (
          <div>
            {onGoingOrderLoading ? (
              <RowSkeleton count={3} />
            ) : (
              <>
                {ongoingOrders?.length > 0 ? (
                  ongoingOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      ongoingOrders={ongoingOrders}
                      setOngoingOrders={setOngoingOrders}
                    />
                  ))
                ) : (
                  <EmptyDataSkeleton title="No ongoing orders" />
                )}
              </>
            )}
          </div>
        ) : (
          <div>
            {orderHistoryLoading ? (
              <RowSkeleton count={3} />
            ) : (
              <>
                {orderHistory?.length > 0 ? (
                  orderHistory.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))
                ) : (
                  <EmptyDataSkeleton title="No order history" />
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-5">
        <PaginationComponent
          pageSize={
            activeTab?.id === 1 ? onGoingPageSize : orderHistoryPageSize
          }
          handlePagination={handlePagination}
          current={currentPage}
        />
      </div>
    </div>
  );
};

export default MyOrders;

const profileOrderTabList = [
  {
    id: 1,
    title: "OnGoing Orders",
    path: "/profile/ongoing-orders",
  },
  {
    id: 2,
    title: "Orders History",
    path: "/profile/order-history",
  },
];
