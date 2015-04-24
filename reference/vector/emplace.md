#emplace (C++11)
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
template <class... Args>
iterator emplace(const_iterator position, Args&&... args);

template <class... Args>
iterator vector<bool>::emplace(const_iterator position, Args&&... args); // C++14
```

##概要
任意の位置に要素を直接構築で挿入する


##要件
要素型 `value_type` は、引数 `args` からコンテナに対して `EmplaceConstructible` でなければならない。また、要素型 `value_type` はコンテナに対して、`MoveInsertable` であり、かつ、`MoveAssignable` でなければならない。


##効果
`std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...` で構築された `value_type` 型のオブジェクトを `position` の手前に挿入する。


##戻り値
`args` から構築され `vector` に新規に追加された要素を指すイテレータを返す。


##計算量
挿入される要素の数と挿入される要素の位置と[`end()`](./end.md)の間の要素数に対して、線形時間の計算量が必要である。


##備考
- 要素を追加した後の[`size()`](./size.md)が要素を追加する前の[`capacity()`](./capacity.md)よりも大きい場合は領域の再確保が生じる。領域の再確保が生じなかった場合には全てのイテレーターや参照は有効である。
- C++14 : 要素型`T`のコピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入、InputIteratorへの操作以外で例外が発生した場合、末尾への挿入であれば副作用は発生しない。非`CopyInsertable`な型`T`のムーブコンストラクタで例外が発生した場合、副作用は未規定。


##例
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
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0


##参照
- [LWG Issue 2187. `vector<bool>` is missing emplace and `emplace_back` member functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2187)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - C++11までは「もし、例外が発生した場合には、副作用が発生しない。」という保証があったが、これは全要素の挿入を巻き戻すという強すぎる保証であるため、C++14で「もし、例外が発生した場合には、 **挿入操作中の単一要素については** 副作用が発生しない。」と修正。

