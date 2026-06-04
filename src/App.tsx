import { Step3Information } from "@/pages/client/checkout/CheckoutComponents";
import { MealSelection } from "@/pages/client/menu/MealSelection";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GlassAlert } from "./components/common/Alert";
import { Footer } from "./components/common/Footer";
import { Layout } from "./components/common/Layout";
import { StepIndicator } from "./components/common/StepIndicator";
import { ZaloWidget } from "./components/common/ZaloWidget";
import { DISTRICT_FEES } from "./constants";
import { useAppState } from "./hooks/useAppState";
import { SelectionWizard } from "./pages/client/home/SelectionWizard";
import { PaymentStep } from "./pages/client/payment/PaymentStep";
import { SuccessStep } from "./pages/client/payment/SuccessStep";

export default function App() {
  const navigate = useNavigate();
  const { state, actions } = useAppState();
  const {
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
    paymentProof,
    isSubmitting,
    orderSuccessId,
    totals,
    userChoosePackage,
    alert,
    paymentMethod,
  } = state;

  const {
    setActiveTab,
    setCurrentPage,
    setSelectedPlan,
    setSelectedMealCount,
    setSelectedMeals,
    setWeeksCount,
    setCustomerData,
    setNote,
    setPaymentProof,
    setUserChoosePackage,
    handleMealToggle,
    handleMealIncrement,
    handleMealDecrement,
    setOrderSuccessId,
    handleSubmitOrder,
    hideAlert,
  } = actions;

  useEffect(() => {
    if (orderSuccessId) {
      navigate(`/invoice/${orderSuccessId}`);
    }
  }, [orderSuccessId, navigate]);

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [currentPage]);

  const renderCustomerFlow = () => (
    <div key="customer-flow">
      <StepIndicator currentStep={currentPage} />
      {currentPage === 1 && (
        <SelectionWizard
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          selectedMealCount={selectedMealCount}
          setSelectedMealCount={setSelectedMealCount}
          setUserChoosePackage={setUserChoosePackage}
          userChoosePackage={userChoosePackage}
          weeksCount={weeksCount}
          setWeeksCount={setWeeksCount}
          onNext={() => setCurrentPage(2)}
          resetMeals={() => setSelectedMeals({})}
        />
      )}
      {currentPage === 2 && (
        <MealSelection
          menu={menu}
          selectedWeek={weeksCount}
          selectedMeals={selectedMeals}
          handleMealToggle={handleMealToggle}
          handleMealIncrement={handleMealIncrement}
          handleMealDecrement={handleMealDecrement}
          selectedPlan={selectedPlan}
          selectedMealCount={selectedMealCount}
          packageQuantity={userChoosePackage.quantity}
          onBack={() => setCurrentPage(1)}
          onNext={() => setCurrentPage(3)}
        />
      )}
      {currentPage === 3 && (
        <Step3Information
          customerData={customerData}
          setCustomerData={setCustomerData}
          allCustomers={allCustomers}
          districts={DISTRICT_FEES}
          weeksCount={weeksCount}
          setWeeksCount={setWeeksCount}
          note={note}
          setNote={setNote}
          paymentMethod={state.paymentMethod}
          setPaymentMethod={actions.setPaymentMethod}
          totals={totals}
          selectedMealCount={selectedMealCount}
          selectedPlan={selectedPlan}
          onBack={() => setCurrentPage(2)}
          onNext={() => setCurrentPage(4)}
          userChoosePackage={userChoosePackage}
        />
      )}
      {currentPage === 4 && (
        <PaymentStep
          totalAmount={totals.finalTotal}
          phone={customerData.phone}
          paymentMethod={state.paymentMethod}
          paymentProof={paymentProof}
          setPaymentProof={setPaymentProof}
          onSubmit={handleSubmitOrder}
          isSubmitting={isSubmitting}
          onBack={() => setCurrentPage(3)}
        />
      )}
    </div>
  );

  const renderAdminFlow = () => (
    <div key="admin-flow" className="space-y-16">
      <div className="flex justify-center gap-6 mb-16">
      </div>
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setCurrentPage(tab === "admin" ? 6 : 1);
            }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "customer"
                ? renderCustomerFlow()
                : renderAdminFlow()}
            </AnimatePresence>
            <Footer />
            <ZaloWidget />
            <GlassAlert
              isOpen={alert.isOpen}
              onClose={hideAlert}
              message={alert.message}
            />
          </Layout>
        }
      />
      <Route
        path="/invoice/:orderId"
        element={
          <SuccessStep
            orderId={orderSuccessId || ""}
            fullName={customerData.fullName}
            mealPackage={`${weeksCount} tuần - ${selectedPlan} ngày - ${selectedMealCount} bữa/ngày`}
            phoneNumber={customerData.phone}
            shipFee={totals.shipTotal}
            totalPrice={totals.finalTotal}
            paymentMethod={paymentMethod}
            setOrderSuccessId={setOrderSuccessId}
            setCurrentPage={setCurrentPage}
            userChoosePackage={userChoosePackage}
          />
        }
      />
    </Routes>
  );
}
