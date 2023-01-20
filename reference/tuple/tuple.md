# tuple
* tuple[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Args>
  class tuple;
}
```

## 概要
`tuple`型は、複数の型の値を保持する「タプル」を表現するためのクラスである。

[`pair`](/reference/utility/pair.md)型は2つの型の値を保持する「組」を表現することができるが、`tuple`ではN個の型の値を扱うことができる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|-------------------------------------------|-------|
| [`(constructor)`](tuple/op_constructor.md) | コンストラクタ | C++11 |
| [`operator=`](tuple/op_assign.md) | 代入演算子 | C++11 |
| [`swap`](tuple/swap.md)           | 異なる`tuple`オブジェクトと値を入れ替える | C++11 |


## 非メンバ関数
### タプル生成関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|---------------------------------------------------|-------|
| [`ignore`](ignore.md)                     | 無視する要素のプレースホルダー(constant variable) | C++11 |
| [`make_tuple`](make_tuple.md)             | 引数のコピーからタプルを生成する | C++11 |
| [`forward_as_tuple`](forward_as_tuple.md) | 引数の完全な型からタプルを生成する | C++11 |
| [`tie`](tie.md)                           | 引数への参照からタプルを生成する | C++11 |
| [`tuple_cat`](tuple_cat.md)               | 複数のタプルから1つのタプルを生成する | C++11 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|-------------------------|----------------------------------|-------|
| [`get`](tuple/get.md) | `tuple`の`i`番目の要素を参照する | C++11 |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|--------------------------------|--------------------------------------|-------|
| [`swap`](tuple/swap_free.md) | 2つの`tuple`オブジェクトを入れ替える | C++11 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|------------------------------------|-------|
| [`operator==`](tuple/op_equal.md)         | 等値比較を行う | C++11 |
| [`operator!=`](tuple/op_not_equal.md)     | 非等値比較を行う | C++11 |
| [`operator<=>`](tuple/op_compare_3way.md) | 三方比較を行う | C++20 |
| [`operator<`](tuple/op_less.md)           | 左辺が右辺よりも小さいか比較を行う | C++11 |
| [`operator<=`](tuple/op_less_equal.md)    | 左辺が右辺以下か比較を行う | C++11 |
| [`operator>`](tuple/op_greater.md)        | 左辺が右辺より大きいか比較を行う | C++11 |
| [`operator>=`](tuple/op_greater_equal.md) | 左辺が右辺以上か比較を行う | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](tuple/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  // 3要素のタプルを作る
  std::tuple<int, char, std::string> t = std::make_tuple(1, 'a', "hello");

  // 0番目の要素を参照
  int& i = std::get<0>(t);
  std::cout << i << std::endl;

  // 2番目の要素を参照
  std::string& s = std::get<2>(t);
  std::cout << s << std::endl;
}
```
* std::get[link tuple/get.md]
* std::make_tuple[link make_tuple.md]

#### 出力
```
1
hello
```

### 基本的な使い方 (C++17)
```cpp example
#include <iostream>
#include <tuple>
#include <string>

// 関数から複数の値を返す
std::tuple<int, char, std::string> f()
{
  // std::make_tuple()はほとんどの状況で必要ない
  return {1, 'a', "hello"};
}

int main()
{
  // 構造化束縛でタプルを分解して、それぞれの要素を代入
  auto [a, b, c] = f();

  std::cout << a << std::endl;
  std::cout << b << std::endl;
  std::cout << c << std::endl;
}
```
* std::make_tuple[link make_tuple.md]

#### 出力
```
1
a
hello
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.4, 4.4.4, 4.5.2, 4.6.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008, 2010


## 関連項目
- [`std::pair`](/reference/utility/pair.md)
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)

## 参照
- [タプル - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%97%E3%83%AB)

