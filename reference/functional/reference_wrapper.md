# reference_wrapper
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  class reference_wrapper;
}
```

## 概要
`reference_wrapper`は、コピー・代入可能なオブジェクトとして持ちまわれる参照オブジェクトを提供する。コピー不可なクラス (例：`std::istream`) をポインタで保持する代わりに`reference_wrapper`で保持することができる。また、`reference_wrapper`クラスは、関数テンプレートに変数を参照として渡すためにも使用できる。

C++17からは、このクラスは[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であると規定された。
また、C++20からは、テンプレートパラメーター`T`は不完全型をサポートしている。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](reference_wrapper/op_constructor.md) | コンストラクタ | C++11 |
| `~reference_wrapper() = default;`                        | デストラクタ | C++11 |
| [`operator=`](reference_wrapper/op_assign.md)          | 代入演算子 | C++11 |
| [`get`](reference_wrapper/get.md)                      | 生参照の取得 | C++11 |
| [`operator T&()`](reference_wrapper/op_cast_ref_t.md)  | 生参照への変換 | C++11 |
| [`operator()`](reference_wrapper/op_call.md)           | 関数オブジェクト呼び出し | C++11 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `type` | 参照される型 (テンプレートパラメータ `T`) | C++11 |
| `result_type` | 型`T`を関数・関数オブジェクトとして扱った時の戻り値型 | C++11<br/> C++17から非推奨<br/> C++20で削除 |
| `argument_type` | 型`T`を一引数の関数・関数オブジェクトとして扱った時の引数型 | C++11<br/> C++17から非推奨<br/> C++20で削除 |
| `first_argument_type` | 型`T`を二引数の関数・関数オブジェクトとして扱った時の第一引数型 | C++11<br/> C++17から非推奨<br/> C++20で削除 |
| `second_argument_type` | 型`T`を二引数の関数・関数オブジェクトとして扱った時の第二引数型 | C++11<br/> C++17から非推奨<br/> C++20で削除 |


## 非メンバ関数
### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ref`](ref.md) | `T&`に対応する`reference_wrapper`オブジェクトの生成 | C++11 |
| [`cref`](cref.md) | `const T&`に対応する`reference_wrapper`オブジェクトの生成 | C++11 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](reference_wrapper/op_equal.md)  | 等値比較 | C++26 |
| `operator!=` | 非等値比較 (`==`により使用可能) | C++26 |
| [`operator<=>`](reference_wrapper/op_compare_3way.md) | 三方比較 | C++26 |
| `operator<`  | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++26 |
| `operator<=` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++26 |
| `operator>`  | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++26 |
| `operator>=` | 左辺が右辺以上かを判定する (`<=>`により使用可能) | C++26 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](reference_wrapper/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |

## 例
```cpp example
#include <iostream>
#include <functional>

void f(int& x)
{
  ++x;
}

template <class T>
void g(T x)
{
  f(x);
}

int main()
{
  int x = 3;

  // 関数テンプレートの型推論によって、xの型が非参照のintと見なされる
//g(x);

  // 関数テンプレートに変数を参照として渡す
  g(std::ref(x));

  std::cout << x << std::endl;
}
```
* std::ref[link ref.md]

### 出力
```
4
```

### 不完全型を保持する例

```cpp example
#include <functional>
#include <iostream>

struct my_struct;
my_struct& get_my_struct();

int main()
{
  [[maybe_unused]]
  std::reference_wrapper<my_struct> s = get_my_struct(); // 不完全型 my_struct の使用
}

struct my_struct
{
  void hello() { std::cout << "Hello, world!"; }
};

my_struct& get_my_struct()
{
  static my_struct obj = my_struct{};
  return obj;
}
```

### 出力

```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [参照を保持するコンテナ - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20110519/1305789940)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
- [N4277 TriviallyCopyable `reference_wrapper` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4277.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
- [P0357R3 reference_wrapper for incomplete types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0357r3.html)
