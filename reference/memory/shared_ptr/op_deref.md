# operator*
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// 非配列版、非void版のみ
T& operator*() const noexcept;
```

## 概要
ポインタを間接参照する。


## 要件

```cpp
get() != nullptr
```
* get()[link get.md]


## 戻り値
`*`[`get()`](get.md)


## 備考
- C++11 : 型`T`が (CV修飾された) `void`の場合、この関数が定義されるかどうかは未規定。定義される場合、その戻り値は未規定
- C++17 : 型`T`が非配列もしくは (CV修飾された) `void`の場合、この関数が定義されるかどうかは未規定。定義される場合、その戻り値は未規定


## 例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  int& r = *p;
  std::cout << r << std::endl;
}
```

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0


## 参照
- [LWG Issue 2572. The remarks for `shared_ptr::operator*` should apply to cv-qualified void as well](https://wg21.cmeerw.net/lwg/issue2572)
- [P0414R1 Merging `shared_ptr` changes from Library Fundamentals to C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0414r1.html)
