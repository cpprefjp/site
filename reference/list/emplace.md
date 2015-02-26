#emplace (C++11)
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
template <class... Args>
iterator emplace(const_iterator position, Args&&... args);
```

##概要
任意の位置に直接構築で要素を挿入する。  
この関数の引数`args...`は、要素型`T`のコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。

第1パラメータ`position`で指定された要素の前に追加する。


##要件
第1パラメータ`position`が、`[`[`begin()`](./begin.md)`, `[`end()`](./end.md)`]`の範囲の間接参照可能なイテレータであること。


##戻り値
挿入された要素を指すイテレータ


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <list>
#include <iterator>
#include <utility>
#include <string>

int main()
{
  std::list<std::pair<int, std::string>> ls = {
    {2, "b"},
    {3, "c"},
    {4, "d"}
  };

  ls.emplace(ls.begin(), 1, "a");

  for (const auto& x : ls) {
    std::cout << x.first << ',' << x.second << std::endl;
  };
}
```
* emplace[color ff0000]

###出力
```
1,a
2,b
3,c
4,d
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


