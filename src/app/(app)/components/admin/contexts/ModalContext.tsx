"use client";
// ModalContext.tsx
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isEditUserModalOpen: boolean;
  openEditUserModal: () => void;
  closeEditUserModal: () => void;

  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;

  isNewUserModalOpen: boolean;
  openNewUserModal: () => void;
  closeNewUserModal: () => void;

  isBlockUserModalOpen: boolean;
  openBlockUserModal: () => void;
  closeBlockUserModal: () => void;

  isLimitUserModalOpen: boolean;
  openLimitUserModal: () => void;
  closeLimitUserModal: () => void;

  isCouponModalOpen: boolean;
  openCouponModal: () => void;
  closeCouponModal: () => void;

  isUserInfoModalOpen: boolean;
  openUserInfoModal: () => void;
  closeUserInfoModal: () => void;

  isTransferAmountModalOpen: boolean;
  openTransferAmountModal: () => void;
  closeTransferAmountModal: () => void;

  isChangePasswordModalOpen: boolean;
  openChangePasswordModal: () => void;
  closeChangePasswordModal: () => void;

  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;

  isSearchCouponModalOpen: boolean;
  openSearchCouponModal: () => void;
  closeSearchCouponModal: () => void;

  isDetailsModalOpen: boolean;
  openDetailsModal: () => void;
  closeDetailsModal: () => void;

  isDetailViewModalOpen: boolean;
  openDetailViewModal: () => void;
  closeDetailViewModal: () => void;

  isGameTransactionModalOpen: boolean;
  openGameTransactionModal: () => void;
  closeGameTransactionModal: () => void;

  isCasinoTransactionModalOpen: boolean;
  openCasinoTransactionModal: () => void;
  closeCasinoTransactionModal: () => void;

  isMatchResultModalOpen: boolean;
  openMatchResultModal: () => void;
  closeMatchResultModal: () => void;

  isTranslateModalOpen: boolean;
  openTranslateModal: () => void;
  closeTranslateModal: () => void;

  isExcludedBetTypesModalOpen: boolean;
  openExcludedBetTypesModal: () => void;
  closeExcludedBetTypesModal: () => void;

  isStatisticsModalOpen: boolean;
  openStatisticsModal: () => void;
  closeStatisticsModal: () => void;

  isLimitModalOpen: boolean;
  openLimitModal: () => void;
  closeLimitModal: () => void;

  isDelayModalOpen: boolean;
  openDelayModal: () => void;
  closeDelayModal: () => void;

  isBonusPrimeModalOpen: boolean;
  openBonusPrimeModal: () => void;
  closeBonusPrimeModal: () => void;

  isBonusSystemNewModalOpen: boolean;
  openBonusSystemNewModal: () => void;
  closeBonusSystemNewModal: () => void;

  isBonusSystemEditModalOpen: boolean;
  openBonusSystemEditModal: () => void;
  closeBonusSystemEditModal: () => void;

  isAssignModalOpen: boolean;
  openAssignModal: () => void;
  closeAssignModal: () => void;

  isSetRakeModalOpen: boolean;
  openSetRakeModal: () => void;
  closeSetRakeModal: () => void;

  isCreateRakeModalOpen: boolean;
  openCreateRakeModal: () => void;
  closeCreateRakeModal: () => void;

  isTaxesSettingsModalOpen: boolean;
  openTaxesSettingsModal: () => void;
  closeTaxesSettingsModal: () => void;

  isGameModalOpen: boolean;
  openGameModal: () => void;
  closeGameModal: () => void;

  isCasinoEditModalOpen: boolean;
  openCasinoEditModal: () => void;
  closeCasinoEditModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
  const [isLimitUserModalOpen, setIsLimitUserModalOpen] = useState(false);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  // User Search page
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isTransferAmountModalOpen, setIsTransferAmountModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  // Search Coupon page
  const [isSearchCouponModalOpen, setIsSearchCouponModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDetailViewModalOpen, setIsDetailViewModalOpen] = useState(false);
  // Slot Transactions
  const [isGameTransactionModalOpen, setIsGameTransactionModalOpen] = useState(false);
  // Casino Transactions
  const [isCasinoTransactionModalOpen, setIsCasinoTransactionModalOpen] = useState(false);
  // Bet Types
  const [isMatchResultModalOpen, setIsMatchResultModalOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const [isExcludedBetTypesModalOpen, setIsExcludedBetTypesModalOpen] = useState(false);
  // Event Statistics
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);

  // Limits
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  // Delay
  const [isDelayModalOpen, setIsDelayModalOpen] = useState(false);

  // Bonuses
  const [isBonusPrimeModalOpen, setIsBonusPrimeModalOpen] = useState(false);
  const [isBonusSystemNewModalOpen, setIsBonusSystemNewModalOpen] = useState(false);
  const [isBonusSystemEditModalOpen, setIsBonusSystemEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  // Rakes
  const [isSetRakeModalOpen, setIsSetRakeModalOpen] = useState(false);
  const [isCreateRakeModalOpen, setIsCreateRakeModalOpen] = useState(false);
  // Taxes
  const [isTaxesSettingsModalOpen, setIsTaxesSettingsModalOpen] = useState(false);
  // Slots
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  // Casino
  const [isCasinoEditModalOpen, setIsCasinoEditModalOpen] = useState(false);

  const openEditUserModal = () => {
    setIsEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setIsEditUserModalOpen(false);
  };

  const openTransferModal = () => {
    setIsTransferModalOpen(true);
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  const openNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const closeNewUserModal = () => {
    setIsNewUserModalOpen(false);
  };

  const openBlockUserModal = () => {
    setIsBlockUserModalOpen(true);
  };

  const closeBlockUserModal = () => {
    setIsBlockUserModalOpen(false);
  };

  const openLimitUserModal = () => {
    setIsLimitUserModalOpen(true);
  };

  const closeLimitUserModal = () => {
    setIsLimitUserModalOpen(false);
  };

  const openCouponModal = () => {
    setIsCouponModalOpen(true);
  };

  const closeCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  const openUserInfoModal = () => {
    setIsUserInfoModalOpen(true);
  };

  const closeUserInfoModal = () => {
    setIsUserInfoModalOpen(false);
  };

  const openTransferAmountModal = () => {
    setIsTransferAmountModalOpen(true);
  };

  const closeTransferAmountModal = () => {
    setIsTransferAmountModalOpen(false);
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  const openSearchCouponModal = () => {
    setIsSearchCouponModalOpen(true);
  };

  const closeSearchCouponModal = () => {
    setIsSearchCouponModalOpen(false);
  };

  const openDetailsModal = () => {
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const openDetailViewModal = () => {
    setIsDetailViewModalOpen(true);
  };

  const closeDetailViewModal = () => {
    setIsDetailViewModalOpen(false);
  };

  const openGameTransactionModal = () => {
    setIsGameTransactionModalOpen(true);
  };

  const closeGameTransactionModal = () => {
    setIsGameTransactionModalOpen(false);
  };

  const openCasinoTransactionModal = () => {
    setIsCasinoTransactionModalOpen(true);
  };

  const closeCasinoTransactionModal = () => {
    setIsCasinoTransactionModalOpen(false);
  };

  const openMatchResultModal = () => {
    setIsMatchResultModalOpen(true);
  };

  const closeMatchResultModal = () => {
    setIsMatchResultModalOpen(false);
  };

  const openTranslateModal = () => {
    setIsTranslateModalOpen(true);
  };

  const closeTranslateModal = () => {
    setIsTranslateModalOpen(false);
  };

  const openExcludedBetTypesModal = () => {
    setIsExcludedBetTypesModalOpen(true);
  };

  const closeExcludedBetTypesModal = () => {
    setIsExcludedBetTypesModalOpen(false);
  };

  const openStatisticsModal = () => {
    setIsStatisticsModalOpen(true);
  };

  const closeStatisticsModal = () => {
    setIsStatisticsModalOpen(false);
  };

  const openLimitModal = () => {
    setIsLimitModalOpen(true);
  };

  const closeLimitModal = () => {
    setIsLimitModalOpen(false);
  };

  const openDelayModal = () => {
    setIsDelayModalOpen(true);
  };

  const closeDelayModal = () => {
    setIsDelayModalOpen(false);
  };

  const openBonusPrimeModal = () => {
    setIsBonusPrimeModalOpen(true);
  };

  const closeBonusPrimeModal = () => {
    setIsBonusPrimeModalOpen(false);
  };

  const openBonusSystemNewModal = () => {
    setIsBonusSystemNewModalOpen(true);
  };

  const closeBonusSystemNewModal = () => {
    setIsBonusSystemNewModalOpen(false);
  };

  const openBonusSystemEditModal = () => {
    setIsBonusSystemEditModalOpen(true);
  };

  const closeBonusSystemEditModal = () => {
    setIsBonusSystemEditModalOpen(false);
  };

  const openAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const openSetRakeModal = () => {
    setIsSetRakeModalOpen(true);
  };

  const closeSetRakeModal = () => {
    setIsSetRakeModalOpen(false);
  };

  const openCreateRakeModal = () => {
    setIsCreateRakeModalOpen(true);
  };

  const closeCreateRakeModal = () => {
    setIsCreateRakeModalOpen(false);
  };

  const openTaxesSettingsModal = () => {
    setIsTaxesSettingsModalOpen(true);
  };

  const closeTaxesSettingsModal = () => {
    setIsTaxesSettingsModalOpen(false);
  };

  const openGameModal = () => {
    setIsGameModalOpen(true);
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
  };

  const openCasinoEditModal = () => {
    setIsCasinoEditModalOpen(true);
  };

  const closeCasinoEditModal = () => {
    setIsCasinoEditModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isEditUserModalOpen,
        openEditUserModal,
        closeEditUserModal,
        isTransferModalOpen,
        openTransferModal,
        closeTransferModal,
        isNewUserModalOpen,
        openNewUserModal,
        closeNewUserModal,
        isBlockUserModalOpen,
        openBlockUserModal,
        closeBlockUserModal,
        isLimitUserModalOpen,
        openLimitUserModal,
        closeLimitUserModal,
        isCouponModalOpen,
        openCouponModal,
        closeCouponModal,
        isUserInfoModalOpen,
        openUserInfoModal,
        closeUserInfoModal,
        isTransferAmountModalOpen,
        openTransferAmountModal,
        closeTransferAmountModal,
        isChangePasswordModalOpen,
        openChangePasswordModal,
        closeChangePasswordModal,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,
        isSearchCouponModalOpen,
        openSearchCouponModal,
        closeSearchCouponModal,
        isDetailsModalOpen,
        openDetailsModal,
        closeDetailsModal,
        isDetailViewModalOpen,
        openDetailViewModal,
        closeDetailViewModal,
        isGameTransactionModalOpen,
        openGameTransactionModal,
        closeGameTransactionModal,
        isCasinoTransactionModalOpen,
        openCasinoTransactionModal,
        closeCasinoTransactionModal,
        isMatchResultModalOpen,
        openMatchResultModal,
        closeMatchResultModal,
        isTranslateModalOpen,
        openTranslateModal,
        closeTranslateModal,
        isExcludedBetTypesModalOpen,
        openExcludedBetTypesModal,
        closeExcludedBetTypesModal,
        isStatisticsModalOpen,
        openStatisticsModal,
        closeStatisticsModal,
        isLimitModalOpen,
        openLimitModal,
        closeLimitModal,
        isDelayModalOpen,
        openDelayModal,
        closeDelayModal,
        isBonusPrimeModalOpen,
        openBonusPrimeModal,
        closeBonusPrimeModal,
        isBonusSystemNewModalOpen,
        openBonusSystemNewModal,
        closeBonusSystemNewModal,
        isBonusSystemEditModalOpen,
        openBonusSystemEditModal,
        closeBonusSystemEditModal,
        isAssignModalOpen,
        openAssignModal,
        closeAssignModal,
        isSetRakeModalOpen,
        openSetRakeModal,
        closeSetRakeModal,
        isCreateRakeModalOpen,
        openCreateRakeModal,
        closeCreateRakeModal,
        isTaxesSettingsModalOpen,
        openTaxesSettingsModal,
        closeTaxesSettingsModal,
        isGameModalOpen,
        openGameModal,
        closeGameModal,
        isCasinoEditModalOpen,
        openCasinoEditModal,
        closeCasinoEditModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
