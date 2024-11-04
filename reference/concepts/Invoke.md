# INVOKE
* cpp11[meta cpp]
* concepts[meta header]
* named requirement[meta id-type]
* [meta namespace]

C++における関数呼び出しという性質を抽象化しまとめた、仮想操作 *INVOKE* を定義する。

- C++17からは、仮想操作 *INVOKE* を実体化した[`std::invoke`](/reference/functional/invoke.md)関数テンプレートが提供される。
- C++23からは、仮想操作 *INVOKE*`<R>` を実体化した[`std::invoke_r`](/reference/functional/invoke_r.md)関数テンプレートが提供される。

## 用語定義
- *call-signature* とは、戻り値型に続けて丸カッコの中に0個以上の引数型を並べたものである。 *cf.* `int ( std::string, int )`
- *callable-type* とは、関数呼び出し演算子を適用できる型 ( 関数、関数への参照、関数へのポインタ、`operator ()` をオーバーロードした型もしくはそれを(直接または間接的に) `public` 継承した型 ) もしくはメンバへのポインタ型を指す。
- *callable-object* は、 *callable-type* 型のオブジェクトである。
- *call-wrapper-type* は、 *callable-object* を保持し、自身に対する関数呼び出し操作が行われたとき、保持しているオブジェクトに委譲する。
- *call-wrapper* は、 *call-wrapper-type* 型のオブジェクトである。
- *target-object* とは、 *callable-object* に保持されているオブジェクトのことである。

## 要件（C++14まで）
1. 仮想操作 *INVOKE*`(f, t1, t2, ..., tN)` を次のように定義する。
	- `f` が型 `T` のメンバ関数へのポインタであり、 `t1` が T 型のオブジェクトあるいは `T` または `T` を継承した型への参照であるとき、 `(t1.*f)(t2, ..., tN)` と同じ効果を持つ。
	- `f` が型 `T` のメンバ関数へのポインタであり、 `t1` が上記の条件に当てはまらない場合、`((*t1).*f)(t2, ..., tN)` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、`t1` が `T` 型のオブジェクトあるいは `T` または `T` を継承した型への参照であるとき、 `t1.*f` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、`t1` が上記の条件に当てはまらない場合、 `(*t1).*f` と同じ効果を持つ。
	- 上記の条件のどれにも当てはまらない場合、 `f(t1, t2, ..., tN)` と同じ効果を持つ。
2. *INVOKE*`(f, t1, t2, ..., tN, R)` を、 *INVOKE*`(f, t1, t2, ..., tN)` の実行結果の戻り値が型 `R` に暗黙的に変換されること、と定義する。
3. *call-wrapper* が *weak-result-type* を用意している場合、メンバ型 `result_type` は*target-object* の型 `T` に応じて次のように定義される。
	- `T` が関数へのポインタ型であるとき、 `result_type` は `T` の戻り値型と等しい。
	- `T` がメンバ関数へのポインタ型であるとき、 `result_type` は `T` の戻り値型と等しい。
	- `T` が `result_type` という名前のメンバ型を持つとき、 `result_type` は `T::result_type` と等しい。
	- どの条件にも当てはまらない場合、 `result_type` は定義されない。
4. すべての *call-wrapper* は、*MoveAssignable* でなければならない。

## 要件（C++17）
1. 仮想操作 *INVOKE*`(f, t1, t2, ..., tN)` を次のように定義する。
	- `f` が型 `T` のメンバ関数へのポインタであり、[`is_base_of_v`](/reference/type_traits/is_base_of.md)`<T, `[`decay_t`](/reference/type_traits/decay.md)`<decltype(t1)>> == true`（`t1` が `T` または `T` を継承した型のオブジェクト/参照）であるとき、 `(t1.*f)(t2, ..., tN)` と同じ効果を持つ。
	- `f` が型 `T` のメンバ関数へのポインタであり、[`decay_t`](/reference/type_traits/decay.md)`<decltype(t1)>`が[`reference_wrapper<T>`](/reference/functional/reference_wrapper.md)（`t1`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)の特殊化）であるとき、 `(t1.get().*f)(t2, ..., tN)` と同じ効果を持つ。
	- `f` が型 `T` のメンバ関数へのポインタであり、 `t1` が上記の条件に当てはまらない場合（例えば、t1が`T`のポインタ）、`((*t1).*f)(t2, ..., tN)` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、[`is_base_of_v`](/reference/type_traits/is_base_of.md)`<T, `[`decay_t`](/reference/type_traits/decay.md)`<decltype(t1)>> == true`（`t1` が `T` または `T` を継承した型のオブジェクト/参照）であるとき、 `t1.*f` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、[`decay_t`](/reference/type_traits/decay.md)`<decltype(t1)>`が[`reference_wrapper<T>`](/reference/functional/reference_wrapper.md)（`t1`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)の特殊化）であるとき、 `t1.get().*f` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、`t1` が上記の条件に当てはまらない場合（例えば、t1が`T`のポインタ）、 `(*t1).*f` と同じ効果を持つ。
	- 上記の条件のどれにも当てはまらない場合、 `f(t1, t2, ..., tN)` と同じ効果を持つ。
