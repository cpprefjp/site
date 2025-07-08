# operator==
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T1, class D1, class T2, class D2>
  bool operator==(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& b); // (1) C++11
  template <class T1, class D1, class T2, class D2>
  constexpr bool operator==(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& b); // (1) C++23

  template <class T, class D>
  bool operator==(const unique_ptr<T, D>& x, nullptr_t) noexcept;            // (2) C++11
  template <class T, class D>
  constexpr bool operator==(const unique_ptr<T, D>& x, nullptr_t) noexcept;  // (2) C++23

  // (2)により以下のオーバーロードが使用可能 (C++20)
  template <class T, class D>
  bool operator==(nullptr_t, const unique_ptr<T, D>& x) noexcept;            // (3) C++11
  template <class T, class D>
  constexpr bool operator==(nullptr_t, const unique_ptr<T, D>& x) noexcept;  // (3) C++23
}
```

## 概要
等値比較。


## 戻り値
- (1) : `a.`[`get()`](get.md) `==` `b.`[`get()`](get.md)
- (2), (3) : `!x`


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p1(new int(3));
  if (p1 == p1) {
    std::cout << "equal" << std::endl;
  }

  std::unique_ptr<int> p2;
  if (p2 == nullptr) {
    std::cout << "p2 is nullptr" << std::endl;
  }

  if (nullptr == p2) {
    std::cout << "p2 is nullptr" << std::endl;
  }
}
```

### 出力
```
equal
p2 is nullptr
p2 is nullptr
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 (`nullptr`バージョン以外) [mark verified], 4.6.4 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2012までは`nullptr`バージョンがない。


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
