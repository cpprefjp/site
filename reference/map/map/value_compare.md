#map::value_compare
* map[meta header]
* std[meta namespace]

```cpp
namespace std {
  class map::value_compare;
}
```

##概要
`value_compare` は `map` の入れ子クラスで、`map::value_type` 型のオブジェクトを比較する関数オブジェクト型である。  
比較の基準は `map::key_compare` と同様であるが、`map::key_compare` の関数呼び出し演算子の引数型が `map::key_type` であるのに対して、本クラスの関数呼び出し演算子の比較型は `map::value_type` である点が異なっている。
なお、引数のうち [`map`](../../map.md)`::mapped_type` にあたる [`pair`](../../utility/pair.md) の `second` 部については、比較時には無視される。


##メンバ関数

| 名前                                                      | 説明               | 対応バージョン |
|-----------------------------------------------------------|--------------------|----------------|
| [`(constructor)`](value_compare/op_constructor.md.nolink) | コンストラクタ     |                |
| [`operator()`](value_compare/op_call.md.nolink)           | 関数呼び出し演算子 |                |


##protected メンバ変数

| 名前   | 型                                   | 説明                                   | 対応バージョン |
|--------|--------------------------------------|----------------------------------------|----------------|
| `comp` | [`map`](../../map.md)`::key_compare` | キー値の比較に使用する関数オブジェクト |                |


##メンバ型

| 名前                   | 説明                                                                                 | 対応バージョン |
|------------------------|--------------------------------------------------------------------------------------|----------------|
| `result_type`          | 関数オブジェクトとしての戻り型。`bool` の typedef                                    |                |
| `first_argument_type`  | 関数オブジェクトとしての第一引数の型。[`map`](../../map.md)`::value_type` の typedef |                |
| `second_argument_type` | 関数オブジェクトとしての第二引数の型。[`map`](../../map.md)`::value_type` の typedef |                |

これらのメンバ型は、C++03 までは [`binary_function`](../../functional/binary_function.md.nolink)`<value_type, value_type, bool>` を
public 継承することによって定義していたが、C++11 から [`binary_function`](../../functional/binary_function.md.nolink) 等が非推奨になったことから
[`binary_function`](../../functional/binary_function.md.nolink)`<value_type, value_type, bool>` を継承せずに、直接本クラス内で定義するように変更された。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<int, int> m;
  m[0] = 20;
  m[1] = 10;

  std::map<int, int>::value_compare comp = m.value_comp();
  std::cout << std::boolalpha << comp(*m.find(0), *m.find(1)) << std::endl;
}
```
* iostream[link ../../iostream.md]
* map[link ../../map.md]
* value_comp[link value_comp.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* boolalpha[link ../../ios/boolalpha.md]
* find[link find.md]
* value_compare[color ff0000]

###出力
```
true
```
