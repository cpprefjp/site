# operator!=
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T1, class D1, class T2, class D2>
  bool operator!=(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& b); // (1)

  template <class T, class D>
  bool operator!=(const unique_ptr<T, D>& x, nullptr_t) noexcept;            // (2)

  template <class T, class D>
  bool operator!=(nullptr_t, const unique_ptr<T, D>& x) noexcept;            // (3)
}
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]

## 概要
非�値比較。


## 戻り値
- (1) : `a.`[`get()`](get.md) `!=` `b.`[`get()`](get.md)
- (2), (3) : `static_cast<bool>(x)`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p1(new int(3));
  std::unique_ptr<int> p2(new int(3));
  if (p1 != p2) {
    std::cout << "not equal" << std::endl;
  }

  std::unique_ptr<int> p3(new int(3));
  if (p3 != nullptr) {
    std::cout << "p3 is not nullptr" << std::endl;
  }

  if (nullptr != p3) {
    std::cout << "p3 is not nullptr" << std::endl;
  }
}
```

### 出力
```
not equal
p3 is not nullptr
p3 is not nullptr
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
