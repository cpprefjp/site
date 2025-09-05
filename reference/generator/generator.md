# generator
* generator[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Ref, class V = void, class Allocator = void>
  class generator : public ranges::view_interface<generator<Ref, V, Allocator>> {
    ...
  };

  namespace pmr {
    template<class R, class V = void>
    using generator = std::generator<R, V, polymorphic_allocator<>>;
  }
}
```
* ranges::view_interface[link /reference/ranges/view_interface.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`generator`クラステンプレートは、[コルーチン](/lang/cpp20/coroutines.md)の評価により生成される要素列のビュー(view)を表現する。
特殊化された`generator`は[`view`](/reference/ranges/view.md)および[`input_range`](/reference/ranges/input_range.md)のモデルである。
`generator`はムーブのみ可能なオブジェクトである。

戻り値型`generator`のコルーチン（以下、ジェネレータコルーチン）では`co_yield`式を用いて値を生成する。`co_yield` [`std::ranges::elements_of`](/reference/ranges/elements_of.md)`(rng)`式を用いると、ジェネレータコルーチンから入れ子Range(`rng`)の各要素を逐次生成する。
ジェネレータコルーチンでは`co_await`式を利用できない。

ジェネレータコルーチンは遅延評価される。
ジェネレータコルーチンが返す`generator`オブジェクトを利用するコード（以下、ジェネレータ利用側）において、先頭要素を指す[イテレータ](generator/iterator.md)を取得する([`begin`](generator/begin.md))、またはイテレータの[インクリメント操作](generator/iterator/op_increment.md)を行うまでジェネレータコルーチンは再開(resume)されない。
ジェネレータコルーチン本体処理において`co_yield`式に到達すると、生成値を保持してから中断(suspend)しジェネレータ利用側へと制御を戻す。
ジェネレータ利用側では[イテレータの間接参照](generator/iterator/op_deref.md)を行うことで、ジェネレータによる生成値を取得する。


### 説明用メンバ
`generator`では下記の説明用メンバ型を定義する。

- `value` : [`conditional_t`](/reference/type_traits/conditional.md)`<`[`is_void_v`](/reference/type_traits/is_void.md)`<V>,` [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<Ref>, V>`
- `reference` : [`conditional_t`](/reference/type_traits/conditional.md)`<`[`is_void_v`](/reference/type_traits/is_void.md)`<V>, Ref&&, Ref>`
- [`iterator`](generator/iterator.md) : ジェネレータが返すイテレータ型。

`generator`および[`promise_type`](generator/promise_type.md)と[`iterator`](generator/iterator.md)の動作説明のため、下記の説明用メンバを用いる。

- `coroutine_` : [`coroutine_handle`](/reference/coroutine/coroutine_handle.md)`<`[`promise_type`](generator/promise_type.md)`>`型のコルーチンハンドル
- `active_` : [`unique_ptr`](/reference/memory/unique_ptr.md)`<`[`stack`](/reference/stack/stack.md)`<`[`coroutine_handle<>`](/reference/coroutine/coroutine_handle.md)`>>`型のアクティブスタック


### 第1テンプレートパラメータ`Ref`の概要
`generator`クラステンプレートでは、テンプレートパラメータ`Ref`, `V`の組み合わせによってco_yieldオペランド型(`yielded`)やイテレータ間接参照の結果型(`reference`)や[イテレータの値型(`value_type`)](generator/iterator.md)を制御する。

第1パラメータ`Ref`以外は省略可能となっており、ほとんどのユースケース（提案文書によれば98%）では、テンプレートパラメータ`Ref`のみの明示指定で十分とされる。
値型`T`を生成するジェネレータにおいて、第1テンプレートパラメータ`Ref`に応じて関連する型がそれぞれ導出される。

|`Ref`|co_yieldオペランド型|間接参照の結果型|イテレータの値型|
|-----|----|----|----|
|`T`<br/>`T&&`|`T&&` と `const T&`|`T&&`|`T`|
|`T&`|`T&`|`T&`|`T`|
|`const T&`|`const T&`|`const T&`|`T`|

ジェネレータそれ自身ではイテレータの値型を直接利用しない。ジェネレータ利用側でイテレータの`value_type`型にアクセスする特殊な追加処理を行う場合のみ、第2テンプレートパラメータ`V`の明示指定が必要とされる。


### ジェネレータと値のコピー／ムーブ
`generator`クラステンプレートでは、その内部動作において最低限のコピー／ムーブ処理しか行わないよう設計されている。このため一定条件を満たせば、コピー不可でムーブのみ可能な型や、コピー／ムーブいずれも不可能な型の生成もサポートする。

値型`T`を生成するジェネレータにおいて、第1テンプレートパラメータ`Ref`とco_yield演算子オペランドに指定する式（左辺値／右辺値やconst修飾）に応じて、ジェネレータコルーチン最大1回のコピーが発生する。
`Ref=T&`とした場合、co_yieldに右辺値を指定するとコンパイルエラーになる。

