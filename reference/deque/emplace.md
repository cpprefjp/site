#emplace (C++11)
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

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
- C++14 : 例外が発生した場合、両端への挿入であれば副作用が発生しない。（コピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入、および、InputIterator操作で例外が発生した場合を除く。）もし、非CopyInsertableな型Tのムーブコンストラクタで例外が発生した場合、副作用は未規定。


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


##参照
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - C++11までは「もし、例外が発生した場合には、副作用が発生しない。」という保証があったが、これは全要素の挿入を巻き戻すという強すぎる保証であるため、C++14で「もし、例外が発生した場合には、 **挿入操作中の単一要素については** 副作用が発生しない。」と修正。


##関連項目
| | |
|-------------------------------------------------------------------------------------------------|-----------------------------------------|
| [`insert`](./insert.md) | 任意の位置に要素を挿入する |


