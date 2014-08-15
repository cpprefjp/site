#sort
```cpp
void sort();
template <class Compare> void sort(Compare comp);
```

##概要
コンテナを並べ替える


##要件
型`T`の`operator<`もしくは`comp`が、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)で定義されること。


##効果
型`T`の`operator<`もしくは`comp`に基いてコンテナの要素を並べ替える。  
  
この操作は安定である。同値要素の順序は保持される。  
この操作は、イテレータと参照の有効性に影響しない。  


##戻り値
なし


##計算量
[`distance`](/reference/iterator/distance.md)([`begin`](./begin.md)`(), `[`end`](./end.md)`())`を`N`として、約`N logN`回の比較


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {2, 1, 3};

  ls.sort();

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* sort[color ff0000]

###出力
```
1
2
3
```


