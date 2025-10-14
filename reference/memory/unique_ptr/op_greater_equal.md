# operator>=
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T1, class D1, class T2, class D2>
  bool
    operator>=(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& b); // (1) C++11
  template <class T1, class D1, class T2, class D2>
  constexpr bool
    operator>=(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& b); // (1) C++26

  template <class T, class D>
  bool
    operator>=(const unique_ptr<T, D>& x, nullptr_t);                     // (2) C++11
  template <class T, class D>
  constexpr bool
    operator>=(const unique_ptr<T, D>& x, nullptr_t);                     // (2) C++26

  template <class T, class D>
  bool
    operator>=(nullptr_t, const unique_ptr<T, D>& x);                     // (3) C++11
  template <class T, class D>
  constexpr bool
    operator>=(nullptr_t, const unique_ptr<T, D>& x);                     // (3) C++23
}
```

## 概要
`unique_ptr`において、左辺が右辺以上かを判定する。

比較対象は、`unique_ptr`が指す値ではなく、`unique_ptr`が保持するポインタ値。


## 戻り値
- (1) : `!(a < b)`
- (2) : `!(x < nullptr)`
- (3) : `!(nullptr < x)`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::cout << std::boolalpha;

  std::unique_ptr<int> p1(new int(3));
  std::unique_ptr<int> p2(new int(3));

  bool r1 = p1 >= p2;
  std::cout << r1 << std::endl;

  bool r2 = p1 >= nullptr;
  std::cout << r2 << std::endl;

  bool r3 = nullptr >= p1;
  std::cout << r3 << std::endl;
}
```

### 出力例
```
false
true
false
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 (`nullptr`バージョン以外) [mark verified], 4.7.4 [mark verified]
- [Clang](/implementation.md#clang): 3.0 (`nullptr`バージョン以外) [mark verified], 3.3 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2012までは`nullptr`バージョンがない。


## 参照
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)