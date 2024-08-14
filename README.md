# Bitnomial Interview Frontend Code Challenge - Price Ladder Application

This project is a frontend application designed for Bitnomial, showcasing a basic implementation of a price ladder with an order submission component. sThe application provides a central limit order book display, allowing users to view market depth and submit buy and sell orders.

## Prerequisites

- **Node.js**: Ensure you have Node.js 20.11.1 installed on your machine.
- **npm or yarn**: The project uses yarn for dependency management. Ensure npm or yarn is installed

## Installation

1.  **Install Dependencies**
    ```bash
    yarn install
    ```
2.  **Start the application**
    ```bash
    yarn dev
    ```
3.  **Open the application**

    Open your browser and navigate to `http://localhost:3000`.

## Project Overview

  - **Price Ladder Display**: A vertical list showing price levels with bids on the left in green and asks on the right in red. Highlights the midpoint price between the best bid and ask, or a reference price if no orders are present.
  - **Order Submission**: Users can submit buy and sell orders with specified quantities at any visible price level through an intuitive order entry form.
  - **Data Management**: Uses a mock data structure for the order book. Updates the order book in real-time as new orders are placed.
  - **State management**: Utilizes React hooks to manage the state of the order book and the price ladder.

## Bonus Options Implemented

  - **Dynamic Scrolling**: Implemented dynamic scrolling using `react-window` to efficiently render a large number of price levels while maintaining smooth performance.
  - **Price Level Compression**: A checkbox to switch between showing all price levels and only those with existing orders.
  - **Keyboard Shortcuts**: Implemented shortcuts using `react-hotkeys-hook` for quick order placement(`Ctrl + B` for bid, `Ctrl + A` for ask).

## How It Works

1. **Order Form**: A form where users can choose the order side (bid or ask), set the price within a defined range, and input the quantity. The form validates inputs and highlights errors for user guidance.

2. **Price Ladder**: Displays the aggregate volume of orders at each price level. Users can view bid and ask volumes for each level, with the midpoint price distinctly highlighted.

3. **Dynamic Interaction**: The price ladder and order book update dynamically as new orders are submitted, ensuring real-time feedback and accurate market depth representation.

## Conclusion

This project demonstrates a foundational understanding of creating a frontend application for a derivatives exchange. The solution is designed to be extendable, focusing on simplicity, clarity, and efficiency, aligning with Bitnomial's expectations for a clean, effective trading tool.

