# type_traits
* type_traits[meta header]
* cpp11[meta cpp]

`<type_traits>`ヘッダでは、型の特性を判定、操作するためのクラスを定義する。

このライブラリに含まれるクラステンプレートは、メタ関数(meta function)と呼ばれている。


## ヘルパークラス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|-------------------------------|-------|
| [`integral_constant`](type_traits/integral_constant.md) | 定数を表す型 (class template) | C++11 |
| [`bool_constant`](type_traits/bool_constant.md)         | 真理値型の定数を表す型 (class template) | C++17 |
| [`true_type`](type_traits/true_type.md)                 | `true`を表す型 (type-alias) | C++11 |
| [`false_type`](type_traits/false_type.md)               | `false`を表す型 (type-alias) | C++11 |


## 基本的な型

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|---------------------------------------------------------|-------|
| [`is_void`](type_traits/is_void.md)                         | 型が`void`型か調べる (class template) | C++11 |
| [`is_null_pointer`](type_traits/is_null_pointer.md)         | 型が`nullptr_t`型か調べる (class template) | C++14 |
| [`is_integral`](type_traits/is_integral.md)                 | 型が整数型か調べる (class template) | C++11 |
| [`is_floating_point`](type_traits/is_floating_point.md)     | 型が浮動小数点型か調べる (class template) | C++11 |
| [`is_array`](type_traits/is_array.md)                       | 型が配列型か調べる (class template) | C++11 |
| [`is_pointer`](type_traits/is_pointer.md)                   | 型がポインタ型か調べる (class template) | C++11 |
| [`is_lvalue_reference`](type_traits/is_lvalue_reference.md) | 型が左辺値参照型か調べる (class template) | C++11 |
| [`is_rvalue_reference`](type_traits/is_rvalue_reference.md) | 型が右辺値参照型か調べる (class template) | C++11 |
| [`is_member_object_pointer`](type_traits/is_member_object_pointer.md)     | 型がデータメンバへのポインタ型か調べる (class template) | C++11 |
| [`is_member_function_pointer`](type_traits/is_member_function_pointer.md) | 型がメンバ関数へのポインタ型か調べる (class template) | C++11 |
| [`is_enum`](type_traits/is_enum.md)                         | 型が列挙型か調べる (class template) | C++11 |
| [`is_union`](type_traits/is_union.md)                       | 型が共用型か調べる (class template) | C++11 |
| [`is_class`](type_traits/is_class.md)                       | 型がクラス型か調べる (class template) | C++11 |
| [`is_function`](type_traits/is_function.md)                 | 型が関数型か調べる (class template) | C++11 |


## 組み合わせた型

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|-----------------------------------------------|-------|
| [`is_reference`](type_traits/is_reference.md)           | 型が参照型か調べる (class template) | C++11 |
| [`is_arithmetic`](type_traits/is_arithmetic.md)         | 型が算術型か調べる (class template) | C++11 |
| [`is_fundamental`](type_traits/is_fundamental.md)       | 型が単純型か調べる (class template) | C++11 |
| [`is_object`](type_traits/is_object.md)                 | 型がオブジェクト型か調べる (class template) | C++11 |
| [`is_scalar`](type_traits/is_scalar.md)                 | 型がスカラ型か調べる (class template) | C++11 |
| [`is_compound`](type_traits/is_compound.md)             | 型が複合型か調べる (class template) | C++11 |
| [`is_member_pointer`](type_traits/is_member_pointer.md) | 型がメンバポインタ型か調べる (class template) | C++11 |


