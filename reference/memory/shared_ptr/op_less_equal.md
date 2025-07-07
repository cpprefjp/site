# operator<=
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, class U>
  bool operator<=(const shared_ptr<T>& a,
                  const shared_ptr<U>& b) noexcept; // (1) C++11

  template <class T>
  bool operator<=(const shared_ptr<T>& x,
                  nullptr_t) noexcept;              // (2) C++11

  template <class T>
  bool operator<=(nullptr_t,
                  const shared_ptr<T>& x) noexcept; // (3) C++11
}
```

## 概要
`shared_ptr`において、左辺が右辺以下かを判定する。

比較対象は、`shared_ptr`が指す値ではなく、`shared_ptr`が保持するポインタ値。これは「値ベース(value-based)な比較」と呼ばれる。「所有権ベース(ownership-based)な比較」は、[`owner_before()`](owner_before.md)を参照。


## 戻り値
- (1) : `!(b < a)`
- (2) : `!(nullptr < x)`
- (3) : `!(x < nullptr)`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::cout << std::boolalpha;

  std::shared_ptr<int> p1(new int(3));
  std::shared_ptr<int> p2(new int(3));

  bool r1 = p1 <= p2;
  std::cout << r1 << std::endl;

  bool r2 = p1 <= nullptr;
  std::cout << r2 << std::endl;

  bool r3 = nullptr <= p1;
  std::cout << r3 << std::endl;
}
```

### 出力例
```
false
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 (`nullptr`バージョン以外) [mark verified], 4.7.4 [mark verified]
- [Clang](/implementation.md#clang): 3.0 (`nullptr`バージョン以外) [mark verified], 3.3 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2012までは`nullptr`バージョンがない。


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
