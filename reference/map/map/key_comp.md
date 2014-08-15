#key_comp
```cpp
key_compare key_comp() const;
```

##概要
コンテナに関連づけられた比較オブジェクトを返す。このオブジェクトはコンテナ内の二つの要素のキー値を比較するために利用できる。 
この比較オブジェクトはオブジェクトの構築時に与えられ、関数へのポインタでも関数オブジェクトでも良い。いずれの場合でも、これは同じ型の 2 つの引数をとり、狭義の弱順序に従って一つ目の引数が二つ目の引数より前のときに `true` を返し、そうでないときに `false` を返す。 


##戻り値
比較オブジェクト。`key_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  map<int,char> c;
  map<int,char>::key_compare comp = c.key_comp();

  cout << comp(1, 2) << endl;
  cout << comp(3, 2) << endl;

  return 0;
}
```

###出力
```
1
0
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`value_comp`](/reference/map/map/value_comp.md) | 値を比較した結果を返す |
| [`find`](/reference/map/map/find.md) | 指定したキーで要素を探す |
| [`count`](/reference/map/map/count.md) | 指定したキーにマッチする要素の数を返す |
| [`lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値より小さく無い最初の要素へのイテレータを返す |
| [`upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


