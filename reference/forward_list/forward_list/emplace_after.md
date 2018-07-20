# emplace_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
iterator emplace_after(const_iterator position, Args&&... args);
```

## 概要
任意の位置に直接構築で要素を挿入する。

この関数の引数`args...`は、要素型`T`のコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。

第1パラメータ`position`で指定された要素の後ろに追加する。


## 要件
第1パラメータ`position`が、[`before_begin()`](before_begin.md)もしくは`[`[`begin()`](begin.md)`,` [`end()`](end.md)`]`の範囲の間接参照可能なイテレータであること。


## 戻り値
挿入された要素を指すイテレータ


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <iterator>
#include <utility>
#include <string>
#include <algorithm>

int main()
{
  std::forward_list<std::pair<int, std::string>> ls = {
    {1, "a"},
    {2, "b"},
    {4, "d"}
  };

  ls.emplace_after(std::next(ls.begin(), 1), 3, "c");

  std::for_each(ls.begin(), ls.end(), [](decltype(ls)::const_reference x) {
    std::cout << x.first << ',' << x.second << std::endl;
  });
}
```
* emplace_after[color ff0000]
* std::next[link /reference/iterator/next.md]
* ls.begin()[link begin.md]
* ls.end()[link end.md]

### 出力
```
1,a
2,b
3,c
4,d
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017
	- 2010は、可変引数テンプレートに対応していないため、`args`に1つしか実引数を渡せない。
	- 2012は、可変引数テンプレートに対応していないため、不完全な実装である。


## 参照


