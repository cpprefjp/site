#function(C++11)
```cpp
namespace std {
  template <class> class function; // 宣言のみ

  template <class R, class... ArgTypes>
  class function<R(ArgTypes...)>;
}
```

##概要
(ここに、クラスの概要を記載する)


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------------------------------|-------|
| [`(constructor)`](./function/function.md)  | コンストラクタ                               | C++11 |
| [`(destructor)`](./function/-function.md)  | デストラクタ                                 | C++11 |
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
```

###出力
```
```

##バージョン
###言語
- C++11:

###参照

