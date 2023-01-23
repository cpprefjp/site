# move_only_function
* functional[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class... S> class move_only_function; // 宣言のみ

  template<class R, class... ArgTypes>
  class move_only_function<R(ArgTypes...) /*cv*/ /*ref*/ noexcept(/*noex*/)>;
}
```

## 概要
`move_only_function`クラステンプレートは、パラメータの型リスト`ArgTypes...`、戻り値の型`R`に合致する、あらゆる関数ポインタ、関数オブジェクト、メンバ関数ポインタ、メンバ変数ポインタを保持できるクラスである。

下記全ての組み合わせ（12種類）についてクラステンプレートの部分特殊化が提供される。

- CV修飾子 *cv* : `const`, CV修飾無し
- 参照修飾子 *ref* : `&`, `&&`, 参照修飾無し
- noexcept例外指定 *noex* : `true`, `false`


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](move_only_function/op_constructor.md) | コンストラクタ      | C++23 |
| [`(destructor)`](move_only_function/op_destructor.md) | デストラクタ          | C++23 |
| [`operator=`](move_only_function/op_assign.md)   | 代入演算子                 | C++23 |
| [`swap`](move_only_function/swap.md)             | 他の`move_only_function`オブジェクトと中身を入れ替える | C++23 |
| [`operator bool`](move_only_function/op_bool.md) | 関数呼び出しが可能か調べる | C++23 |
| [`operator()`](move_only_function/op_call.md)    | 関数呼び出し               | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|-----------------|----------------|----------------|
| `result_type` | 関数の戻り値の型(テンプレートパラメータ`R`) | C++23 |

## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator==`](move_only_function/op_equal.md)     | 等値比較   | C++23 |
| [`operator!=`](move_only_function/op_not_equal.md) | 非等値比較 | C++23 |
| [`swap`](move_only_function/swap_free.md) | 2つの`move_only_function`オブジェクトを入れ替える | C++23 |


## 例
```cpp example
#include <iostream>
#include <functional>

int add(int x) { return x + 1; }

int main()
{
  // 関数を代入
  std::move_only_function<int(int)> f = add;

  // 関数オブジェクトを代入
  f = [](int x) { return x + 1; };

  // 保持している関数を呼び出す
  int result = f(1);
  std::cout << result << std::endl;
}
```
* std::move_only_function[color ff0000]
* f(1)[link move_only_function/op_call.md]

### 出力
```
1
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`function`](function.md)


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
