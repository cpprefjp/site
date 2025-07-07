# operator<=>
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  strong_ordering
    operator<=>(const shared_ptr<T>& a,
                const shared_ptr<U>& b) noexcept; // (1) C++20

  template <class T>
  strong_ordering
    operator<=>(const shared_ptr<T>& x,
                nullptr_t) noexcept;              // (2) C++20
}
```

## 概要
`shared_ptr`オブジェクトの三方比較を行う。


## 戻り値
- (1) :
    ```cpp
    return compare_three_way()(a.get(), b.get());
    ```
    * compare_three_way[link /reference/compare/compare_three_way.md]
    * get()[link get.md]

- (2) :
    ```cpp
    return compare_three_way()(a.get(), nullptr);
    ```
    * compare_three_way[link /reference/compare/compare_three_way.md]
    * get()[link get.md]


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p1(new int(3));
  std::shared_ptr<int> p2 = p1;
  if ((p1 <=> p2) == 0) {
    std::cout << "equal" << std::endl;
  }

  std::shared_ptr<int> p3;
  if ((p3 <=> nullptr) == 0) {
    std::cout << "p3 is nullptr" << std::endl;
  }

  if ((nullptr <=> p3) == 0) {
    std::cout << "p3 is nullptr" << std::endl;
  }
}
```

### 出力
```
equal
p3 is nullptr
p3 is nullptr
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
