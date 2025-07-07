# move_only_function
* functional[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class... S>
  class move_only_function; // 宣言のみ

  template<class R, class... ArgTypes>
  class move_only_function<R(ArgTypes...) /*cv*/ /*ref*/ noexcept(/*noex*/)>;
}
```

## 概要
`move_only_function`クラステンプレートは、パラメータの型リスト`ArgTypes...`、戻り値の型`R`に合致する、あらゆる関数ポインタ、関数オブジェクト、メンバ関数ポインタ、メンバ変数ポインタを保持できるクラスである。

下記全ての組み合わせ（12種類）に対して、クラステンプレートの部分特殊化が提供される。

- CV修飾子 *cv* : `const`, CV修飾無し
- 参照修飾子 *ref* : `&`, `&&`, 参照修飾無し
- noexcept例外指定 *noex* : `true`, `false`

### `function`との比較
[`std::function`](function.md)と比べて、`std::move_only_function`は下記の特徴をもつ。

- ムーブのみ対応。コピー不可。
- 関数型のCV修飾／参照修飾／noexcept例外指定をサポートする。
    - const性などを正しく伝搬することでバグ発生リスクを軽減する
- [`target_type`](function/target_type.md)型と[`target()`](function/target.md)を提供しない。
    - 実行時型情報（RTTI）非依存
- [関数呼び出し](move_only_function/op_call.md)は強い事前条件を持つ。
    - 関数呼び出し時のnullチェックが要求されない
- クラステンプレート引数の[推論補助](/lang/cpp17/type_deduction_for_class_templates.md)を提供しない。


## メンバ関数

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
### 例1: 基本の使い方
```cpp example
#include <functional>
#include <iostream>

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

#### 出力
```
2
```

### 例2: const性の伝搬
```cpp
#include <functional>
#include <iostream>
#include <string>
#include <utility>

struct Functor {
  std::string operator()() {
    return "non-const";
  }
  std::string operator()() const {
    return "const";
  }
};

int main()
{
  std::cout << "-- move_only_function" << std::endl;
        std::move_only_function<std::string(void)>       mof1 = Functor{};
  const std::move_only_function<std::string(void)>       mof2 = Functor{}; // (呼び出し時に不適格)
        std::move_only_function<std::string(void) const> mof3 = Functor{};
  const std::move_only_function<std::string(void) const> mof4 = Functor{};
  std::cout << "mof1: " << mof1() << std::endl;
//std::cout << "mof2: " << mof2() << std::endl; // 不適格
  std::cout << "mof3: " << mof3() << std::endl;
  std::cout << "mof4: " << mof4() << std::endl;

  std::cout << "-- function" << std::endl;
        std::function<std::string(void)>       fn1 = Functor{};
  const std::function<std::string(void)>       fn2 = Functor{};
//      std::function<std::string(void) const> fn3 = Functor{}; // 不適格
//const std::function<std::string(void) const> fn4 = Functor{}; // 不適格
  std::cout << "fn1: " << fn1() << std::endl;
  std::cout << "fn2: " << fn2() << std::endl;
}
```
* std::move_only_function[color ff0000]
* std::function[link function.md]

#### 出力
```
-- move_only_function
mof1: non-const
mof3: const
mof4: const
-- function
fn1: non-const
fn2: non-const
```

### 例3: 左辺値/右辺値の伝搬
```cpp example
#include <functional>
#include <iostream>
#include <string>
#include <utility>

struct Functor {
  std::string operator()() & {
    return "L-val";
  }
  std::string operator()() && {
    return "R-val";
  }
};

int main()
{
  std::cout << "-- move_only_function" << std::endl;
  std::move_only_function<std::string(void)>    mof1 = Functor{};
  std::move_only_function<std::string(void) &&> mof2 = Functor{};
  std::cout << "mof1/L-val: " << mof1()            << std::endl;
  std::cout << "mof1/R-val: " << std::move(mof1)() << std::endl;
//std::cout << "mof2/L-val: " << mof2()            << std::endl; // 不適格
  std::cout << "mof2/R-val: " << std::move(mof2)() << std::endl;

  std::cout << "-- function" << std::endl;
  std::function<std::string(void)>    fn1 = Functor{};
//std::function<std::string(void) &&> fn2 = Functor{}; // 不適格
  std::cout << "fn1/L-val: " << fn1()            << std::endl;
  std::cout << "fn1/R-val: " << std::move(fn1)() << std::endl;
}
```
* std::move_only_function[color ff0000]
* std::function[link function.md]

#### 出力
```
-- move_only_function
mof1/L-val: L-val
mof1/R-val: L-val
mof2/R-val: R-val
-- function
fn1/L-val: L-val
fn1/R-val: L-val
```

### 例4: noexcept指定の伝搬
```cpp example
#include <functional>

void func() {}
void func_noex() noexcept {}

int main()
{
  std::move_only_function<void(void)>          mof1 = func;
  std::move_only_function<void(void)>          mof2 = func_noex;
//std::move_only_function<void(void) noexcept> mof3 = func; // 不適格
  std::move_only_function<void(void) noexcept> mof4 = func_noex;
  static_assert(not noexcept(mof1()));
  static_assert(not noexcept(mof2()));
  static_assert(    noexcept(mof4()));

  std::function<void(void)>          fn1 = func;
  std::function<void(void)>          fn2 = func_noex;
//std::function<void(void) noexcept> fn3 = func;      // 不適格
//std::function<void(void) noexcept> fn4 = func_noex; // 不適格
  static_assert(not noexcept(fn1()));
  static_assert(not noexcept(fn2()));
}
```
* std::move_only_function[color ff0000]
* std::function[link function.md]

#### 出力
```
```

### 例5: ムーブオンリーオブジェクト
```cpp example
#include <functional>
#include <iostream>
#include <memory>
#include <utility>

// ムーブオンリーの関数オブジェクトクラス
struct UniqueInt {
  std::unique_ptr<int> ptr;

  void operator()(void) {
    std::cout << *ptr << std::endl;
  }
};

int main()
{
  UniqueInt ui = {std::make_unique<int>(42)};

  // コンパイルエラー！
  // std::functionはムーブオンリーオブジェクトを格納できない
//  std::function<void(void)> f = std::move(ui);
  
  // OK
  // std::move_only_functionなら格納可能
  std::move_only_function<void(void)> f = std::move(ui);

  f();
}
```
* std::move_only_function<void(void)>[color ff0000]
* std::function<void(void)>[link /reference/functional/function.md]
* std::make_unique[link /reference/memory/make_unique.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
42
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- C++11 [`function`](function.md)
- C++26 [`copyable_function`](copyable_function.md)
- C++26 [`function_ref`](function_ref.md)


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
- [N4348 Making `std::function` safe for concurrency](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4348.html)
    - `std::function`のconst性伝搬に関して、スレッドセーフ保証の観点からの問題指摘。
- [Why does C++23 std::move_only_function not have deduction guides?](https://stackoverflow.com/questions/69509236/why-does-c23-stdmove-only-function-not-have-deduction-guides)
