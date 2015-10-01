#emplace
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
iterator emplace(const_iterator position, Args&&... args);
```

##概要
任意の位置に要素を直接構築で挿入する


##要件
要素型 `value_type` は、引数 `args` からコンテナに対して `EmplaceConstructible` でなければならない。また、要素型 `value_type` はコンテナに対して、`MoveInsertable` であり、かつ、`MoveAssignable` でなければならない。


##効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` で構築された `value_type` 型のオブジェクトを `position` の手前に挿入する。


##戻り値
挿入された要素を指すイテレータ


##計算量
`deque`の要素数に対して線形時間、先頭もしくは末尾への挿入は定数時間


##備考
例外発生時に副作用が発生しない保証は[`insert()`](./insert.md)と同様。


##例
```cpp
#include <iostream>
#include <deque>
#include <utility>
#include <string>

int main()
{
  std::deque<std::pair<int, std::string>> c;

  c.emplace(c.begin(), 3, std::string("hello"));
  c.insert(c.begin(), std::make_pair(1, std::string("world")));

  for (const auto& x : c) {
    std::cout << x.first << ',' << x.second << std::endl;
  }
}
```
* emplace[color ff0000]

###出力
```
1,world
3,hello
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
    - 10.0にも`emplace`は存在するが、`insert`相当の機能しかない。


##関連項目

| 名前 | 説明 |
|-------------------------|----------------------------|
| [`insert`](./insert.md) | 任意の位置に要素を挿入する |


##参照
- [N2345 Placement Insert for Containers (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2345.pdf)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/push_back.md)ページを参照。


