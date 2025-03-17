import { ethers } from 'ethers'
import api from './api'

export const blockchainService = {
  // Connect to wallet
  async connectWallet(): Promise<string | null> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Metamask is not installed')
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const address = accounts[0]
      
      // Register wallet with backend
      await api.post('/blockchain/connect-wallet', { walletAddress: address })
      
      return address
    } catch (error) {
      console.error('Error connecting wallet:', error)
      return null
    }
  },

  // Get current wallet
  async getCurrentWallet(): Promise<string | null> {
    try {
      if (typeof window.ethereum === 'undefined') {
        return null
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      
      if (accounts.length === 0) {
        return null
      }

      return accounts[0]
    } catch (error) {
      console.error('Error getting current wallet:', error)
      return null
    }
  },

  // Sign message for verification
  async signMessage(message: string): Promise<string | null> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Metamask is not installed')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const signature = await signer.signMessage(message)
      
      return signature
    } catch (error) {
      console.error('Error signing message:', error)
      return null
    }
  },

  // Make payment
  async makePayment(
    recipientAddress: string, 
    amount: string, 
    currency: string = 'ETH'
  ): Promise<{ txHash: string } | null> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Metamask is not installed')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      // For ETH payments
      if (currency === 'ETH') {
        const tx = await signer.sendTransaction({
          to: recipientAddress,
          value: ethers.parseEther(amount)
        })
        
        return { txHash: tx.hash }
      } 
      // For ERC20 token payments
      else {
        // This would require the token contract address and ABI
        // Implementation would depend on the specific token
        throw new Error('Token payments not implemented yet')
      }
    } catch (error) {
      console.error('Error making payment:', error)
      return null
    }
  },

  // Verify transaction
  async verifyTransaction(txHash: string): Promise<boolean> {
    try {
      const response = await api.post('/blockchain/verify-transaction', { txHash })
      return response.data.verified
    } catch (error) {
      console.error('Error verifying transaction:', error)
      return false
    }
  }
}

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      isMetaMask?: boolean
    }
  }
} 