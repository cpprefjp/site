# rethrow_if_nested
* exception[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class E>
  void rethrow_if_nested(const E& e); // (1) C++11
}
```

## 概要
入れ子になった例外が存在する場合に、入れ子になった例外を送出する



## 効果
- 型`E`が多相的（polymorphic）なクラス型でない場合、または[`nested_exception`](/reference/exception/nested_exception.md)が`E`のアクセス不能もしくは曖昧な基底クラスである場合、何もしない。
- そうでなければ、以下を行う：

    ```cpp
    if (auto p = dynamic_cast<const nested_exception*>(addressof(e)))
      p->rethrow_nested();
    ```
    * nested_exception[link nested_exception.md]
    * rethrow_nested()[link nested_exception/rethrow_nested.md]
    * addressof[link /reference/memory/addressof.md]


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <exception>
#include <memory>

struct inner_error : public std::exception {};
struct outer_error : public std::nested_exception {};

// 現在の例外を取得
template <class T>
std::shared_ptr<T> get_exception(std::exception_ptr ep)
{
  try {
    std::rethrow_exception(ep);
  }
  catch (T& e) {
    return std::shared_ptr<T>(new T(e));
  }
  catch (...) {}
  return nullptr;
}

// 入れ子になってる例外を取得
template <class T>
std::shared_ptr<T> get_nested_exception(std::nested_exception& ex)
{
  try {
    std::rethrow_if_nested(ex); // 入れ子になってる例外を送出
  }
  catch (T& e) {
    return std::shared_ptr<T>(new T(e));
  }
  catch (...) {}
  return nullptr;
}

int main()
{
  try {
    try {
      throw inner_error();
    }
    catch (...) {
      // inner_errorを入れ子にしてouter_errorを送出
      std::throw_with_nested(outer_error());
    }
  }
  catch (...) {
    // 外側の例外を取得
    if (std::shared_ptr<outer_error> outer = get_exception<outer_error>(std::current_exception())) {
      std::cout << "outer" << std::endl;

      // 入れ子になった例外を取得
      if (std::shared_ptr<inner_error> inner = get_nested_exception<inner_error>(*outer)) {
        std::cout << "inner" << std::endl;
      }
    }
  }
}
```
* std::rethrow_if_nested[color ff0000]
* std::exception[link exception.md]
* std::nested_exception[link nested_exception.md]
* std::exception_ptr[link exception_ptr.md]
* std::throw_with_nested[link throw_with_nested.md]
* std::current_exception()[link current_exception.md]

### 出力
```
outer
inner
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3842R2 A conservative fix for constexpr `uncaught_exceptions()` and `current_exception()`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3842r2.pdf)
    - C++26の策定中に`constexpr`が追加されたが、本提案文書により巻き戻された (C++29で再検討予定)
- [LWG Issue 819. `rethrow_if_nested`](https://cplusplus.github.io/LWG/issue819)
    - C++11で、効果が`e.rethrow_nested()`の直接呼び出しから、[`nested_exception`](nested_exception.md)への`dynamic_cast`を経由するものへ改められた。`E`が[`nested_exception`](nested_exception.md)を公開かつ非曖昧に継承している場合にのみ動作させるため
- [LWG Issue 2484. `rethrow_if_nested()` is doubly unimplementable](https://cplusplus.github.io/LWG/issue2484)
    - 型`E`が多相的でない場合は何もしないこと、および`e`の静的型が[`nested_exception`](nested_exception.md)であるかそこからpublicかつ曖昧さなく派生している場合を対象とすることが規定された
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。 C++11時点の規定は「`e`の動的型が`nested_exception`から派生しているか」で判定するとしていたが、非多相なクラス型では動的型を判別する`dynamic_cast`自体が不適格となるため、規定どおりに実装することが不可能だった。したがって処理系は当初からこの修正後の挙動（非多相型では何もしない）を採るしかなく、これと異なる観測可能な挙動が出荷されていたわけではない
- [LWG Issue 2784. Resolution to LWG 2484 is missing "otherwise, no effects" and is hard to parse](https://cplusplus.github.io/LWG/issue2784)
    - LWG 2484の解決を整理し、静的型の判定と動的型の判定を分離して、効果をポインタ版`dynamic_cast`とヌルチェックを用いる形に書き直した。あわせて、条件を満たさない場合は何もしないことが明記された
    - この修正も欠陥報告(DR)であり、C++11以降に遡及して適用される。 LWG 2484と同じ規定を読みやすく書き換えたものであり、意図された挙動は変わらないため
