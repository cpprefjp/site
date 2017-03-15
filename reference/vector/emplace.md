# emplace
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
iterator emplace(const_iterator position, Args&&... args);

template <class... Args>
iterator vector<bool>::emplace(const_iterator position, Args&&... args); // C++14
```

## 概要
任意の位置に要素を直接構築で挿入する


## 要件
要素型 `value_type` は、引数 `args` からコンテナに対して `EmplaceConstructible` でなければならない。また、要素型 `value_type` はコンテナに対して、`MoveInsertable` であり、かつ、`MoveAssignable` でなければならない。


## 効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` で構築された `value_type` 型のオブジェクトを `position` の手前に挿入する。


## 戻り値
`args` から構築され `vector` に新規に追加された要素を指すイテレータを返す。


## 計算量
挿入される要素の数と挿入される要素の位置と[`end()`](end.md)の間の要素数に対して、線形時間の計算量が必要である。


## 備考
- 再確保の可能性、イテレータの有効性への影響、例外発生時に副作用が発生しない保証はいずれも[`insert()`](insert.md)と同様。


## 例
```cpp
#include <iostream>
#include <vector>
#include <utility>
#include <string>
#include <algorithm>

int main()
{
  std::vector<std::pair<int, std::string>> v;

  v.emplace(v.begin(), 3, std::string("hello"));
  v.insert(v.begin(), std::make_pair(1, std::string("world")));

  std::for_each(v.begin(), v.end(), [](decltype(v)::const_reference x) {
    std::cout << x.first << ',' << x.second << std::endl;
  });
}
```
* emplace[color ff0000]

### 出力
```
1,world
3,hello
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0


## 参照
- [N2345 Placement Insert for Containers (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2345.pdf)
- [LWG Issue 2187. `vector<bool>` is missing emplace and `emplace_back` member functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2187)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/push_back.md)ページを参照。

