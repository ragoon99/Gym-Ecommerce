from django.urls import include, path

from rest_framework import routers
from .views import (
    EquipmentViewSet,
    OrderHistoryViewSet,
    PaymentAPIView,
    SalesViewSet,
    SupplierViewSet,
    PurchaseLogViewSet,
    DiscountViewSet,
    TransactionLogViewSet,
    OfflineSalesLogViewSet,
    verify_payment,
    purchase_history,
)

router = routers.DefaultRouter()

router.register(r"equipment", EquipmentViewSet, basename="equipment")
router.register(r"supplier", SupplierViewSet, basename="supplier")
router.register(r"purchaselog", PurchaseLogViewSet, basename="purchaselog")
router.register(r"discount", DiscountViewSet, basename="discount")
router.register(r"transactionlog", TransactionLogViewSet, basename="transactionlog")
router.register(r"offlinesaleslog", OfflineSalesLogViewSet, basename="offlinesaleslog")
router.register(r"orderhistory", OrderHistoryViewSet, basename="orderhistory")
router.register(r"sales", SalesViewSet, basename="sales")

urlpatterns = [
    path("payment/", PaymentAPIView.as_view(), name="payment"),
    path("verify-payment/", verify_payment, name="verify_payment"),
    
    path("purchase-history/", purchase_history, name="purchase_history")
]

urlpatterns += router.urls
