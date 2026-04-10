'use client';

import { useCart } from '../../context/CartContext';
import { useCartLogic } from '../../hooks/useCartLogic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// Imagem de fallback
const FALLBACK_IMAGE = 'https://placehold.co/100x100?text=Sem+Imagem';

function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { shipping, setShipping, promoCode, setPromoCode, calculateTotal } = useCartLogic();
  
  const { subtotal, total } = calculateTotal(cart);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.onerror = null;
  };

  return (
    <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-8 flex items-center">
          <FontAwesomeIcon icon={faShoppingBag} className="mr-3 text-success" />
          Seu Carrinho
        </h2>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h4 className="text-2xl text-gray-500 font-medium mb-4">Seu carrinho está vazio</h4>
            <p className="text-gray-400 mb-8">Adicione alguns produtos deliciosos para começar!</p>
            <Link href="/" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 no-underline">
              Voltar para a Loja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de Itens */}
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.name} className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center transition-shadow hover:shadow-md">
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-0">
                      <img 
                        src={item.img || FALLBACK_IMAGE} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    
                    <div className="flex-1 sm:ml-6 text-center sm:text-left mb-4 sm:mb-0">
                      <h5 className="text-lg font-bold text-dark mb-1">{item.name}</h5>
                      <p className="text-gray-500">R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors focus:outline-none"
                        >
                          <FontAwesomeIcon icon={faMinus} size="xs" />
                        </button>
                        <span className="mx-3 font-bold text-dark w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors focus:outline-none"
                        >
                          <FontAwesomeIcon icon={faPlus} size="xs" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="w-10 h-10 flex items-center justify-center text-error hover:bg-red-50 rounded-full transition-colors focus:outline-none"
                        title="Remover item"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-6">
                 <button 
                   onClick={clearCart} 
                   className="text-error border border-error px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-bold focus:outline-none"
                 >
                   Limpar Carrinho
                 </button>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h5 className="text-xl font-bold text-dark mb-6 border-b pb-4">Resumo do Pedido</h5>
                
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">FRETE</label>
                  <div className="relative">
                    <select 
                      value={shipping} 
                      onChange={(e) => setShipping(Number(e.target.value))}
                      className="block w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-primary transition-colors"
                    >
                      <option value="5">Padrão - R$ 5,00</option>
                      <option value="10">Expresso - R$ 10,00</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">CÓDIGO PROMOCIONAL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Digite o código"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-colors"
                    />
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none">
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="font-medium">R$ {shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-100">
                    <span className="text-xl font-bold text-dark">Total</span>
                    <span className="text-2xl font-bold text-success">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-success hover:bg-green-600 text-white font-bold py-4 rounded-xl mt-8 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
