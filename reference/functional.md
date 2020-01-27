# functional
* functional[meta header]

`<functional>`ヘッダは、関数オブジェクトに関する機能を提供する。

関数オブジェクトとは、通常の関数と同じ構文で関数呼び出しを扱えるクラスである。  
単純な関数オブジェクトの構造は次のとおりである：

```cpp
struct doubler {
  int operator ()(int x) const { return x * 2; }
};
```

関数オブジェクトは、関数・関数へのポインタに対して、以下のような利点がある：

- 状態を保持できる
- (特にアルゴリズムにファンクタとして渡した場合)インライン展開が容易である
- 多相(オーバー�ードやテンプレート)にしても関数へのポインタのように曖昧にならない


## 多相的な関数オブジェクト

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------------------------|-------|
| [`function`](functional/function.md) | 関数・関数オブジェクトの多相的なラッパー(class template) | C++11 |
| [`bad_function_call`](functional/bad_function_call.md) | 不�な関数呼び出しに関する例外(class)  | C++11 |


## 統一的な関数呼び出し

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------------------------|-------|
| [`invoke`](functional/invoke.md) | 共通の操作で関数呼び出しを行う(function template) | C++17 |


## 引数の束縛

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------------------------|-------|
| [`bind_front`](functional/bind_front.md) | 関数の引数を先�から順に部分適用する(function template) | C++20 |
| [`bind`](functional/bind.md) | 関数の引数を部分適用する(function template) | C++11 |
| [`is_bind_expression`](functional/is_bind_expression.md) | 型を`bind`の式と見なすか判定する(class template) | C++11 |
| [`is_placeholder`](functional/is_placeholder.md) | 型がプレースホルダーかどうかを判定する(class template) | C++11 |
| [`placeholders`](functional/placeholders.md) | 部分適用のためのプレースホルダー(namespace) | C++11 |
| [`mem_fn`](functional/mem_fn.md) | メンバ関数アダプタ(function template) | C++11 |


## 参照ラッパー

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------------------------|-------|
| [`reference_wrapper`](functional/reference_wrapper.md) | テンプレートで参照を渡すためのラッパー(class template)  | C++11 |
| [`ref`](functional/ref.md) | オブジェクトへの参照を構築する(function template) | C++11 |
| [`cref`](functional/cref.md) | オブジェクトへのconst左辺値参照を構築する(function template) | C++11 |
| [`unwrap_reference`](functional/unwrap_reference.md) | `reference_wrapper<T>`型を`T&`型に展開する (class template) | C++20 |
| [`unwrap_ref_decay`](functional/unwrap_ref_decay.md) | `reference_wrapper<T>`型を`T&`型に展開し、型推論規則による型変換を行う (class template) | C++20 |


## ハッシュ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------|------------------------------------------------------|-------|
| [`hash`](functional/hash.md) | オブジェクトを示すハッシュを計算する(class template) | C++11 |


## 算術演算関数オブジェクト

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------|-------|
| [`plus`](functional/plus.md)             | 加算(class template) | |
| [`minus`](functional/minus.md)           | 減算(class template) | |
| [`multiplies`](functional/multiplies.md) | 乗算(class template) | |
| [`divides`](functional/divides.md)       | 除算(class template) | |
| [`modulus`](functional/modulus.md)       | 剰余算(class template) | |
| [`negate`](functional/negate.md)         | 符号反転(class template) | |


## 比較演算関数オブジェクト

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------|-------|
| [`equal_to`](functional/equal_to.md)           | �値比較(class template) | |
| [`not_equal_to`](functional/not_equal_to.md)   | 非�値比較(class template) | |
| [`less`](functional/less.md)                   | 左辺が右辺より小さいかの比較(class template) | |
| [`less_equal`](functional/less_equal.md)       | 左辺が右辺以下かの比較(class template) | |
| [`greater`](functional/greater.md)             | 左辺が右辺より大きいかの比較(class template) | |
| [`greater_equal`](functional/greater_equal.md) | 左辺が右辺以上かの比較(class template) | |


## 論理演算関数オブジェクト

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------|-------|
| [`logical_and`](functional/logical_and.md) | 論理積(AND) (class template) | |
| [`logical_or`](functional/logical_or.md)   | 論理和(OR) (class template) | |
| [`logical_not`](functional/logical_not.md) | 論理否定 (class template) | |


## ビット演算関数オブジェクト

| 名前                                            | 説明                                | 対応バージョン |
|-------------------------------------------------|-------------------------------------|----------------|
| [`bit_and`](functional/bit_and.md) | ビットごとの論理積(AND) (class template)       | C++11          |
| [`bit_or`](functional/bit_or.md)   | ビットごとの論理和(OR) (class template)        | C++11          |
| [`bit_xor`](functional/bit_xor.md) | ビットごとの排他的論理和(XOR) (class template) | C++11          |
| [`bit_not`](functional/bit_not.md) | ビットごとの論理否定(NOT) (class template)     | C++14          |