|`Ref`＼co_yield式|左辺値|const左辺値|右辺値|
|-----|----|----|----|
|`T`<br/>`T&&`|コピー 1回|コピー 1回|0回|
|`T&`|コピー 1回|コピー 1回|(不適格)|
|`const T&`|0回|0回|0回|

またジェネレータ利用側においては、イテレータ間接参照結果を受ける変数の宣言型`X`との関係に応じて（例：[範囲for文](/lang/cpp11/range_based_for.md)の変数宣言型）、最大で1回のコピーまたはムーブが生じる。
`Ref=T&`または`Ref=const T&`とした場合、右辺値参照型`T&&`には束縛できないためコンパイルエラーとなる。

|`Ref`＼`X`|`T`|`T&&`|`const T&`|
|-----|----|----|----|
|`T`<br/>`T&&`|ムーブ 1回|0回|0回|
|`T&`|コピー 1回|(不適格)|0回|
|`const T&`|コピー 1回|(不適格)|0回|

ムーブのみ可能な型（例：[`std::unique_ptr`](/reference/memory/unique_ptr.md)）では、上記表においてコピーが生じる組み合わせを避ければジェネレータより生成可能である。
同様にコピー／ムーブいずれも不可能な型では、コピーまたはムーブが生じる組み合わせを避ければ生成可能である。


### アロケータサポート
`generator`クラステンプレートの第3テンプレートパラメータ`Allocator`によって、[コルーチン・ステート](/lang/cpp20/coroutines.md)の動的メモリ確保に用いる静的アロケータ型を指定できる。省略時はデフォルトアロケータ[`allocator<void>`](/reference/memory/allocator.md)が利用される。

またジェネレータコルーチン定義の引数リストに[`allocator_arg`](/reference/memory/allocator_arg_t.md)タグ型に続いてアロケータオブジェクトを指定すると、ジェネレータの生成毎に異なるアロケータ利用を指定することもできる。

C++コンパイラによっては、ジェネレータコルーチンに関する動的メモリ確保・解放処理は最適化によって省略され(coroutine elision)、より効率的なコードが生成されることも期待できる。


### ジェネレータのネスト
別の子ジェネレータコルーチンが返す`generator`もRangeとなっているため、ある親ジェネレータコルーチン内部で`co_yield` [`std::ranges::elements_of`](/reference/ranges/elements_of.md)構文を用いると、複数ジェネレータコルーチンのネスト構造をとることができる。
子ジェネーレタコルーチンの遅延評価によって生成される値は、親ジェネレータコルーチンから生成されたかのように振る舞う。

`generator`クラス（厳密には[`generator::promise_type`](generator/promise_type.md)）ではジェネレータコルーチンのネスト構造を検出し、[対称コルーチン](/lang/cpp20/coroutines.md)としてコルーチン間の実行フロー転送制御を効率的に行う。


