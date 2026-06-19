import {
  DISTRICT_FEES,
  MOCK_MEAL_DATA,
  USER_CHOOSE_PACKAGE,
  WEEKDAYS,
} from "@/constants";
import {
  Customer,
  MealType,
  MenuItem,
  Order,
  UserChoosePackage,
  Weekday
} from "@/types";
import { useEffect, useMemo, useState } from "react";
import { orderService } from "../services";
import { AxiosError } from "axios";

export function useAppState() {
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [userChoosePackage, setUserChoosePackage] = useState<UserChoosePackage>(
    { idWeek: "", idDay: "", idMeal: "", quantity: 1 } as UserChoosePackage,
  );

  // Selection State
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const [selectedMealCount, setSelectedMealCount] = useState<number>(0);
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number>>(
    {},
  );
  const [weeksCount, setWeeksCount] = useState(-1);

  const [customerData, setCustomerData] = useState<Customer>({
    phone: "",
    fullName: "",
    address: "",
    district: "",
    timeReceive: "",
    feeShip: 0,
    startDate: "",
    endDate: "",
    promote: "",
  });
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "cod">(
    "transfer",
  );
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string; isOpen: boolean }>({
    message: "",
    isOpen: false,
  });

  const showAlert = (message: string) => setAlert({ message, isOpen: true });
  const hideAlert = () => setAlert((prev) => ({ ...prev, isOpen: false }));

  // Autofill logic
  useEffect(() => {
    if (customerData.phone && customerData.phone.length === 10) {
      const existing = allCustomers.find((c) => c.phone === customerData.phone);
      if (existing) {
        setCustomerData(existing);
      }
    }
  }, [customerData.phone, allCustomers]);

  useEffect(() => {
    const init = async () => {
      try {
        const mockExtendedMenu: MenuItem[] = MOCK_MEAL_DATA;
        setMenu(mockExtendedMenu);
      } catch (err) {
        console.error("Init error:", err);
      }
    };
    init();
  }, []);

  const getDayTotalQty = (
    day: Weekday,
    currentMeals: Record<string, number> = selectedMeals,
  ) => {
    return (Object.entries(currentMeals) as [string, number][])
      .filter(([k]) => k.startsWith(day))
      .reduce((sum, [_, qty]) => sum + qty, 0);
  };

  const handleMealIncrement = (day: Weekday, type: MealType) => {
    const key = `${day}-${type}`;
    const currentQty = selectedMeals[key] || 0;
    const dayTotal = getDayTotalQty(day);

    if (dayTotal >= selectedMealCount * userChoosePackage.quantity!) {
      showAlert(`Ngày ${day} đã chọn đủ tối đa ${selectedMealCount * userChoosePackage.quantity!} bữa!`);
      return;
    }

    const currentDays = new Set(
      (Object.entries(selectedMeals) as [string, number][])
        .filter(([_, qty]) => qty > 0)
        .map(([k]) => k.split("-")[0]),
    );

    if (!currentDays.has(day) && currentDays.size >= selectedPlan) {
      showAlert(`Giới hạn gói là ${selectedPlan} ngày!`);
      return;
    }

    // Put standard menuItem ID or fallback to key mapping
    setSelectedMeals((prev) => ({
      ...prev,
      [key]: currentQty + 1,
    }));
  };

  const handleMealDecrement = (day: Weekday, type: MealType) => {
    const key = `${day}-${type}`;
    const currentQty = selectedMeals[key] || 0;
    if (currentQty <= 1) {
      setSelectedMeals((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } else {
      setSelectedMeals((prev) => ({
        ...prev,
        [key]: currentQty - 1,
      }));
    }
  };

  const handleMealToggle = (day: Weekday, type: MealType) => {
    const key = `${day}-${type}`;
    const qty = selectedMeals[key] || 0;
    if (qty > 0) {
      handleMealDecrement(day, type);
    } else {
      handleMealIncrement(day, type);
    }
  };

  const totals = useMemo(() => {
    let food = 0;
    Object.values(selectedMeals).forEach((id) => {
      const item = menu.find((m) => m.id === id);
      if (item) food += item.price;
    });
    const pricePackageChosen = USER_CHOOSE_PACKAGE.find(
      (pack) =>
        pack.idMeal === userChoosePackage.idMeal &&
        pack.idDay === userChoosePackage.idDay &&
        pack.idWeek === userChoosePackage.idWeek,
    ) as UserChoosePackage;

    let discountAmount = 0;
    if (customerData.promote === import.meta.env.VITE_PROMOTE_DISCOUNT_NUMBER) {
      discountAmount = Number(import.meta.env.VITE_PROMOTE_EXACT_NUMBER);

    } else if (customerData.promote === import.meta.env.VITE_PROMOTE_DISCOUNT_PERCENT) {
      discountAmount = Math.round(pricePackageChosen?.price * userChoosePackage.quantity! * Number(import.meta.env.VITE_PROMOTE_EXACT_PERCENT));
      
    } else discountAmount = 0;

    console.log(discountAmount);

    const shipTotal = customerData.feeShip
      ? customerData.feeShip * selectedPlan * weeksCount
      : 0;

    return {
      foodTotal: pricePackageChosen,
      shipTotal,
      finalTotal: pricePackageChosen?.price * userChoosePackage.quantity! + shipTotal - discountAmount,
    };
  }, [
    selectedMeals,
    menu,
    weeksCount,
    customerData.district,
    customerData.feeShip,
    customerData.promote,
    selectedPlan,
    userChoosePackage.quantity,
  ]);

  const handleSubmitOrder = async () => {
    if (paymentMethod === "transfer" && !paymentProof)
      return showAlert("Vui lòng tải bill thanh toán!");
    setIsSubmitting(true);
    try {
      // Format metaDataMeal: T2: Món A, Món B <br/> T3: Món C...
      const mealMetaLines: string[] = [];
      WEEKDAYS.forEach((day) => {
        const dayMeals = (Object.entries(selectedMeals) as [string, number][])
          .filter(([key, qty]) => key.startsWith(day) && qty > 0)
          .map(([key, qty]) => {
            const [_, type] = key.split("-");
            const meal = menu.find(
              (m) => m.weekday === day && m.mealType === (type as MealType),
            );
            if (meal) {
              return qty > 1 ? `${meal.dishName} x${qty}` : meal.dishName;
            }
            return null;
          })
          .filter(Boolean);
        if (dayMeals.length > 0) {
          mealMetaLines.push(`${day}: ${dayMeals.join(", ")}`);
        }
      });
      const metaDataMeal = mealMetaLines.join(" <br/> ");

      let formattedStartDate = "";
      let formattedEndDate = "";
      if (customerData.startDate) {
        const startD = new Date(customerData.startDate);
        if (!isNaN(startD.getTime())) {
          const sDay = String(startD.getDate()).padStart(2, "0");
          const sMonth = String(startD.getMonth() + 1).padStart(2, "0");
          const sYear = startD.getFullYear();
          formattedStartDate = `${sDay}/${sMonth}/${sYear}`;

          const endD = new Date(startD);
          endD.setDate(endD.getDate() + (weeksCount * 7 - 1));
          const eDay = String(endD.getDate()).padStart(2, "0");
          const eMonth = String(endD.getMonth() + 1).padStart(2, "0");
          const eYear = endD.getFullYear();
          formattedEndDate = `${eDay}/${eMonth}/${eYear}`;
        }
      }

      const formDataObj = new FormData();

      formDataObj.append("phoneNumber", customerData.phone);
      formDataObj.append("fullName", customerData.fullName);
      formDataObj.append("district", DISTRICT_FEES.find((d) => d.id === customerData.district)?.name || "");
      formDataObj.append("address", customerData.address);
      formDataObj.append("shipFee", customerData.feeShip.toString());
      formDataObj.append("timeReceive", customerData.timeReceive);
      formDataObj.append("totalPrice", totals.finalTotal.toString());
      formDataObj.append(
        "mealPackage",
        `${weeksCount} tuần - ${selectedPlan} ngày - ${selectedMealCount} bữa/ngày x ${userChoosePackage.quantity}`,
      );
      formDataObj.append("metadataOrder", JSON.stringify(metaDataMeal));
      formDataObj.append("note", note);
      formDataObj.append("startDate", formattedStartDate);
      formDataObj.append("endDate", formattedEndDate);
      formDataObj.append("paymentProofFile", paymentProof ? paymentProof : "");

      const result = await orderService.create(formDataObj);

      if (result?.status === 201) {
        setOrderSuccessId(result?.data?.id);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
      error.response?.data?.message || "Lỗi hệ thống!";
      showAlert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    state: {
      activeTab,
      currentPage,
      menu,
      allCustomers,
      orders,
      analytics,
      selectedPlan,
      selectedMealCount,
      selectedMeals,
      weeksCount,
      customerData,
      note,
      paymentMethod,
      paymentProof,
      isSubmitting,
      orderSuccessId,
      totals,
      userChoosePackage,
      alert,
    },
    actions: {
      setActiveTab,
      setCurrentPage,
      setSelectedPlan,
      setSelectedMealCount,
      setSelectedMeals,
      setWeeksCount,
      setCustomerData,
      setNote,
      setPaymentMethod,
      setPaymentProof,
      handleMealToggle,
      handleMealIncrement,
      handleMealDecrement,
      handleSubmitOrder,
      setUserChoosePackage,
      setOrderSuccessId,
      showAlert,
      hideAlert,
    },
  };
}