## 論理反転関数オブジェクト

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|--------------------------|-------|
| [`not_fn`](functional/not_fn.md)          | 任意個数の引数をとる関数オブジェクトを論理反転する (function template) | C++17 |
| [`unary_negate`](functional/negators.md)  | 単項の論理反転 (class template) | C++17から非推奨<br/> C++20で削除 |
| [`not1`](functional/negators.md)          | 単項の述語を論理反転する (function template) | C++17から非推奨<br/> C++20で削除 |
| [`binary_negate`](functional/negators.md) | 二項の論理反転 (class template) | C++17から非推奨<br/> C++20で削除 |
| [`not2`](functional/negators.md)          | 二項の述語を論理反転する (function template) | C++17から非推奨<br/> C++20で削除 |


## 検索

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`default_searcher`](functional/default_searcher.md) | 二分探索による検索器 (class template) | C++17 |
| [`boyer_moore_searcher`](functional/boyer_moore_searcher.md) | ボイヤー・ムーア法による検索器 (class template) | C++17 |
| [`boyer_moore_horspool_searcher`](functional/boyer_moore_horspool_searcher.md) | ボイヤー・ムーア・ホースプール法による検索器 (class template) | C++17 |


## 古い関数オブジェクトアダプタ (C++11から非推奨, C++17で削除)

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|--------------------------|-------|
| `unary_function`             | 単項関数オブジェクト(class template) | C++11から非推奨<br/> C++17で削除 |
| `binary_function`            | 二項関数オブジェクト(class template) | C++11から非推奨<br/> C++17で削除 |
| `pointer_to_unary_function`  | 単項関数ポインタを関数オブジェクトに変換するアダプタ(class template) | C++11から非推奨<br/> C++17で削除 |
| `pointer_to_binary_function` | 二項関数ポインタを関数オブジェクトに変換するアダプタ(class template) | C++11から非推奨<br/> C++17で削除 |
| `ptr_fun`                    | 関数ポインタを関数オブジェクトに変換する(function template) | C++11から非推奨<br/> C++17で削除 |
| `mem_fun_t`                  | メンバ関数ポインタを関数オブジェクトに変換するアダプタ。<br/> オブジェクトへのポインタに対してメンバ関数を呼び出す。(class template) | C++11から非推奨<br/> C++17で削除 |
| `mem_fun1_t`                 | 単項メンバ関数ポインタを関数オブジェクトに変換するアダプタ。<br/> オブジェクトへのポインタに対してメンバ関数を呼び出す。(class template) | C++11から非推奨<br/> C++17で削除 |
| `mem_fun_ref_t`              | メンバ関数ポインタを関数オブジェクトに変換するアダプタ。<br/> オブジェクトへの参照に対してメンバ関数を呼び出す。(class template) | C++11から非推奨<br/> C++17で削除 |
| `mem_fun1_ref_t`             | 単項メンバ関数ポインタを関数オブジェクトに変換するアダプタ。<br/> オブジェクトへの参照に対してメンバ関数を呼び出す。(class template) | C++11から非推奨<br/> C++17で削除 |
| `const_mem_fun_t`            | メンバ関数ポインタを関数オブジェクトに変換するアダプタ。<br/> オブジェクトへのconstポインタに対してメンバ関数を呼び出す。(class template) | C++11から非推奨<br/> C++17で削除 |
| `const_mem_fun1_t`           | 単項メンバ関数ポインタを関数オブジェクトに変換するアダプタ。<br/> オブジェクトへのconstポインタに対してメンバ関数を呼び出す。(class template) | C++11から非推奨<br/> C++17で削除 |
| `mem_fun`                    | メンバ関数ポインタを関数オブジェクトに変換する。<br/> 返される関数オブジェクトは、オブジェクトへのポインタを引数にとる。(function template) | C++11から非推奨<br/> C++17で削除 |
| `mem_fun_ref`                | メンバ関数ポインタを関数オブジェクトに変換する。<br/> 返される関数オブジェクトは、オブジェクトへの参照を引数にとる。(function template) | C++11から非推奨<br/> C++17で削除 |


## 古い関数バインダ (C++11から非推奨, C++17で削除)

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|--------------------------|-------|
| `binder1st` | 第1引数を部分適用する関数オブジェクト(class template) | C++11から非推奨<br/> C++17で削除 |
| `bind1st` | 第1引数を部分適用する(function template) | C++11から非推奨<br/> C++17で削除 |
| `binder2nd` | 第2引数を部分適用する関数オブジェクト(class template) | C++11から非推奨<br/> C++17で削除 |
| `bind2nd` | 第2引数を部分適用する関数オブジェクト(function template) | C++11から非推奨<br/> C++17で削除 |


## コンセプト

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|--------------------------|-------|
| [*Callable*](concepts/Callable.md) | 関数呼び出し可能な型 | C++11 |
| [*INVOKE*](concepts/Invoke.md) | 関数呼び出しの式 | C++11 |


## 参照
- [N4190 Removing `auto_ptr`, `random_shuffle()`, And Old `<functional>` Stuff](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4190.htm)
