#value_comp
```cpp
value_compare value_comp() const;
```

##概要
コンテナに関連づけられた比較オブジェクトを返す。これはコンテナ内の二つの要素のキー部分を比較するために利用できる。 
この比較オブジェクトはオブジェクトの構築時にセットされ、関数ポインタであっても関数オブジェクトであっても良い。いずれにせよこれは同じ型の 2 つの引数をとり、狭義の弱順序に従って一つ目の引数が二つ目の引数の前になる場合に `true`、そうでない場合に `false` を返す。 



##戻り値
比較オブジェクト。 
`value_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  map<int,char> c;
  const map<int,char>::value_compare& comp = c.value_comp();

  auto p1 = std::make_pair(1,'a');
  auto p2 = std::make_pair(2,'b');
  auto p3 = std::make_pair(3,'c');

  cout << comp(p1, p2) << endl;
  cout << comp(p3, p2) << endl;

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
| [`key_comp`](/reference/map/map/key_comp.md) | キーを比較した結果を返す |
| [`find`](/reference/map/map/find.md) | 指定したキーで要素を探す |
| [`count`](/reference/map/map/count.md) | 指定したキーにマッチする要素の数を返す |
| [`lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


