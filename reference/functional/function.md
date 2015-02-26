#function (C++11)
* functional[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class> class function; // 宣言のみ

  template <class R, class... ArgTypes>
  class function<R(ArgTypes...)>;
}
```

##概要
`function`クラステンプレートは、パラメータの型リスト`ArgTypes...`、戻り値の型`R`に合致する、あらゆる関数ポインタ、関数オブジェクト、メンバ関数ポインタ、メンバ変数ポインタを保持できるクラスである。

このクラスは、以下のように使用する：

```cpp
int add(int x) { return x; }

// 関数を変数に保持する
function<int(int)> f = add;

// 保持している関数を呼び出す
int result = f(1); // result == 2
```

`function`のテンプレート引数には、「戻り値の型(引数の型リスト...)」という形式で、型で関数のシグニチャを指定する。

`function`クラスは具体的な関数・関数オブジェクトの型には依存しない。シグニチャが一致していればあらゆる型の関数、関数オブジェクトを代入できる。


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------------------------------|-------|
| [`(constructor)`](./function/op_constructor.md)  | コンストラクタ                               | C++11 |
| [`(destructor)`](./function/op_destructor.md)  | デストラクタ                                 | C++11 |
| [`operator=`](./function/op_assign.md)     | 代入演算子                                   | C++11 |
| [`swap`](./function/swap.md)               | 他の`function`オブジェクトと中身を入れ替える | C++11 |
| [`assign`](./function/assign.md)           | 関数オブジェクトとアロケータを再代入する     | C++11 |
| [`operator bool`](./function/op_bool.md)   | 関数呼び出しが可能か調べる                   | C++11 |
| [`operator()`](./function/op_call.md)      | 関数呼び出し                                 | C++11 |
| [`target_type`](./function/target_type.md) | 元となる関数の型情報を取得する               | C++11 |
| [`target`](./function/target.md)           | 元となる関数を取得する                       | C++11 |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|---------------------------------------------|-------|
| `result_type`          | 関数の戻り値の型(テンプレートパラメータ`R`) | C++11 |
| `argument_type`        | 第1引数の型(引数が1つの場合のみ定義される)  | C++11 |
| `first_argument_type`  | 第1引数の型(引数が2つの場合のみ定義される)  | C++11 |
| `second_argument_type` | 第2引数の型(引数が2つの場合のみ定義される)  | C++11 |


###非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|-----------------------------------------|-------|
| [`operator==`](./function/op_equal.md)     | 等値比較                                | C++11 |
| [`operator!=`](./function/op_not_equal.md) | 非等値比較                              | C++11 |
| [`swap`](./function/swap_free.md)          | 2つの`function`オブジェクトを入れ替える | C++11 |


###その他

| 名前 | 説明 | 対応バージョン |
|------------------|------------------------|-------|
| `uses_allocator` | `function`による特殊化 | C++11 |


##例
```cpp
#include <iostream>
#include <functional>

int add(int x) { return x + 1; }

int main()
{
  // 関数を代入
  std::function<int(int)> f = add;

  // 関数オブジェクトを代入
  f = [](int x) { return x + 1; };

  // 保持している関数を呼び出す
  int result = f(1);
  std::cout << result << std::endl;
}
```

###出力
```
2
```

##バージョン
###言語
- C++11

###参照

