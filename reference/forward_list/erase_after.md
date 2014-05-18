#erase_after (C++11)
```cpp
iterator erase_after(const_iterator position);
iterator erase_after(const_iterator position, const_iterator last);
```

##概要
指定された要素をコンテナから削除する


##要件
第1引数`positionの次`が間接参照可能なイテレータであること


##効果
1引数版は、`position`が指す次の要素が削除される。  
2引数版は、`(position, last)`で示される範囲の要素が削除される。


##戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](./end.md)を返す。


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
}
```
* erase_after[color ff0000]

###出力
```
1 2 3 5 
1 2 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


