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
    inventory&.destroy
    render json: { message: 'Inventory removed!' }
  end

  private

  def inventory_params
    params.permit(:name, :image, :quantity, :description)
  end

  def inventory
    print 'test'
    @inventory ||= Inventory.find(params[:id])
  end
end
