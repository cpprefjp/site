#erase
```cpp
// C++03
iterator erase(iterator position);
iterator erase(iterator position, iterator last);

// C++11
iterator erase(const_iterator position);
iterator erase(const_iterator position, const_iterator last);
```

##概要
指定された要素をコンテナから削除する。


##要件
第1引数`position`が間接参照可能なイテレータであること


##効果
1引数版は、`position`が指す要素が削除される。  
2引数版は、`[position, last)`で示される範囲の要素が削除される。


##戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](./end.md)を返す。


##例外
投げない


##計算量
削除される要素の数と同じ回数の`T`のデストラクタが実行される。


##例
```cpp
#include <iostream>
#include <list>
#include <iterator>

int main()
{
  // 1引数版
  {
    std::list<int> ls = {1, 2, 3, 4, 5};

    // 4を削除
    ls.erase(std::next(ls.begin(), 3));

    for (int x : ls) { std::cout << x << ' '; }
  }
  std::cout << std::endl;

  // 2引数版
  {
    std::list<int> ls = {1, 2, 3, 4, 5};

    // 3以降を削除
    ls.erase(std::next(ls.begin(), 2), ls.end());

    for (int x : ls) { std::cout << x << ' '; }
  }
}
```
* erase[color ff0000]

###出力
```
1 2 3 5 
1 2 
```


##参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
