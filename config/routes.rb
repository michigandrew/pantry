Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'inventory/index'
      post 'inventory/create'
      get '/item/:id', to: 'inventory#show'
      delete '/destroy/:id', to:'inventory#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
