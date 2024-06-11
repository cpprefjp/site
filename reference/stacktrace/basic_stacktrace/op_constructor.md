# コンストラクタ
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_stacktrace()
  noexcept(is_nothrow_default_constructible_v<allocator_type>);  // (1) C++23

explicit basic_stacktrace(const allocator_type& alloc) noexcept; // (2) C++23

basic_stacktrace(const basic_stacktrace& other);                 // (3) C++23
basic_stacktrace(basic_stacktrace&& other) noexcept;             // (4) C++23

basic_stacktrace(const basic_stacktrace& other,
                 const allocator_type& alloc);                   // (5) C++23
basic_stacktrace(basic_stacktrace&& other,
                 const allocator_type& alloc);                   // (6) C++23
```
* is_nothrow_default_constructible_v[link /reference/type_traits/is_nothrow_default_constructible.md]

## 概要
`basic_stacktrace`オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : アロケータを指定して構築
- (3) : コピー構築
- (4) : ムーブ構築
- (5) : アロケータを指定してコピー構築
- (6) : アロケータを指定してムーブ構築


## 効果
- (2) : 保持する[`std::vector`](/reference/vector/vector.md)`<`[`std::stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)`>`型スタックトレースの履歴のオブジェクトに、コンストラクタ引数として`alloc`を渡す


## 事後条件
- (1), (2) : [`empty()`](empty.md)が`true`になること


## 例外
- (3), (4), (5), (6) : 実装は、メモリ確保に失敗した場合に[`empty()`](empty.md)を`true`にすることで例外仕様を強化できる


## 備考
- 実装は、これらのコンストラクタのほかに、[`current()`](current.md)関数によるスタックトレース履歴を保持するための追加のコンストラクタをもっている可能性がある


## 例
```cpp example
#include <cassert>
#include <stacktrace>

void g() {
  // (1) デフォルト構築
  std::stacktrace st1{};
  assert(st1.empty());

  // (2) アロケータを指定して構築
  std::allocator<std::stacktrace_entry> alloc{};
  std::stacktrace st2{alloc};
  assert(st2.empty());

  // (3) コピー構築
  std::stacktrace st3 = st1;
  assert(st3 == st1);

  // (4) ムーブ構築
  std::stacktrace st4 = std::move(st3);
  assert(st4 == st1);

  // (5) アロケータを指定してコピー構築
  std::stacktrace st5{st1, alloc};
  assert(st5 == st1); // アロケータは比較されない

  // (6) アロケータを指定してムーブ構築
  std::stacktrace st6{std::move(st5), alloc};
  assert(st6 == st1);
}

void f() {
  g();
}

int main() {
  f();
}
```
* std::stacktrace_entry[link /reference/stacktrace/stacktrace_entry.md]
* empty()[link empty.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
