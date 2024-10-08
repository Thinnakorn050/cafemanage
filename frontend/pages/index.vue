<template>
    <div class="cafe-container">
      <h1 class="title">Welcome to Cafe Management</h1>
      <div class="menu">
        <MenuItem 
          v-for="item in menuItems" 
          :key="item.id" 
          :item="item" 
          @add="handleAddToOrder" 
          class="menu-item"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    components: {
      MenuItem: () => import('@/components/MenuItem.vue'),
    },
    data() {
      return {
        menuItems: [
          {
            id: 1,
            name: 'Latte',
            description: 'Smooth and creamy coffee with steamed milk.',
            price: 85,
            imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALYAwQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYCBwj/xABNEAABAwMCAwQECwMJBAsAAAACAAEDBAUREiETIjEGMkFRFEJhcQcVIzNSYnKBkaGxJFPBFjRVgpKT0dLhJUNz8URGVFZjhJSisuLj/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJBEBAQACAgICAgIDAAAAAAAAAAECEQMSQVETITFhFEIEInH/2gAMAwEAAhEDEQA/APDkqRKgFQhCSnbLplyy6ZBpEJ6O6reiryDTzKkZOCSzym143Tb0Vdr9ZWsM2v1lgKerIFeUNy+kSxywbTNqmMVyWlQ6Wfi+sprBrUdYrZok0TKZwEyUWhHU+yKUaYkFTzZMFERo6jsiMC4OBThAQXErigK4ovtJmSJTTTMmlMlXUUomqueg+jqWgkZR5I1pjlYzyx2zR05Am3jJXxwKJNTLSZs7gq9KFM9HJCe0aViVIhaIdISJUjdMumTeUrOgzwunBdRxdXFutE1QHELlH1fN0rFSogrsZCBaCC0whykQ6ks9kEw+QIdSnqfZX0d0kiV/Q3vX3lkqylkpz0kKZjqCBReOVc5LHptPXCacI9awdHeCD1iVtFevtLK4WNJnK0JuucqqCv1+suyrPrEl1qu0TCEk2USijW/aXEld9ZGqNw9IKiyiler+sostaP0iRJRbD/CUeYU0Vd9ZMnUEfrKtVO4dJkxI31UnpBLkpdaeqW450ChdZQmTMISoXS5SJUIQAlQnKcNcwikpa2O2+kHxp/mx7o+brTVEno8PL3i2H2Mo1GAxAMY90RTF7qdGn7KCRpa7R6yIrvIHrKhklKU9SRiSU15HDdoSEtPF9VZergKnmISS09TJEeoSU6vf0iEZvW6EkasE9CkwTFr7ycpLbJUd1XVN2fH1iRrYRQquTvJ+Kv8ArKVLYx0csiqau3VFPzer9JReNc5Fk1QmnPnVfDLo7ylREJrO42Ll2fcyTJavqpXZclqTkFriR/spsZCTpMuHjVaTtw8iOIuXFNk6NDZ/i/VQo+pCWjUaVIhdDmCEqEAKXa2/b4ftKIpNAeishL6zJG18XrKkvsnOX3K5p3+cVDe/niQarSsucpWdAdsrWnmj9GEZS7qqF2zpKWz3cog003KP5pprxWfvCVcjCA0dBepDD5fm/VWcVUMvKXNGSyNJ31d2zVoL6pIIxeKb0c9UXdLcVAhqSD1lf3iPXQCSyhPzpWHKt46jWpcbqiim0KZHWKLFyrCU9CbaRRePrXYmpUckJMulddNGmRnCE9oQjYZ5CV0i3c5UIQgBKzpEJG11vm4oRyfvB/NQb3Fz6lHsdT3qcveHv8WVvXRekU2oe9/FBsm7ITko6DTeUAqXK5ylQbrUlykjjI+UVeW2ylLzS91LQ2jWynI+bSr6kg4QafWJP8KGkD1RVXXXmMOWDmL6SBt1f6oQhGEf6yzLknJ5ylPURJpAGV0xLlJlMJASKRHKq9iTgyKbDlWgGnmNVYTJ4KhTcVTJY6kKDxkKdK2qEIQt2AQhCAEIQyA6jMgMSHvDutVbKyOrD7WxD5Oson6aokpZuJEX3efsSCzvlAUR8Qe6SpnZba1H8cU3DGmmIunLGRfg7Nuqy5djr5FN+zWa4zRl3SClMv0ZBxm8KbbaCSumGONTx7H9pv6Auf8A6U/8Fex2G+Wq0ao7JcfSZNsNSm7g3twyNhEKK22kPly1SfRHd1Bqu0kh8tNGMY/moVTaLwBkVTba4S6kUlObfqyrzAoj0yAQv5E2H/B0Efnraio+dkJMOkZCDCEJUAmUi6SYQCIZCEAZXbEuEZQDvEQmsoS0e3KFNjtlQfdjL8FYwWaQA+UiLV7lGXLjFY8WVULJXZaErYMQcQhIRHctS0nZu12OnhGsvdvKo1d0Z5uGDN7Gbd3U/PDvFY89CIjVx2V7OVfaW9QWykIIzly7mewiLbu/t9y9Thb4O7mHo8lpipy/eUcxMTe3D4d/wdYWlqY7P2h1UPFKKOUuERO4k474d3bGHx5I+X0Pjnl65Y/ga7L22MSuQzXOfZ3KU3CPPsEXbb3u608NnsdqD/Z9pt9P9aOnFn+98ZdeWRfCTfAMYakoqgPVIm0lj3tjP4J+o+EkqumGnlgqKQhJn4tNIJO+PNiHHk/3LG8mVaY8cjfXC9yU+oYpNP2dlRS9pyPUM9TpH6WrCwFTc464CEr3cObGrixC/T2i7bexQmtI1AEI9oR5sP8AKDK3TPlnzUzKquOLcS3Dn/nYkP8Axf8AVLVXPWEemceUf3n+qwo9j5pT1De6QvrEUzP/APBSY+wdwPTw73Q/3k3+RWitT8a1AfNVMv8AVkf+CYnv9UHLJIUg/RNmJvwdVMHwb3D/ALxUo/ZGUv1ZlaU3wZ1X+87VHj6IUWr9ZGVdaW4qKy4Wmo1enWK3Tau8QwNET/1gw+fblV49n+y95mGGkkq7RVyEwhqfjwO7vhmfOCbPnl/cvRaD4MrOBiVTcrnUfVyEYv8Adh3/ADWxsnZWxWkhmordFxh3aWV3kNn82d+n3YTnaeU3T5YvlqqrFd6m114sNTTHoPD5Z9ss7e9sO3vUDK1Pwonxe398LvftGPwZmWWwuhkMoRhGEGEIQgBIhCAEIQg3twUEfqxjq9yPQef5r8lseDHoHlHT7kxLTxhyrxNPXjBXW2Ec1HHIOmOSdmL3Mzv/AAT9ZY+LMXH5fAR8mbwWg7QUpBRjMPMVOYy/c2z/AJO/4JCqqe4HMUBDqEmch9++fd1Wn9fpnZ/v9su3Z+EObSo9daSqJhmERLT3+Zmf34zl/BaiURDlUeOjqKg/2amlkHfmEXfw808crsssJr7YquiEJhIe8It+O7KuKLnJW1ZGQVMwkJCQ+qWyaCET+0uiVzVCCJT6QE8FKpENPoRstLCibuq+o1U0YK8pBVypq0plZ07qvphVlCy0lRYnQErOE+RVMbqQUxcEhi5pCHAj7fBMo+Ye1k3pfaq8VH7ytm0+5idm/JmVW0ZLdXDsNdrZxKi5UnKRORHqEmy7580lBaYZdUYiPEjLBDjfPks8ubTbHhtjFNAX0UhQl9FegnYuTuqJNYJPo/kon+Qq/wCPWFKP6q5eNbGWxF+6/JRJbN/4a0nPEXgrL8NJw1oDtOj1UjWgvoqvmifhqg4aFofiR/3ToR8+I+HJ7k8pAfNqIeg7f4vt0QU+sNWnmUS2XWhudNxKScCEh9zt7MPv4spgxd4h1cy8u7ejNG5dRgIkPq+9ZG+dnrx2emG8UkZFRl3tPNwm8ib6Pk/h7PGf2zuVdaYaOSh1aildiIW1O2G2bHhn+CetfbW6UOkbzTHwy21EO3uf/Bb8WP1usebP71PC97HXrs1dgjERCG4eMVS7O7v9R32dvdv7FvIYB0fR9gtheXVnZ7sv2jD0i3zjbqkty4WHjd/aD9PuwmI6HttYeW23QK2mHuhxRPb3Hu3uZ10Y6nhy5dqqO39tKi7U1EfqyCxh7Wf/AJKqpqYTVp2huF6vBwyXmkCGWnEmEghICdnw+Hy7s+MeHm6i0JCf2kaLZ0aH6KeipVYU8altTpaPaPSUn2Vb09NoUQfku6pUdToD6yD2soYxD1lIY4w7qqHr/pKBVX2GLVzCqlTppiqhBZHtl2wktkMI0M0Uc5Hjin3QZmd8vs+fcs5fO28MXLEWoi26rEHVVl4uUfBqRKcjdhIj0+5mz7vzWn5gk1V5TXiO5VIzVVfLNWa3aU5c6Tbpttlm8fZ5KxuIzxTU9RbaRpIJBcZRKbQUcrY1MT9Hd8s7OzczO23nmLtaLhb60Km5RhI2rBcDIvq8MthnZ388b+au7RU3ELoE1kjKaOQWGopags6CbLNjOXZ2Ztnxt03Z8KLhi3xyy0U7xeLfdJA+LpilkiDVGGT0M+Xbwxl/4K8s3aUrgfDKm+cFmiI9Ii5O+WZ3Z3YdsYz1VFW1l5pLpLR3AzjqdYzgcpiUjuzOw5cXwzM+fLw2ZTbj2bp/Tqoo7mccEgA5RRGzMJOzO7PnPnnDe3LsyjLHHz9LxuXj7X1JVTVdf6D6DTFJoeTTxtLsDeL5bH5+Xmu7c9DcAk48BUukW08Uh38H6O+MbdVhbmIw11Kdru00lTh4T4UbOwA7fVwz5zu2/vRaqOSspqwbPdTjusRk8sEgiDzizvko365bxbOds+6Zwyz6p3k1fuPSviq3nNwfkilHbTnL5/5J17RTh3Yw/wBF5hbe0d1tUQjSCFVVaCi1FGWuJ36v5O+Mb+5PUVff7f6NHBcamAZsC8VQ7FoHxJnz0yz9GboleCzyU5JfD0j4ri+r+CFmf5RXT+nKX+0H+KFn8N9q7RUTWustNZHJbyIdW+n1XbOMbbP0zhPVPbS7RQ8GmERLVgiJumPY6yjX2b5MtRcpNy56M2HbH35/FLVXSOo4hetITP0W3xX+0ZfJP61YVPaq7VcJQ1xBIJFnmHS7O3izsrC29sOEHo90gGaItiIert7W8VmmOOohES06i9bOMfemHp+9wyIuXOktn/FXMZP0ztta6Y6cz4lmqyIC9Qn0mHsw/X7ktLeJKGsEq4qghH1Cd239zrESNUU5+sP6KbSX2qh5SLUH0S6fg+yfx+k9m+l7dEH82pv7ZfwZVdXepqsxuEhAMhFpMRbTjHTPnnzVPBe6E/5zQxfaEdP6OytIa+zyhpIZRH6Ilt+bKLNHq1fW676wHV/7VfU9yhNZGmisPq1dVD9lhdvwyzKyhp7WfdvtQP2qUS/Q0dp7HTL00UlZD3uVUFyv8dOeke99EUp0FCf/AFkIf/I//oq4+ylnlqeNU9pjkH936A38ZETLHzR0y9IVz7SVUR8MRLUQ8vm/4rO3a41nBjkqdQ8T1CEh26s+XbD/AHLYTdl+yspiVTf7iWnYWCGMWx7Mu6kx0fYanh4dRPd67Thx4tSzaMeWlmwyvvxzycwyZyy9oBKgp6MaaYo43dqgnhEwjd9mdnZmds+1336Lm5U1vv8AWcSD0mOpGLQOiEIxMmd8O+XZ3d8s2Wy+zdVrAuvYui1ejWAJiItZFUznJrJujuzvh338lGm+EWsp5ip+z9koqAiF31RUzC+ze5so77u8T1qayM09n7S3C22z4gtNwGeNyaoOtyLM3RuaR22bd+X+CgXXsg1niOa99rqKK5yFq9GoxKeUn6NuLtv933qJ2jvna+rlh+Mq2pKnmEdIxSPoLLM+OV2ds+T4VfVW16KCOt+LopHIX72p3zjq4k5M7e1n/BaY3GIvbL807U9oioqz0izxsFHGwxPTzk7yk+HyZv11O+cuz7bD0Zk21FdL9XjWWuxhr05MNiaR8u7k7Phnd/HDfqmK+rmuEMWmigp5Rd8y6BbLM3Rnxs7P0wp1qg7TWqmqLlb54iihByn4U4uQD4u4u+fwR/z8n+ruwhNLSkTXumgp+HzvTBppzfGdnFx3bwx456smg9GqKuGOB2lerDWUdPTxi0TZfZtRZHG7s+R8H8VHkrq+Voa+O7HlycdMupuFl85bOWds+Lbttsys79XVlRDDNXdoaOslpxfhRMOpzzjZ9OWxt4vhLWlb2lFeqP4qko6YRGugMXGQ20S4Z92Y2N2LbHXwymC7QzBX1FUcdLFOEXCqKOSm+dBur46ZZt933bxVVcp4brLDV8Cht7gGk4qMWd5Mb50ths/fldUdq41RUVJTQV0UIEXzjx5AW2fDsz5xth/zR1xh9sqk/GFg/dU39yf+KEvott/ohv71/wDMhHfH2XS+jRdgL5EfLExD01C6U/g/vYHpjECHrqzp/J16PSXWM9MYz6tQ8urwfO7P7NlOCu1/NEPD051Zzu3Vly/yeRr/AB8HjlV2ZvVJ8/RSjp9br+GFDYaqI/2mCUdW3ddui91iuUYcOQi+Tk2ES2fb+ClzUtHUf9Eik1bjqFt38s46o/k3zC+D1XhA1Ah84JyAXeA22Z3SaKOo4haQ5RZx05+9mXtc9ks9XylSCQ6c8u33beKhD2LsZhIIxlGUg45X67+DexOc8F4a8deghM9Mchat+Um8fDp7EzU0UlLp0k+khyJfqvWJ/gztNQeqmq6iFx3bTgvDrl85VdN8GVT/ALm9x6eo64X8NvB1pOae0Xivp5vGVR6sh8qkjNWAeniH+C18nwcXwNJQVNHIWnm5ybx26t0wuZuwPaYDEhKm1f8AF6497IueN9CYZT2ywTXI9WkjLTuXL4easaWhrqsB1VOnV3SJ9vPCuv5G9pjPmgDm21cVmw/g7+xP0vYftAAEPEijkHcdUrOLuz+bbt4rO5Txpcl/bPDbBA9NTVuWruaH2d/L2Or+mtVlpODNVkMmrDjqkfds4dnxtlnxtjonYPg3vhmXFr6SPl1crkTs/ux0UuL4Na6WHh1N2p+bD8sRFj2tuyVs9qk/RKW62EOJDU22iIxzoIRyJsz9HZ84f3eXhlPXntFbYQ/2RSQxkXymrSzN4bOzs+fLfzXVP8F0NPqkq7s8kZC7csOND9cs+X2Ugfg0t580tyqPFx0izNu3typ/19n9+lePwgiFMOkYhkEtWkujtpdnHdumXy2/s3SS3iS5hS1hDTyREOmWCKYdPTd2DLuLv5tts3irUPg27NgZDJPVSaR7pSMLP4s7uzbK3oOzvZ23gMfoh8Iccsh6mBurP12Z38fFO3DX0JMvLI1VdZQhh02mnmnjJ+OJC2XFmdnbD9HdsPs3gptTdLPFQctriqIIy+SEeZ2jfqLs2c4z4+9bUKa0gAjFSQ6fV5cuw9Mtv0XYhb4tRRUkMZDhtWkWZRtUkeWV9wtdQElH6IFPbyw4DA2lt3y+M+/8nSQ0nZahPgT2+WqkIGccyEzt49M4f/ReqekUJmQ+iU48rcUjEWx0w75bdt+qaqKm3xcMZ6Slk+qMYlhsZZ2ZvB991Xe+E9Y87pLp2ZqIY4amzRaRyOnL5BmfLPlnzjfpnH5rqputloof2O3xR6Tcg4spTCbbbNl3dtujt08lvxCw1Z8SW30vEE9Okohyz9cZ6YUaS2dl63URWuk06vJhwXR9m6P+SWzYz+VVm/dn/ab/ACoWx/kp2X/oiD+z/wDZCN4jVeR09ZIzgzFzGez46O23n0UuGskkNhbliifUzDs+ejt7kiFdkZS1ZWyvqaowEiYsE7x6/VbyWletkpuLSxket8TNJno2OmEIWWX5az8OvTZJpGaI3Fji1Nyt3m8XRTXeWoEW5o5Jc7i+WF28WyhClUWMNRLJpFmYdTOQ6XdsE3V/c/knHrpJ+GTYjMgcxwLbE3Xfrh/JCEB3BWSaomj5Xli4g/Vduv3P5Lp6wmCKYRwMoa3HPR+mOnT2JEIM4VWUQEQd3h8SPOct44ffdlWRVkw1TVYGeiaLuObvpfPh7PYhCIKkvctcgmGsdRaB6PoLzb2exKVdJHFJJHgSjyJuIs2p/NvJ0ITJCivNU0gZLkMuEwYyzH1z7n8WURrjNVyO2oopIndmcHfAlvuzZ3b3oQmVpi4XisGTiamyXq9WwPVvc/koM3aKdwk1jq4Yt7MxP6roQnJE2imvFQR8EdOuMXKLLbY3bD+LpuKvq2GnieYuIJFpMdtuuH82QhPyTupvFRAxNUCMwyg/sfQ/VnfHm+VXyXWemqBGNmzCzCGOXlLbDu2+yEKpE2uWutXTyC8s5yNw+6XM23TqmJbnVaZWkkIgPct93fPX3oQnobL8cV//AGk0IQjUG6//2Q==', // ลิงค์ภาพจริงสำหรับ Latte
          },
        ],
        order: [],
      };
    },
    methods: {
      handleAddToOrder(item) {
        this.order.push(item);
        console.log('Item added to order:', item);
      },
    },
  };
  </script>
  
  <style scoped>
  .cafe-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #333;
    font-family: 'Arial', sans-serif;
  }
  
  .menu {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .menu-item {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .menu-item:hover {
    transform: translateY(-5px);
  }
  
  .menu-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .menu-item h2 {
    font-size: 1.5rem;
    margin: 15px;
    text-align: center;
  }
  
  .menu-item p {
    font-size: 0.9rem;
    margin: 0 15px 15px;
    text-align: center;
  }
  
  .menu-item .price {
    font-size: 1.2rem;
    color: #e74c3c;
    text-align: center;
    margin: 0 15px 15px;
  }
  
  .menu-item button {
    margin: 0 15px 15px;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .menu-item button:hover {
    background-color: #2980b9;
  }
  </style>
  