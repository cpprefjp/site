# operator*=
* complex[meta header]
* std[meta namespace]
* complex[meta class]
* function[meta id-type]

```cpp
complex<T>& operator*=(const T& rhs);			// (1)

template <class X>
complex<T>& operator*=(const complex<X>& rhs);	// (2)
```

## 概要
複素数の乗算を行う


## 効果
- (1) スカラー値 `rhs` を `*this` に掛ける。
- (2) 複素数値 `rhs` を `*this` に掛ける。


## 戻り値
`*this`


## 備考
- (1) の形式の場合、引数の型は `const T&` なので、引数（演算子の右オペランド）の型が `T` ではない場合には暗黙の型変換が適用される。  
例えば、`T` が規格でサポートが明示されている `float`、`double`、`long double` の場合、各種の暗黙の標準変換が（縮小変換も含めて）効くため、`complex<float>` に `long double` を掛けるといったこともできる。
- (2) の形式の場合、`rhs` の型はクラステンプレートなので、引数そのものに暗黙の型変換が適用されることはない。  
しかし、（規格書内に明確な規定は無いが）`*this` に `rhs` を掛ける際には各コンポーネント間の演算となるため、やはり暗黙の型変換が適用されると考えて良いと思われる。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);
  std::complex<long double> d(2.0, 3.0);
  std::cout << "c = " << c << ", d = " << d << std::endl;
  c *= d;
  std::cout << "c = " << c << ", d = " << d << std::endl;
  c *= 7;
  std::cout << "c = " << c << ", d = " << d << std::endl;
}
```
* *=[color ff0000]

### 出力
```
c = (1,2), d = (2,3)
c = (-4,7), d = (2,3)
c = (-28,49), d = (2,3)
```


## 関連項目
| 名前                                  | 説明                                 |
|---------------------------------------|--------------------------------------|
| [`operator=`](op_assign.md)           | 代入する。                           |
| [`operator+=`](op_plus_assign.md)     | 複素数の加算を行う。                 |
| [`operator-=`](op_minus_assign.md)    | 複素数の減算を行う。                 |
| [`operator/=`](op_divide_assign.md)   | 複素数の除算を行う。                 |
| [`operator+`](../op_plus.md)          | 複素数の加算を行う。（非メンバ関数） |
| [`operator-`](../op_minus.md)         | 複素数の減算を行う。（非メンバ関数） |
| [`operator*`](../op_multiply.md)      | 複素数の乗算を行う。（非メンバ関数） |
| [`operator/`](../op_divide.md)        | 複素数の除算を行う。（非メンバ関数） |
