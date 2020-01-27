# operator==
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T1, class D1, class T2, class D2>
  bool operator==(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& b); // (1)

  template <class T, class D>
  bool operator==(const unique_ptr<T, D>& x, nullptr_t) noexcept;            // (2)

  template <class T, class D>
  bool operator==(nullptr_t, const unique_ptr<T, D>& x) noexcept;            // (3)
}
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]

## 概要
�値比較。


## 戻り値
- (1) : `a.`[`get()`](get.md) `==` `b.`[`get()`](get.md)
- (2), (3) : `!x`


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
- [GCC](/implementation.md#gcc): 4.4.7 (`nullptr`バージョン以外), 4.6.4
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
	- 2012までは`nullptr`バージョンがない。
