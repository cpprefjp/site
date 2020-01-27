# pair
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  struct pair;
}
```

## 概要
`pair`は、2つの異なる型の値を保持する「組」を表現するためのクラスである。また、N個の異なる型の値を保持する「タプル」を表現するためのクラスとして、[`tuple`](/reference/tuple/tuple.md)クラスも提供されている。

標準ライブラリにおいて`pair`は、連想配列コンテナの実装である[`map`](/reference/map/map.md)クラスや[`unordered_map`](/reference/unordered_map/unordered_map.md)クラスで、�ーと値をまとめるためのデータ型として使用されている。


## メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `T1 first`  | 1つめの要素 | |
| `T2 second` | 2つめの要素 | |


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------|-------|
| [`(constructor)`](pair/op_constructor.md) | コンストラクタ | |
| [`operator=`](pair/op_assign.md)          | 代入演算� | |
| [`swap`](pair/swap.md)                    | 他の`pair`オブジェクトと値を入れ替える | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------|------|-------|
| `first_type`  | `T1` | |
| `second_type` | `T2` | |


## 非メンバ関数
### 比較演算�

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------------|-------|
| [`operator==`](pair/op_equal.md)         | �値比較を行う | |
| [`operator!=`](pair/op_not_equal.md)     | 非�値比較を行う | |
| [`operator<`](pair/op_less.md)           | 左辺が右辺よりも小さいか判定を行う | |
| [`operator<=`](pair/op_less_equal.md)    | 左辺が右辺以下か判定を行う | |
| [`operator>`](pair/op_greater.md)        | 左辺が右辺より大きいか判定を行う | |
| [`operator>=`](pair/op_greater_equal.md) | 左辺が右辺以上か判定を行う | |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|-------------------------------|-------------------------------------|-------|
| [`swap`](pair/swap_free.md) | 2つの`pair`オブジェクトを入れ替える | |


### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------|----------------------------|-------|
| [`make_pair`](make_pair.md) | `pair`を構築するヘルパ関数 | |


## タプルインタフェース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tuple_size`](pair/tuple_size.md)       | `pair`の要素数を取得する(class template)           | C++11 |
| [`tuple_element`](pair/tuple_element.md) | `pair`の`i`番目の要素型を取得する(class template)  | C++11 |
| [`get`](pair/get.md)                     | `pair`の`i`番目の要素を参照する(function template) | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](pair/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <utility>
#include <string>

int main()
{
  // pairオブジェクトの構築
  std::pair<int, std::string> p = std::make_pair(1, "hello");

  // 要素の参照
  std::cout << p.first << std::endl;
  std::cout << p.second << std::endl;
}
```
* std::pair[color ff0000]

### 出力
```
1
hello
```

## 関連項目
- [`std::tuple`](/reference/tuple/tuple.md)


## 参照
- [タプル - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%97%E3%83%AB)

