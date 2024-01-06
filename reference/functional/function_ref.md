# function_ref
* functional[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class... S>
  class function_ref; // 宣言のみ

  template<class R, class... ArgTypes>
  class function_ref<R(ArgTypes...) /*cv*/ noexcept(/*noex*/)>;
}
```

## 概要
`function_ref`クラステンプレートは、パラメータの型リスト`ArgTypes...`、戻り値の型`R`に合致する、あらゆる関数ポインタ、関数オブジェクト、メンバ関数ポインタ、メンバ変数ポインタを参照できるクラスである。

下記全ての組み合わせ（4種類）に対して、クラステンプレートの部分特殊化が提供される。

- CV修飾子 *cv* : `const`, CV修飾無し
- noexcept例外指定 *noex* : `true`, `false`

`function_ref`クラステンプレートの特殊化は、[`copyable`](/reference/concepts/copyable.md)のモデルである[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)な型となる。


### `function`ファミリとの比較
類似機能を提供する[`function`](function.md), [`move_only_function`](move_only_function.md), [`copyable_function`](copyable_function.md)とは異なり、`function_ref`は下記の特徴をもつ。

- 対象の所有権を管理しない軽量ラッパーとして実装される。
    - ポインタ2個のオブジェクトサイズで実装可能。
- 構築時に必ず呼び出し対象を指定する必要がある。デフォルト構築不可。
    - `operator bool`を提供しない。
- メンバ関数・メンバ変数を参照する場合は、[`std::nontype`](/reference/utility/nontype_t.md)タグを利用する。
    - 対象オブジェクトの束縛タイミングは、構築時または呼び出し時のいずれもサポートする。
- ダングリング(dangling)参照を避けるため、左辺値(lvalue)のみを取り扱う。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](function_ref/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`operator=`](function_ref/op_assign.md) | 代入演算子 | C++26 |
| [`operator()`](function_ref/op_call.md) | 関数呼び出し | C++26 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|-----------------|----------------|----------------|
| [`(deduction_guide)`](function_ref/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26 |


## 例
### 例1: 基本の使い方
```cpp example
#include <functional>
#include <iostream>
#include <utility>

// 呼び出し可能な何かを受け取る高階関数
int hof(std::function_ref<int(int)> fn)
{
  return fn(2);
}

int add(int x) { return x + 1; }

struct Calc {
  int x_;
  int eval(int y) {
    return x_ * y;
  }
};

int main()
{
  // 通常関数を指定
  std::cout << hof(add) << std::endl;
  // ラムダ式を指定
  std::cout << hof([](int x) { return x * 2; }) << std::endl;

  // オブジェクト束縛済みメンバ関数を指定
  Calc obj{ 3 };
  std::cout << hof({std::nontype<&Calc::eval>, obj}) << std::endl;
}
```
* std::function_ref[color ff0000]
* std::nontype[link /reference/utility/nontype_t.md]

#### 出力
```
3
4
6
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- C++11 [`function`](function.md)
- C++23 [`move_only_function`](move_only_function.md)
- C++26 [`copyable_function`](copyable_function.md)


## 参照
- [P0792R14 `function_ref`: a type-erased callable reference](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0792r14.html)
