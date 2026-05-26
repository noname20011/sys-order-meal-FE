import { Analytics } from "@/src/pages/admin/Analytics";
import { Operations } from "@/src/pages/admin/Operations";
import { Step3Information } from "@/src/pages/client/checkout/CheckoutComponents";
import { MealSelection } from "@/src/pages/client/menu/MealSelection";
import { BarChart3, LayoutDashboard, Truck } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Footer } from "./components/common/Footer";
import { Layout } from "./components/common/Layout";
import { StepIndicator } from "./components/common/StepIndicator";
import { ZaloWidget } from "./components/common/ZaloWidget";
import { useAppState } from "./hooks/useAppState";
import { cn } from "./lib/utils";
import { SelectionWizard } from "./pages/client/home/SelectionWizard";
import { PaymentStep } from "./pages/client/payment/PaymentStep";
import { SuccessStep } from "./pages/client/payment/SuccessStep";
import { GlassAlert } from "./components/common/Alert";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { DISTRICT_FEES } from "./constants";

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
        <button
          onClick={() => setCurrentPage(6)}
          className={cn(
            "px-10 py-5 rounded-sm border-2 font-serif italic text-xl uppercase tracking-tight flex items-center gap-3 transition-all",
            currentPage === 6
              ? "bg-brand-green text-black border-brand-green neon-glow"
              : "bg-white/5 text-white/40 border-white/10 hover:border-brand-green/50",
          )}
        >
          <BarChart3 className="w-6 h-6" /> ANALYTICS
        </button>
        <button
          onClick={() => setCurrentPage(7)}
          className={cn(
            "px-10 py-5 rounded-sm border-2 font-serif italic text-xl uppercase tracking-tight flex items-center gap-3 transition-all",
            currentPage === 7
              ? "bg-brand-orange text-black border-brand-orange shadow-md neon-glow-orange"
              : "bg-white/5 text-white/40 border-white/10 hover:border-brand-orange/50",
          )}
        >
          <Truck className="w-6 h-6" /> LOGISTICS
        </button>
      </div>
      {currentPage === 6 && <Analytics analytics={analytics} />}
      {currentPage === 7 && <Operations orders={orders} />}
      {![6, 7].includes(currentPage) && (
        <div className="text-center p-24 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-green/2 grid-pattern opacity-5 pointer-events-none" />
          <LayoutDashboard className="w-20 h-20 text-white/5 mx-auto mb-6" />
          <p className="text-white/30 font-black italic uppercase tracking-[0.4em] text-xs">
            SELECT OPERATIONAL MODULE ABOVE
          </p>
          <button
            onClick={() => setCurrentPage(6)}
            className="mt-12 px-12 py-5 rounded-sm bg-brand-green text-black font-black font-serif italic uppercase tracking-tight text-xl neon-glow active:scale-95 transition-all"
          >
            COMMAND CENTER
          </button>
        </div>
      )}
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
          <>
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
            <ZaloWidget />
          </>
        }
      />
    </Routes>
  );
}
