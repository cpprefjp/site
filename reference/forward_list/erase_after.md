#erase_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator erase_after(const_iterator position); // (1)
iterator erase_after(const_iterator position,
                     const_iterator last);     // (2)
```

##概要
指定された要素をコンテナから削除する


##要件
第1引数`position`の次が間接参照可能なイテレータであること


##効果
- (1) : `position`が指す次の要素が削除される。  
- (2) : `(position, last)`で示される範囲の要素が削除される。


##戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](end.md)を返す。


##例外
投げない


##計算量
削除される要素の数と同じ回数の`T`のデストラクタが実行される。


##例
```cpp
#include <iostream>
#include <forward_list>
#include <iterator>

int main()
{
  // 1引数版
  {
    std::forward_list<int> ls = {1, 2, 3, 4, 5};

    // 4を削除
    ls.erase_after(std::next(ls.before_begin(), 3));

    for (int x : ls) { std::cout << x << ' '; }
  }
  std::cout << std::endl;

  // 2引数版
  {
    std::forward_list<int> ls = {1, 2, 3, 4, 5};

    // 3以降を削除
    ls.erase_after(std::next(ls.before_begin(), 2), ls.end());

    for (int x : ls) { std::cout << x << ' '; }
  }
  std::cout << std::endl;
}
```
* erase_after[color ff0000]
* ls.before_begin()[link before_begin.md]
* ls.end()[link end.md]
* std::next[link /reference/iterator/next.md]

###出力
```
1 2 3 5 
1 2 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


