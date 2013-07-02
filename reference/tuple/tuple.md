#tuple(C++11)
```cpp
namespace std {
  template <class... Args> class tuple;
}
```

###概要
`tuple`型は、複数の型の値を保持する「タプル」を表現するためのクラスである。
[`pair`](/reference/utility/pair.md)型は2つの型の値を保持する「組」を表現することができるが、`tuple`ではN個の型の値を扱うことができる。


##メンバ関数

| 名前 | 説明 |
|-------------------------------------|-------------------------------------------|
| [`(constructor)`](./tuple/tuple.md) | コンストラクタ |
| [`operator=`](./tuple/op_assign.md) | 代入演算子 |
| [`swap`](./tuple/swap.md)           | 異なる`tuple`オブジェクトと値を入れ替える |


##非メンバ関数
###タプル生成関数

| 名前 | 説明 |
|---------------------------------------------------|---------------------------------------------------|
| [`ignore`](./tuple/ignore.md)                     | 無視する要素のプレースホルダー(constant variable) |
| [`make_tuple`](./tuple/make_tuple.md)             | 引数のコピーからタプルを生成する |
| [`forward_as_tuple`](./tuple/forward_as_tuple.md) | 引数の完全な型からタプルを生成する |
| [`tie`](./tuple/tie.md)                           | 引数への参照からタプルを生成する |
| [`tuple_cat`](./tuple/tuple_cat.md)               | 複数のタプルから1つのタプルを生成する |


###要素アクセス

| 名前 | 説明 |
|-------------------------|----------------------------------|
| [`get`](./tuple/get.md) | `tuple`の`i`番目の要素を参照する |


###関係演算子

| 名前 | 説明 |
|------------------------------------------|------------------------------------|
| [`operator==`](./tuple/equal.md)         | 等値判定を行う |
| [`operator!=`](./tuple/not_equal.md)     | 非等値判定を行う |
| [`operator<`](./tuple/less.md)           | 左辺が右辺よりも小さいか判定を行う |
| [`operator<=`](./tuple/less_equal.md)    | 左辺が右辺以下か判定を行う |
| [`operator>`](./tuple/greater.md)        | 左辺が右辺より大きいか判定を行う |
| [`operator>=`](./tuple/greater_equal.md) | 左辺が右辺以上か判定を行う |


###例
```cpp
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
* std::tuple[color ff0000]


###出力
```
1
hello
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ?
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.4, 4.5.2, 4.6.1
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): 9.0, 10.0


