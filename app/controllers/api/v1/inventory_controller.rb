class Api::V1::InventoryController < ApplicationController
  def index
    inventory = Inventory.all.order(created_at: :desc)
    render json: inventory
  end

  def create
    inventory = Inventory.create!(inventory_params)
    if inventory
      render json: inventory
    else
      render json: inventory.errors
    end
  end

  def show
    if inventory
      render json: inventory
    else
      render json: inventory.errors
    end
  end

  def destroy
    inventory.decrement! :available_quantity
    render json: { message: 'Available quantity lowered!' }
  end

  private

  def inventory_params
    params.permit(:name, :image, :initial_quantity, :description)
  end

  def inventory
    @inventory ||= Inventory.find(params[:id])
  end
end