## 適格要件
- テンプレートパラメータ`Allocator`が`void`ではない場合、[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer`はポインタ型であること。
- 説明用のメンバ型`value`はCV修飾されないオブジェクト型であること。
- 説明用のメンバ型`reference`は参照型、または[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであるCV修飾されないオブジェクト型であること。
- 説明用のメンバ型`reference`が参照型の場合には`RRef` == [`remove_reference_t`](/reference/type_traits/remove_reference.md)`<reference>&&`、それ以外の場合には`RRef` == `reference`としたとき、それぞれ下記のモデルであること。
    - [`common_reference_with`](/reference/concepts/common_reference_with.md)`<reference&&, value&>`
    - [`common_reference_with`](/reference/concepts/common_reference_with.md)`<reference&&, RRef&&>`
    - [`common_reference_with`](/reference/concepts/common_reference_with.md)`<RRef&&, const value&>`

テンプレートパラメータ`Allocator`が`void`ではない場合、`Cpp17Allocator`の要件を満たすこと。


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](generator/op_constructor.md) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| `operator=(generator other) noexcept;` | ムーブ代入演算子 | C++23 |

### イテレータ
| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`begin`](generator/begin.md) | Viewの先頭を指すイテレータを取得する | C++23 |
| [`end`](generator/end.md) | Viewの番兵を取得する | C++23 |

## メンバ型

| 名前            | 説明        | 対応バージョン |
|-----------------|-------------|-------|
| `yielded`      | `co_yield`演算子オペランド型（後述） | C++23 |
| [`promise_type`](generator/promise_type.md) | ジェネレータコルーチンのPromise型 | C++23 |

``` cpp
using yielded =
  conditional_t<is_reference_v<reference>, reference, const reference&>;
```
* conditional_t[link /reference/type_traits/conditional.md]
* is_reference_v[link /reference/type_traits/is_reference.md]


## 例
### 例1: 単一値の生成
```cpp example
#include <generator>
#include <ranges>
#include <iostream>

// 偶数値列を無限生成するコルーチン
std::generator<int> evens()
{
  int n = 0;
  while (true) {
    co_yield n;
    n += 2;
  }
}

int main()
{
  // ジェネレータにより生成されるRangeのうち
  // 先頭から5個までの要素値を列挙する
  for (int n : evens() | std::views::take(5)) {
    std::cout << n << std::endl;
  }
}
```
* std::generator[color ff0000]
* co_yield[link /lang/cpp20/coroutines.md]
* std::views::take[link /reference/ranges/take_view.md]

#### 出力
```
0
2
4
6
8
```

### 例2: Range要素値の逐次生成
```cpp example
#include <generator>
#include <iostream>
#include <list>
#include <ranges>
#include <vector>

// Rangeの要素値を逐次生成するコルーチン
std::generator<int> ints()
{
  int arr[] = {1, 2, 3};
  co_yield std::ranges::elements_of(arr);
  std::vector<int> vec = {4, 5, 6};
  co_yield std::ranges::elements_of(vec);
  std::list<int> lst = {7, 8, 9};
  co_yield std::ranges::elements_of(lst);
}

int main()
{
  for (int n : ints()) {
    std::cout << n << ' ';
  }
}
```
* std::generator[color ff0000]
* co_yield[link /lang/cpp20/coroutines.md]
* std::ranges::elements_of[link /reference/ranges/elements_of.md]

#### 出力
```
1 2 3 4 5 6 7 8 9 
```

### 例3: ジェネレータのネスト
```cpp example
#include <generator>
#include <iostream>
#include <ranges>
#include <memory>

// 二分木ノード
struct node {
  int value;
  std::unique_ptr<node> left = nullptr;
  std::unique_ptr<node> right = nullptr;
};

// 二分木を走査: 左(left)→自ノード→右(right)
std::generator<int> traverse(const node& e)
{
  if (e.left) {
    co_yield std::ranges::elements_of(traverse(*e.left));
  }
  co_yield e.value;
  if (e.right) {
    co_yield std::ranges::elements_of(traverse(*e.right));
  }
}

int main()
{
  // tree:
  //    2
  //   / ¥
  //  1   4
  //     / ¥
  //    3   5
  node tree = {
    2,
    std::make_unique<node>(1),
    std::make_unique<node>(
      4,
      std::make_unique<node>(3),
      std::make_unique<node>(5)
    ),
  };

  for (int n: traverse(tree)) {
    std::cout << n << std::endl;
  }
}
```
* std::generator[color ff0000]
* co_yield[link /lang/cpp20/coroutines.md]
* std::ranges::elements_of[link /reference/ranges/elements_of.md]
* std::make_unique[link /reference/memory/make_unique.md]

#### 出力
```
1
2
3
4
5
```


### 例4: 第2テンプレートパラメータVの利用
```cpp example
#include <iostream>
#include <generator>
#include <ranges>
#include <string>
#include <string_view>
#include <vector>

// Ref=string_view, V=string のジェネレータコルーチン
auto fizzbuzz() ->
  std::generator<std::string_view, std::string>
{
  for (size_t i = 1; ; ++i) {
    if (i % 15 == 0) {
      co_yield "FizzBuzz";
    } else if (i % 3 == 0) {
      co_yield "Fizz";
    } else if (i % 5 == 0) {
      co_yield "Buzz";
    } else {
      co_yield std::to_string(i);
    }
  }
}

int main()
{
  // std::ranges::to<C>() は変換元Rangeの range_value_t を利用して戻り値型を決定する。
  // ここでは std::vector<std::string> 型を導出するために、ジェネレータコルーチンの
  // 第2テンプレートパラメータ V = std::string として明示指定する必要がある。
  auto vec = fizzbuzz() | std::views::take(15) | std::ranges::to<std::vector>();

  // もし fizzbuzz() 戻り値型が std::generator<std::string_view> であった場合、
  // 変数 vec は std::vector<std::string_view> 型となる。このときコルーチン内部実装の
  // std::to_string() の戻り値 std::string オブジェクトはco_yield式末尾で寿命が切れるため、
  // 各要素 vec[i] に格納される std::string_view はダングリング(dangling)状態になってしまう。

  for (const auto& e : vec) {
    std::cout << e << std::endl;
  }
}
```
* std::generator[color ff0000]
* co_yield[link /lang/cpp20/coroutines.md]
* std::to_string[link /reference/string/to_string.md]
* std::views::take[link /reference/ranges/take_view.md]
* std::ranges::to[link /reference/ranges/to.md]

#### 出力
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`std::ranges::elements_of`](/reference/ranges/elements_of.md)


## 参照
- [P2502R2 `std::generator`: Synchronous Coroutine Generator for Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2502r2.pdf)
- [P2787R1 pmr::generator - Promise Types are not Values](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2787r1.pdf)
- [P0981R0 Halo: coroutine Heap Allocation eLision Optimization: the joint response](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0981r0.html)
    - ジェネレータコルーチン実装において、動的メモリ確保が省略最適化される条件の議論。`std::generator`の設計に反映されている。
