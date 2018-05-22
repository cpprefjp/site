# operator>
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T1, class D1, class T2, class D2>
  bool operator>(const unique_ptr<T1, D1>& a, const unique_ptr<T2, D2>& a); // (1)

  template <class T, class D>
  bool operator>(const unique_ptr<T, D>& x, nullptr_t);                     // (2)

  template <class T, class D>
  bool operator>(nullptr_t, const unique_ptr<T, D>& x);                     // (3)
}
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]

## 概要
`unique_ptr`において、左辺が右辺より大きいかを判定する。

比較対象は、`unique_ptr`が指す値ではなく、`unique_ptr`が保持するポインタ値。


## 戻り値
- (1) : `b < a`
- (2) : `nullptr < x`
- (3) : `x < nullptr`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::cout << std::boolalpha;

  std::unique_ptr<int> p1(new int(3));
  std::unique_ptr<int> p2(new int(3));

  bool r1 = p1 > p2;
  std::cout << r1 << std::endl;

  bool r2 = p1 > nullptr;
  std::cout << r2 << std::endl;

  bool r3 = nullptr > p1;
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
- [GCC](/implementation.md#gcc): 4.4.7 (`nullptr`バージョン以外), 4.7.4
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0 (`nullptr`バージョン以外), 3.3
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
	- 2012までは`nullptr`バージョンがない。
