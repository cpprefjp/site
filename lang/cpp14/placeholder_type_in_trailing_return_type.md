#後置戻り値型をプレースホルダーにすることを許可
* cpp14[meta cpp]

##概要
[戻り値の型を拘置する関数宣言構文](/lang/cpp11/trailing_return_types.md)と[ラムダ式](/lang/cpp11/lambda_expressions.md)の、後置戻り値型(trailing return type)を`auto`プレースホルダーとし、そのプレースホルダーを修飾することで、戻り値型の推論を補助できる。

```cpp
static int static_value = 3;

// 関数宣言構文の場合：
// 戻り値の型はint&。
// return文をdecltypeで推論した結果はintとなり、
// その型を参照(&)で修飾している。
auto f() -> auto& { return static_value; }

// ラムダ式の場合：
// 関数オブジェクトgの戻り値型もまたint&
auto g = []() -> auto& { return static_value; };
```


##例
```cpp
static int static_value = 3;

// 戻り値の型はint&。
// return文をdecltypeで推論した結果はintとなり、
// その型を参照(&)で修飾している。
auto f() -> auto& { return static_value; }

int main()
{
  // 関数オブジェクトgの戻り値型もまたint&
  auto g = []() -> auto& { return static_value; };
  
  int& result_f = f();
  int& result_g = g();
}
```

##出力
```
```


##この機能が必要になった背景・経緯
`decltype(auto)`は、C++14で導入された「[通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md)」の機能で、参照の変数を参照のまま`return`文で返せるようにするために導入された。


##関連項目
- [C++14 通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md)