2. *INVOKE*`<R>(f, t1, t2, ..., tN)` を次のように定義する。
	- `R`が`void`かそのcv修飾の場合は、`static_cast<void>(`*INVOKE*`(f, t1, t2, ..., tN))`。
	- それ以外の場合は、*INVOKE*`(f, t1, t2, ..., tN)` の実行結果の戻り値が型 `R` に暗黙的に変換されること。
3. すべての *call-wrapper* は、*MoveConstructible* でなければならない。

## 要件（C++20）
1. 仮想操作 *INVOKE*`(f, t1, t2, ..., tN)` を次のように定義する。
	- `f` が型 `T` のメンバ関数へのポインタであり、[`is_base_of_v`](/reference/type_traits/is_base_of.md)`<T, `[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(t1)>> == true`（`t1` が `T` または `T` を継承した型のオブジェクト/参照）であるとき、 `(t1.*f)(t2, ..., tN)` と同じ効果を持つ。
	- `f` が型 `T` のメンバ関数へのポインタであり、[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(t1)>`が[`reference_wrapper<T>`](/reference/functional/reference_wrapper.md)（`t1`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)の特殊化）であるとき、 `(t1.get().*f)(t2, ..., tN)` と同じ効果を持つ。
	- `f` が型 `T` のメンバ関数へのポインタであり、 `t1` が上記の条件に当てはまらない場合（例えば、t1が`T`のポインタ）、`((*t1).*f)(t2, ..., tN)` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、[`is_base_of_v`](/reference/type_traits/is_base_of.md)`<T, `[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(t1)>> == true`（`t1` が `T` または `T` を継承した型のオブジェクト/参照）であるとき、 `t1.*f` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(t1)>`が[`reference_wrapper<T>`](/reference/functional/reference_wrapper.md)（`t1`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)の特殊化）であるとき、 `t1.get().*f` と同じ効果を持つ。
	- `N == 1` で、`f` が型 `T` のメンバオブジェクトへのポインタであり、`t1` が上記の条件に当てはまらない場合（例えば、t1が`T`のポインタ）、 `(*t1).*f` と同じ効果を持つ。
	- 上記の条件のどれにも当てはまらない場合、 `f(t1, t2, ..., tN)` と同じ効果を持つ。
2. *INVOKE*`<R>(f, t1, t2, ..., tN)` を次のように定義する。
	- `R`が`void`かそのcv修飾の場合は、`static_cast<void>(`*INVOKE*`(f, t1, t2, ..., tN))`。
	- それ以外の場合は、*INVOKE*`(f, t1, t2, ..., tN)` の実行結果の戻り値が型 `R` に暗黙的に変換されること。
3. すべての *call-wrapper* は、*Cpp17MoveConstructible* かつ *Cpp17Destructible* でなければならない。

## 要件（C++23差分）
C++20 における 2. について、次の文言を項目の最後に追加する。この変更は、`R`が参照かつ*INVOKE*の実行結果が`R`に束縛されることで寿命が延長される場合にダングリング参照が作成されてしまう事例を検出するための要件である。

- [`reference_converts_from_temporary_v`](/reference/type_traits/reference_converts_from_temporary.md)`<R, decltype(`*INVOKE*`(f, t1, t2, …, tN))> == true`の場合、*INVOKE*`<R>(f, t1, t2, …, tN)`は不適格。


## まとめ
[第1引数がメンバ関数へのポインタの場合でも非静的メンバデータへのポインタの場合でも，第2引数がクラスオブジェクトへの参照の場合でもポインタの場合でもポインタっぽいものの場合でも，なんか知らんけどそれっぽく上手くいく](https://twitter.com/Cryolite/status/216814363221303296) ように取り計らった操作のことである。

## 関連項目
- [`function`](/reference/functional/function.md)
- [`reference_wrapper`](/reference/functional/reference_wrapper.md)
- [`bind`](/reference/functional/bind.md)
- [`mem_fn`](/reference/functional/mem_fn.md)
- [`not_fn`](/reference/functional/not_fn.md)
- [`thread`](/reference/thread/thread.md)
- [`async`](/reference/future/async.md)
- [`packaged_task`](/reference/future/packaged_task.md)
- [`call_once`](/reference/mutex/call_once.md)

## 参照
- [P0777R1 Treating Unnecessary `decay`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0777r1.pdf)
    - C++20から`decay_t`を`remove_cvref_t`へ変更。
- [P2136R3 `invoke_r`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2136r3.html)
