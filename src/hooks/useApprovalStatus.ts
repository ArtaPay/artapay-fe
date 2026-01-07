import { useState, useEffect } from "react";
import { createPublicClient, http, type Address } from "viem";
import { LISK_SEPOLIA } from "@/config/chains";
import { ERC20_ABI } from "@/config/abi";
import { TOKENS, PAYMASTER_ADDRESS } from "@/config/constants";

const publicClient = createPublicClient({
  chain: LISK_SEPOLIA,
  transport: http(LISK_SEPOLIA.rpcUrls.default.http[0]),
});

export function useApprovalStatus(smartAccountAddress: Address | null) {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [ethBalance, setEthBalance] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const checkApproval = async () => {
      if (!smartAccountAddress) {
        setIsApproved(null);
        return;
      }

      setIsChecking(true);
      try {
        // Check if all tokens are approved to Paymaster
        const approvalChecks = await Promise.all(
          TOKENS.map(async (token) => {
            try {
              const allowance = await publicClient.readContract({
                address: token.address as Address,
                abi: ERC20_ABI,
                functionName: "allowance",
                args: [smartAccountAddress, PAYMASTER_ADDRESS],
              });
              return (allowance as bigint) > BigInt(0);
            } catch {
              return false;
            }
          })
        );

        // Check ETH balance
        const balance = await publicClient.getBalance({
          address: smartAccountAddress,
        });
        setEthBalance(balance);

        const hasAllApprovals = approvalChecks.every((approved) => approved);
        setIsApproved(hasAllApprovals);
      } catch (err) {
        console.error("Failed to check approval status:", err);
        setIsApproved(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkApproval();
  }, [smartAccountAddress]);

  return { isApproved, isChecking, ethBalance };
}