## 型の特性

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------------|-------|
| [`is_const`](type_traits/is_const.md)       | 型が`const`修飾型か調べる (class template) | C++11 |
| [`is_volatile`](type_traits/is_volatile.md) | 型が`volatile`修飾型か調べる (class template) | C++11 |
| [`is_trivial`](type_traits/is_trivial.md)   | 型がトリビアル型か調べる (class template) | C++11 |
| [`is_trivially_copyable`](type_traits/is_trivially_copyable.md) | 型がトリビアルコピー可能か調べる (class template) | C++11 |
| [`is_standard_layout`](type_traits/is_standard_layout.md) | 型がスタンダードレイアウト型か調べる (class template) | C++11 |
| [`is_pod`](type_traits/is_pod.md)           | 型がPOD型か調べる (class template) | C++11 |
| [`is_literal_type`](type_traits/is_literal_type.md) | 型がリテラル型か調べる (class template) | C++11<br/> C++17から非推奨 |
| [`is_empty`](type_traits/is_empty.md)       | 型が空のクラスか調べる (class template) | C++11 |
| [`is_polymorphic`](type_traits/is_polymorphic.md) | 型が多相的クラスか調べる (class template) | C++11 |
| [`is_abstract`](type_traits/is_abstract.md) | 型が抽象クラスか調べる (class template) | C++11 |
| [`is_final`](type_traits/is_final.md)       | 型に`final`が付いているかを調べる (class template) | C++14 |
| [`is_aggregate`](type_traits/is_aggregate.md) | 型が集成体かを調べる (class template) | C++17 |
| [`is_signed`](type_traits/is_signed.md)     | 型が符号付き算術型か調べる (class template) | C++11 |
| [`is_unsigned`](type_traits/is_unsigned.md) | 型が符号無し算術型か調べる (class template) | C++11 |
| [`is_constructible`](type_traits/is_constructible.md) | 型のコンストラクタ呼出しが適格か調べる (class template) | C++11 |
| [`is_default_constructible`](type_traits/is_default_constructible.md) | 型がデフォルト構築可能か調べる (class template) | C++11 |
| [`is_copy_constructible`](type_traits/is_copy_constructible.md) | 型がコピー構築可能か調べる (class template) | C++11 |
| [`is_move_constructible`](type_traits/is_move_constructible.md) | 型がムーブ構築可能か調べる (class template) | C++11 |
| [`is_assignable`](type_traits/is_assignable.md) | 型が代入可能か調べる (class template) | C++11 |
| [`is_copy_assignable`](type_traits/is_copy_assignable.md) | 型がコピー代入可能か調べる (class template) | C++11 |
| [`is_move_assignable`](type_traits/is_move_assignable.md) | 型がムーブ代入可能か調べる (class template) | C++11 |
| [`is_destructible`](type_traits/is_destructible.md) | 型が破棄可能か調べる (class template) | C++11 |
| [`is_trivially_constructible`](type_traits/is_trivially_constructible.md) | 型がトリビアルに構築可能か調べる (class template) | C++11 |
| [`is_trivially_default_constructible`](type_traits/is_trivially_default_constructible.md) | 型がトリビアルにデフォルト構築可能かを調べる (class template) | C++11 |
| [`is_trivially_copy_constructible`](type_traits/is_trivially_copy_constructible.md) | 型がトリビアルにコピー構築可能か調べる (class template) | C++11 |
| [`is_trivially_move_constructible`](type_traits/is_trivially_move_constructible.md) | 型がトリビアルにムーブ構築可能か調べる (class template) | C++11 |
| [`is_trivially_assignable`](type_traits/is_trivially_assignable.md) | 型がトリビアルに代入可能か調べる (class template) | C++11 |
| [`is_trivially_copy_assignable`](type_traits/is_trivially_copy_assignable.md) | 型がトリビアルにコピー代入可能か調べる (class template) | C++11 |
| [`is_trivially_move_assignable`](type_traits/is_trivially_move_assignable.md) | 型がトリビアルにムーブ代入可能か調べる (class template) | C++11 |
| [`is_trivially_destructible`](type_traits/is_trivially_destructible.md) | 型がトリビアルに破棄可能か調べる (class template) | C++11 |
| [`is_nothrow_constructible`](type_traits/is_nothrow_constructible.md) | 型のコンストラクタ呼出しが適格であり、かつそのコンストラクタが例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_default_constructible`](type_traits/is_nothrow_default_constructible.md) | 型がデフォルト構築でき、かつそのデフォルトコンストラクタが例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_copy_constructible`](type_traits/is_nothrow_copy_constructible.md) | 型がコピー構築でき、かつそのコピーコンストラクタが例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_move_constructible`](type_traits/is_nothrow_move_constructible.md) | 型がムーブ構築でき、かつそのムーブコンストラクタが例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_assignable`](type_traits/is_nothrow_assignable.md) | 型の代入演算子呼び出しが適格であり、かつその代入演算子が例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_copy_assignable`](type_traits/is_nothrow_copy_assignable.md) | 型がコピー代入でき、かつそのコピー代入演算子が例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_move_assignable`](type_traits/is_nothrow_move_assignable.md) | 型がムーブ代入でき、かつそのムーブ代入演算子が例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_destructible`](type_traits/is_nothrow_destructible.md) | 型が破棄でき、かつそのデストラクタが例外を投げないか調べる (class template) | C++11 |
| [`has_virtual_destructor`](type_traits/has_virtual_destructor.md) | 型が仮想デストラクタを持っているか調べる (class template) | C++11 |


## 型の特性についての問い合わせ

| 名前 | 説明 | 対応バージョン |
|----------------|---------------------------------------------|-------|
| [`alignment_of`](type_traits/alignment_of.md) | 型のアライメントを取得する (class template) | C++11 |
| [`rank`](type_traits/rank.md)     | 配列型の次元数を取得する (class template)   | C++11 |
| [`extent`](type_traits/extent.md) | 配列型の`i`番目の次元の要素数を取得する (class template) | C++11 |


## 型の関係

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|-------------------------------------------|-------|
| [`is_same`](type_traits/is_same.md)       | 二つの型が同じ型か調べる (class template) | C++11 |
| [`is_base_of`](type_traits/is_base_of.md) | ある型が別の型の基底クラスか調べる (class template) | C++11 |
| [`is_convertible`](type_traits/is_convertible.md) | ある型から別の型へ変換可能か調べる (class template) | C++11 |


## const-volatile の変更

| 名前 | 説明 | 対応バージョン |
|----------------|--------------------------------------------|-------|
| [`remove_const`](type_traits/remove_const.md)       | 型の`const`修飾を除去する (class template) | C++11 |
| [`remove_volatile`](type_traits/remove_volatile.md) | 型の`volatile`修飾を除去する (class template) | C++11 |
| [`remove_cv`](type_traits/remove_cv.md)             | 型の`const-volatile`修飾を除去する (class template) | C++11 |
| [`add_const`](type_traits/add_const.md)             | 型を`const`修飾する (class template) | C++11 |
| [`add_volatile`](type_traits/add_volatile.md)       | 型を`volatile`修飾する (class template) | C++11 |
| [`add_cv`](type_traits/add_cv.md)                   | 型を`const-volatile`修飾する (class template) | C++11 |


## 参照の変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| [`remove_reference`](type_traits/remove_reference.md)         | 型から参照を除去する(class template)      | C++11 |
| [`add_lvalue_reference`](type_traits/add_lvalue_reference.md) | 型に左辺値参照を追加する (class template) | C++11 |
| [`add_rvalue_reference`](type_traits/add_rvalue_reference.md) | 型に右辺値参照を追加する (class template) | C++11 |


## 符号の変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| [`make_signed`](type_traits/make_signed.md)     | 整数型を符号付きにする (class template) | C++11 |
| [`make_unsigned`](type_traits/make_unsigned.md) | 整数型を符号なしにする (class template) | C++11 |


## 配列の変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| [`remove_extent`](type_traits/remove_extent.md)           | 配列型から次元を除去する (class template) | C++11 |
| [`remove_all_extents`](type_traits/remove_all_extents.md) | 配列型から全ての次元を除去する (class template) | C++11 |


## ポインタの変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| [`add_pointer`](type_traits/add_pointer.md)       | 型にポインタを追加する (class template)   | C++11 |
| [`remove_pointer`](type_traits/remove_pointer.md) | 型からポインタを除去する (class template) | C++11 |


## その他の変換

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| [`aligned_storage`](type_traits/aligned_storage.md) | アライメント調整された領域を作る (class template) | C++11 |
| [`aligned_union`](type_traits/aligned_union.md) | アライメント調整された共用体領域を作る (class template) | C++11 |
| [`decay`](type_traits/decay.md) | 配列と関数ポインタに関して、関数テンプレートと同様に推論された型を取得する (class template) | C++11 |
| [`enable_if`](type_traits/enable_if.md) | コンパイル時条件式が真の場合のみ有効な型 (class template) | C++11 |
| [`conditional`](type_traits/conditional.md) | コンパイル時条件式 (class template) | C++11 |
| [`common_type`](type_traits/common_type.md) | 変換可能な共通の型を取得する (class template) | C++11 |
| [`underlying_type`](type_traits/underlying_type.md) | 列挙型の基底型を取得する (class template) | C++11 |
| [`result_of`](type_traits/result_of.md) | 関数の戻り値の型を取得する (class template) | C++11 |


## エンディアン

| 名前 | 説明 | 対応バージョン |
|-------------|-----------------------------------|-------|
| [`endian`](type_traits/endian.md) | バイトの並び順を表す列挙型 (enum) | C++20 |


## 備考
- このヘッダで定義されるテンプレートは、[`std::common_type`](type_traits/common_type.md)を除いて、ユーザーが特殊化を追加することを禁止している


## バージョン
### 言語
- C++11

## 参照
- [N1345 A Proposal to add Type Traits to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1345.html)
- [N1424 A Proposal to add Type Traits to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1424.htm)
- [Boost Type Traits Library](http://www.boost.org/doc/libs/release/libs/type_traits/doc/html/index.html)
- [型特性 - Boost逆引きリファレンス](https://boostjp.github.io/tips/type_traits.html)
- [LWG Issue 2581. Specialization of `<type_traits>` variable templates should be prohibited](https://wg21.cmeerw.net/lwg/issue2581)
    - C++14までは`<type_traits>`で定義されるクラステンプレートの特殊化を禁止していたが、C++17で定義される変数テンプレートも特殊化の禁止対象とされた
