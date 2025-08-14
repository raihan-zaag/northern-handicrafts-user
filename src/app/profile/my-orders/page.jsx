"use client";

import OrderCard from "@/components/cards/OrderCard";
import EmptyDataSkeleton from "@/components/common/EmptyDataSkeleton";
import RowSkeleton from "@/components/common/RowSkeleton";
import TabButton from "@/components/common/TabButton";
import PaginationComponent from "@/components/pagination";
import useGetOnGoingOrder from "@/hooks/order/useGetOnGoingOrder";
import useGetOrderHistory from "@/hooks/order/useGetOrderHistory ";
import { debounce } from "@/utils";
import { Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

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
      <h2 className="text-[#2A2A2A] font-semibold text-2xl">
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
        <Input
          placeholder="Search by Order ID"
          className="mt-6 search-field"
          suffix={<IoIosSearch className="text-2xl" />}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
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
