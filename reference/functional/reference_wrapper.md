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
| `result_type` | 型`T`を関数・関数オブジェクトとして扱った時の戻り値型 | C++11<br/> C++17から非推奨 |
| `argument_type` | 型`T`を一引数の関数・関数オブジェクトとして扱った時の引数型 | C++11<br/> C++17から非推奨 |
| `first_argument_type` | 型`T`を二引数の関数・関数オブジェクトとして扱った時の第一引数型 | C++11<br/> C++17から非推奨 |
| `second_argument_type` | 型`T`を二引数の関数・関数オブジェクトとして扱った時の第二引数型 | C++11<br/> C++17から非推奨 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ref`](ref.md) | `T&`に対応する`reference_wrapper`オブジェクトの生成 | C++11 |
| [`cref`](cref.md) | `const T&`に対応する`reference_wrapper`オブジェクトの生成 | C++11 |


## 例
```cpp
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照
- [参照を保持するコンテナ - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20110519/1305789940)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
