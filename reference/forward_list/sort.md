#sort
```cpp
void sort();
template <class Compare> void sort(Compare comp);
```

##概要

コンテナを並べ替える



##要件

型`T`の`operator<`もしくは`comp`が、狭義の弱順序で定義されること。


##効果

型`T`の`operator<`もしくは`comp`に基いてコンテナの要素を並べ替える。

この操作は安定である。同値要素の順序は保持される。
この操作は、イテレータと参照の有効性に影響しない。


##戻り値

なし


##計算量

[`distance`](/reference/iterator/distance.md)([begin](/reference/forward_list/begin.md)(), [end](/reference/forward_list/end.md)())を`N`として、約`N logN`回の比較


##例

```cpp
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {2, 1, 3};

  ls.sort();

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* sort[color ff0000]

###出力

```cpp
1
2
3
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


