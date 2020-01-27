# operator!=
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class T, class U>
  bool operator!=(const shared_ptr<T>& a, const shared_ptr<U>& b) noexcept; // (1)

  template <class T>
  bool operator!=(const shared_ptr<T>& x, nullptr_t) noexcept;              // (2)

  template <class T>
  bool operator!=(nullptr_t, const shared_ptr<T>& x) noexcept;              // (3)
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
  std::shared_ptr<int> p1(new int(3));
  std::shared_ptr<int> p2(new int(3));
  if (p1 != p2) {
    std::cout << "not equal" << std::endl;
  }

  std::shared_ptr<int> p3(new int(3));
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
- [GCC](/implementation.md#gcc): 4.3.6 (`nullptr`バージョン以外), 4.6.4
- [Clang](/implementation.md#clang): 3.0 (`nullptr`バージョン以外), 3.3
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013
	- 2012までは`nullptr`バージョンがない。
