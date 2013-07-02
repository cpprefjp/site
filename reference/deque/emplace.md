#emplace(C++11)
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
| | |
|-------------------------------------------------------------------------------------------------|-----------------------------------------|
| [`insert`](./insert.md) | 任意の位置に要素を挿入する |


