# operator<=>
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T1, class D1, class T2, class D2>
    requires three_way_comparable_with<
               typename unique_ptr<T1, D1>::pointer,
               typename unique_ptr<T2, D2>::pointer>
  compare_three_way_result_t<
    typename unique_ptr<T1, D1>::pointer,
    typename unique_ptr<T2, D2>::pointer>
  operator<=>(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y); // (1) C++20

  template <class T, class D>
    requires three_way_comparable_with<typename unique_ptr<T, D>::pointer>
  compare_three_way_result_t<typename unique_ptr<T, D>::pointer>
  operator<=>(const unique_ptr<T, D>& x, nullptr_t);                     // (2) C++20

  template <class T, class D>
    requires three_way_comparable_with<typename unique_ptr<T, D>::pointer>
  constexpr compare_three_way_result_t<typename unique_ptr<T, D>::pointer>
  operator<=>(const unique_ptr<T, D>& x, nullptr_t);                     // (2) C++23
}
```

## 概要
`unique_ptr`オブジェクトの三方比較を行う。


## テンプレートパラメータ制約

- (1) : 型`unique_ptr<T1, D1>::pointer`と型`unique_ptr<T2, D2>::pointer`が三方比較可能であること
- (2) : 型`unique_ptr<T, D>::pointer`同士が三方比較可能であること


## 戻り値
- (1) :
    ```cpp
    return compare_three_way()(x.get(), y.get());
    ```
    * compare_three_way[link /reference/compare/compare_three_way.md]
    * get()[link get.md]

- (2) :
    ```cpp
    return compare_three_way()(x.get(), static_cast<typename unique_ptr<T, D>::pointer>(nullptr));
    ```
    * compare_three_way[link /reference/compare/compare_three_way.md]
    * get()[link get.md]


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p1(new int(3));
  if ((p1 <=> p1) == 0) {
    std::cout << "equal" << std::endl;
  }

  std::unique_ptr<int> p2;
  if ((p2 <=> nullptr) == 0) {
    std::cout << "p2 is nullptr" << std::endl;
  }

  if ((nullptr <=> p2) == 0) {
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
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [LWG3426 `operator<=>(const unique_ptr<T, D>&, nullptr_t)` can't get no satisfaction](https://cplusplus.github.io/LWG/issue3426)
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
